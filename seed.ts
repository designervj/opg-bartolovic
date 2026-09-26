import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Import data from honeyData.ts
import { ALL_PRODUCTS, CATEGORIES_FILTER_LIST, CATEGORIES, FEATURE_CARDS, TRUST_ITEMS, SALE_SIDEBAR_PRODUCTS } from './data/honeyData';

dotenv.config();

const uri = process.env.MONGODB_URI as string;
const tenantId = process.env.NEXT_PUBLIC_TENANT_DB as string;

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(tenantId);
    
    // 1. Seed Theme
    const themeCollection = db.collection('site_themes');
    const themeJsonPath = path.join(process.cwd(), 'theme.json');
    const themeData = JSON.parse(fs.readFileSync(themeJsonPath, 'utf-8'));
    
    await themeCollection.updateOne(
      { tenant_id: tenantId },
      { 
        $set: { 
          tenant_id: tenantId, 
          data: themeData,
          updated_at: new Date()
        } 
      },
      { upsert: true }
    );
    console.log('Theme inserted/updated successfully');

    // 2. Seed Pages
    const pagesCollection = db.collection('site_pages');
    const pagesDir = path.join(process.cwd(), 'data', 'pages');

    if (fs.existsSync(pagesDir)) {
      const files = fs.readdirSync(pagesDir).filter((file) => file.endsWith('.json'));

      for (const file of files) {
        const filePath = path.join(pagesDir, file);
        const pageContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const pageName = pageContent.name || path.basename(file, '.json');

        await pagesCollection.updateOne(
          { tenant_id: tenantId, name: pageName },
          {
            $set: {
              tenant_id: tenantId,
              name: pageName,
              content: pageContent,
              updated_at: new Date()
            }
          },
          { upsert: true }
        );
        console.log(`Seeded page: ${pageName}`);
      }
    }

    console.log('All page JSON data inserted/updated successfully');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

seed();
