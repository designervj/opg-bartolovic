import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGODB_URI;
const databaseName =
  process.env.TENANT_DB_NAME || process.env.NEXT_PUBLIC_TENANT_DB || process.env.DB_NAME || 'kp_opg_bartolovic';

if (!uri) {
  throw new Error('MONGODB_URI is required');
}

async function seedCatalog() {
  const catalogPath = path.join(process.cwd(), 'src', 'data', 'catalog.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  const now = new Date();
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(databaseName);

    await db.collection('site_catalog').updateOne(
      { document_key: catalog.documentKey },
      {
        $set: {
          document_key: catalog.documentKey,
          tenant_id: databaseName,
          currency: catalog.currency,
          locale: catalog.locale,
          categories: catalog.categories,
          products: catalog.products,
          updated_at: now,
        },
        $setOnInsert: { created_at: now },
      },
      { upsert: true },
    );

    const categoryWrites = catalog.categories.map((category: Record<string, unknown>) => ({
      updateOne: {
        filter: { tenant_id: databaseName, id: category.id },
        update: {
          $set: { ...category, tenant_id: databaseName, updated_at: now },
          $setOnInsert: { created_at: now },
        },
        upsert: true,
      },
    }));

    const productWrites = catalog.products.map((product: Record<string, unknown>) => ({
      updateOne: {
        filter: { tenant_id: databaseName, id: product.id },
        update: {
          $set: { ...product, tenant_id: databaseName, updated_at: now },
          $setOnInsert: { created_at: now },
        },
        upsert: true,
      },
    }));

    if (categoryWrites.length) {
      await db.collection('site_categories').bulkWrite(categoryWrites);
    }

    if (productWrites.length) {
      await db.collection('site_products').bulkWrite(productWrites);
    }

    const [catalogDoc, categoryCount, productCount] = await Promise.all([
      db.collection('site_catalog').findOne({ document_key: catalog.documentKey }),
      db.collection('site_categories').countDocuments({
        tenant_id: databaseName,
        id: { $in: catalog.categories.map((category: Record<string, unknown>) => category.id) },
      }),
      db.collection('site_products').countDocuments({
        tenant_id: databaseName,
        id: { $in: catalog.products.map((product: Record<string, unknown>) => product.id) },
      }),
    ]);

    console.log(`Catalog saved to database: ${databaseName}`);
    console.log(`site_catalog products: ${catalogDoc?.products?.length || 0}`);
    console.log(`site_catalog categories: ${catalogDoc?.categories?.length || 0}`);
    console.log(`site_products upserted/verified: ${productCount}`);
    console.log(`site_categories upserted/verified: ${categoryCount}`);
  } finally {
    await client.close();
  }
}

seedCatalog().catch((error) => {
  console.error('Error seeding catalog:', error);
  process.exit(1);
});
