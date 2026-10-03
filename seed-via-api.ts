/**
 * OPG Bartolović — Kalp-Admin API Seed Script
 * Uses the kalp-admin REST API (POST/PUT) to create/update all pages + publish them.
 * Run: npx tsx seed-via-api.ts
 */

import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const FASTAPI_URL = (process.env.FASTAPI_URL || 'https://admin.kalptree.xyz/api').replace(/\/$/, '');
const DB_NAME = process.env.TENANT_DB_NAME || 'kp_opg_bartolovic';

const HEADERS = {
  'Content-Type': 'application/json',
  'x-tenant-db': DB_NAME,
};

function loadPayload(slug: string): Record<string, any> {
  const safeSlug = slug.replace('-', '_');
  const candidates = [slug, safeSlug];
  for (const s of candidates) {
    const p = path.join(process.cwd(), 'src', 'data', 'pages', `${s}.json`);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf-8'));
  }
  return {};
}

// ─── Page definitions with full CMS content ───────────────────────────────────

function buildPages() {
  const home = loadPayload('home');
  const about = loadPayload('about');
  const contact = loadPayload('contact');
  const shop = loadPayload('shop');
  const cart = loadPayload('cart');
  const checkout = loadPayload('checkout');
  const productDetail = loadPayload('product_detail');

  return [
    {
      slug: 'home',
      title: { en: 'Naslovna' },
      metaTitle: { en: 'OPG Bartolović – Prirodni Domaći Med iz Slavonije' },
      metaDescription: { en: 'Okusite tradiciju i čistoću prirode. Med sakupljen s ljubavlju na livadama Slavonije.' },
      isPublished: true,
      content: [
        {
          id: 'hero-section',
          type: 'hero',
          adminTitle: 'Hero sekcija',
          props: {
            title: { en: home.hero?.title || '100% Prirodni Slavonski Med' },
            subtitle: { en: home.hero?.subtitle || '' },
            buttonText: { en: home.hero?.buttonText || 'Istražite proizvode' },
            bgImage: '/img/hero-img.png',
          },
        },
        {
          id: 'feature-cards-section',
          type: 'featureCards',
          adminTitle: 'Kartice prednosti',
          props: {
            items: (home.featureCards || []).map((c: any) => ({
              id: c.id,
              iconType: c.iconType,
              title: { en: c.title },
              description: { en: c.description },
            })),
          },
        },
        {
          id: 'categories-grid-section',
          type: 'categoriesGrid',
          adminTitle: 'Kategorije',
          props: {
            title: { en: home.categoriesGrid?.title || 'Naše Kategorije' },
            subtitle: { en: home.categoriesGrid?.subtitle || '' },
            categories: (home.categoriesGrid?.categories || []).map((c: any) => ({
              id: c.id,
              title: { en: c.title },
              image: c.image,
            })),
          },
        },
        {
          id: 'bestsellers-section',
          type: 'bestsellers',
          adminTitle: 'Najprodavaniji',
          props: {
            title: { en: home.bestsellers?.title || 'Najprodavaniji proizvodi' },
            subtitle: { en: home.bestsellers?.subtitle || '' },
            viewAllText: { en: home.bestsellers?.viewAllText || 'Prikaži sve' },
          },
        },
        {
          id: 'story-section',
          type: 'storySection',
          adminTitle: 'Naša priča',
          props: {
            title: { en: home.storySection?.title || 'OPG Bartolović' },
            subtitle: { en: home.storySection?.subtitle || '' },
            description: (home.storySection?.description || []).map((d: string) => ({ en: d })),
            image: '/img/about-img.png',
          },
        },
        {
          id: 'trust-bar-section',
          type: 'trustBar',
          adminTitle: 'Traka povjerenja',
          props: {
            items: (home.trustBar || []).map((t: any) => ({
              id: t.id,
              icon: t.icon,
              title: { en: t.title },
              subtitle: { en: t.subtitle },
            })),
          },
        },
        {
          id: 'cta-banner-section',
          type: 'ctaBanner',
          adminTitle: 'CTA Banner',
          props: {
            title: { en: home.ctaBanner?.title || 'Naručite odmah' },
            subtitle: { en: home.ctaBanner?.subtitle || '' },
            buttonText: { en: home.ctaBanner?.buttonText || 'Naručite odmah' },
            image: '/img/cta-img.png',
          },
        },
      ],
    },
    {
      slug: 'about',
      title: { en: 'O nama' },
      metaTitle: { en: 'O nama – OPG Bartolović' },
      metaDescription: { en: 'Naše pčelarstvo nije samo posao – to je obiteljska priča koja traje generacijama.' },
      isPublished: true,
      content: [
        {
          id: 'about-hero-section',
          type: 'hero',
          adminTitle: 'O nama Hero',
          props: {
            title: { en: about.hero?.title || 'O nama' },
            subtitle: { en: about.hero?.subtitle || '' },
            bgImage: '/img/about-img.png',
          },
        },
        {
          id: 'about-story-section',
          type: 'story',
          adminTitle: 'Naša priča',
          props: {
            title: { en: about.story?.title || '' },
            paragraphs: (about.story?.paragraphs || []).map((p: string) => ({ en: p })),
            buttonText: { en: about.story?.buttonText || '' },
          },
        },
        {
          id: 'about-specialties-section',
          type: 'specialties',
          adminTitle: 'Specijaliteti',
          props: {
            title: { en: about.specialties?.title || '' },
            list: (about.specialties?.list || []).map((l: string) => ({ en: l })),
            image: about.specialties?.image || '/img/about-service.png',
            footerText: { en: about.specialties?.footerText || '' },
          },
        },
        {
          id: 'about-team-section',
          type: 'team',
          adminTitle: 'Naš tim',
          props: {
            title: { en: about.team?.title || 'Naš tim' },
            subtitle: { en: about.team?.subtitle || '' },
            members: (about.team?.members || []).map((m: any) => ({
              name: { en: m.name },
              role: { en: m.role },
              image: m.image,
            })),
          },
        },
      ],
    },
    {
      slug: 'contact',
      title: { en: 'Kontakt' },
      metaTitle: { en: 'Kontakt – OPG Bartolović' },
      metaDescription: { en: 'Javite nam se – rado odgovaramo na vaša pitanja.' },
      isPublished: true,
      content: [
        {
          id: 'contact-hero-section',
          type: 'hero',
          adminTitle: 'Kontakt Hero',
          props: {
            title: { en: contact.hero?.title || 'Kontaktirajte nas' },
            subtitle: { en: contact.hero?.subtitle || '' },
            bgImage: '/img/contact-img.png',
          },
        },
        {
          id: 'contact-details-section',
          type: 'contactDetails',
          adminTitle: 'Kontakt detalji',
          props: {
            phone: contact.contactDetails?.phone || '+385 91 234 5678',
            email: contact.contactDetails?.email || 'info@opg-bartolovic.hr',
            address: contact.contactDetails?.address || { en: 'Ulica Pčelara 12, 31550 Valpovo, Hrvatska' },
            workingHours: contact.contactDetails?.workingHours || { en: 'Pon – Pet: 08:00 – 17:00' },
          },
        },
        {
          id: 'contact-form-section',
          type: 'contactForm',
          adminTitle: 'Kontakt forma',
          props: {
            title: { en: contact.contactForm?.title || 'Pošaljite nam poruku' },
            submitText: { en: contact.contactForm?.submitText || 'Pošalji poruku' },
          },
        },
      ],
    },
    {
      slug: 'shop',
      title: { en: 'Trgovina' },
      metaTitle: { en: 'Trgovina – OPG Bartolović' },
      metaDescription: { en: 'Kupite prirodni domaći med iz Slavonije. Besplatna dostava za narudžbe iznad 30€.' },
      isPublished: true,
      content: [
        {
          id: 'shop-banner-section',
          type: 'banner',
          adminTitle: 'Naslov trgovine',
          props: {
            title: { en: shop.banner?.title || 'Naši proizvodi' },
            subtitle: { en: shop.banner?.subtitle || 'Svi naši med i pčelinji proizvodi, direktno iz prirode do vašeg stola.' },
            image: '/img/services-img-1.png',
          },
        },
        {
          id: 'shop-categories-filter',
          type: 'categoriesFilter',
          adminTitle: 'Filter kategorija',
          props: {
            title: { en: 'Filter po kategoriji' },
            categories: shop.categoriesFilter || ['Svi proizvodi', 'Med u saću', 'Tekući med', 'Med s dodacima', 'Propolis i pelud'],
          },
        },
        {
          id: 'shop-product-grid',
          type: 'productGrid',
          adminTitle: 'Popis proizvoda',
          props: {
            saleSidebarTitle: { en: shop.saleSidebarTitle || 'Akcijski proizvodi' },
            emptyText: { en: 'Nema pronađenih proizvoda.' },
          },
        },
      ],
    },
    {
      slug: 'cart',
      title: { en: 'Košarica' },
      metaTitle: { en: 'Košarica – OPG Bartolović' },
      metaDescription: { en: 'Pregledajte svoju košaricu i nastavite na plaćanje.' },
      isPublished: true,
      content: [
        {
          id: 'cart-section',
          type: 'cart',
          adminTitle: 'Košarica',
          props: {
            emptyTitle: { en: cart.emptyState?.title || 'Vaša košarica je prazna' },
            emptySubtitle: { en: cart.emptyState?.subtitle || 'Dodajte neke proizvode u košaricu.' },
            continueShoppingText: { en: 'Nastavi kupovinu' },
            checkoutText: { en: 'Nastavite na plaćanje' },
          },
        },
      ],
    },
    {
      slug: 'checkout',
      title: { en: 'Plaćanje' },
      metaTitle: { en: 'Plaćanje – OPG Bartolović' },
      metaDescription: { en: 'Dovršite svoju narudžbu.' },
      isPublished: true,
      content: [
        {
          id: 'checkout-form-section',
          type: 'checkoutForm',
          adminTitle: 'Forma za narudžbu',
          props: {
            title: { en: checkout.checkoutForm?.title || 'Podaci za dostavu' },
            orderSummaryTitle: { en: checkout.orderSummary?.title || 'Pregled narudžbe' },
            submitText: { en: 'Naruči' },
            successTitle: { en: checkout.successMessage?.title || 'Hvala na narudžbi!' },
            successMessage: { en: checkout.successMessage?.subtitle || 'Potvrdili smo vašu narudžbu. Uskoro ćemo vas kontaktirati.' },
          },
        },
      ],
    },
    {
      slug: 'product-detail',
      title: { en: 'Detalji proizvoda' },
      metaTitle: { en: 'Proizvod – OPG Bartolović' },
      metaDescription: { en: 'Prirodni pčelinji proizvodi OPG Bartolović.' },
      isPublished: true,
      content: [
        {
          id: 'product-detail-section',
          type: 'productDetail',
          adminTitle: 'Detalji proizvoda',
          props: {
            addToCartText: { en: typeof productDetail.addToCartButton === 'string' ? productDetail.addToCartButton : (productDetail.addToCartButton?.text || 'Dodaj u košaricu') },
            addedBannerText: { en: productDetail.addedBanner?.suffix || 'Dodano u košaricu' },
            freeShippingText: { en: productDetail.freeShippingText || 'Besplatna dostava za narudžbe iznad 30€' },
            categoryPrefix: { en: productDetail.categoryPrefix || 'Kategorija:' },
            tabs: typeof productDetail.tabs === 'object' && !Array.isArray(productDetail.tabs)
              ? Object.entries(productDetail.tabs).map(([id, label]) => ({ id, label: { en: label as string } }))
              : (Array.isArray(productDetail.tabs) ? productDetail.tabs.map((t: any) => ({ id: t.id, label: { en: t.label } })) : []),
            reviewsTitle: { en: productDetail.reviewsSection?.title || 'Recenzije kupaca' },
            relatedTitle: { en: productDetail.relatedProducts?.title || 'Slični proizvodi' },
          },
        },
      ],
    },
  ];
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiPost(path: string, body: any): Promise<any> {
  const res = await fetch(`${FASTAPI_URL}/${path}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  return res.json();
}

async function apiPut(path: string, body: any): Promise<any> {
  const res = await fetch(`${FASTAPI_URL}/${path}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  return res.json();
}

async function apiGet(path: string): Promise<any> {
  const res = await fetch(`${FASTAPI_URL}/${path}`, {
    method: 'GET',
    headers: HEADERS,
  });
  return res.json();
}

// ─── Main seed ────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🍯 OPG Bartolović — Kalp-Admin API Seed');
  console.log(`🔗 API: ${FASTAPI_URL}`);
  console.log(`📦 DB:  ${DB_NAME}\n`);

  const pages = buildPages();

  // ── 1. Seed Pages ────────────────────────────────────────────────────────────
  console.log('📄 Seeding pages via API...\n');

  for (const page of pages) {
    const { slug, ...pageBody } = page;

    // Check if page exists
    const existing = await apiGet(`cms/pages/${slug}`);

    let result: any;
    if (existing?.data?.slug === slug) {
      // Update existing page
      result = await apiPut(`cms/pages/${slug}`, {
        slug,
        ...pageBody,
        status: 'published',
      });
      const action = result?.success ? '✏️  UPDATED' : '❌ FAILED';
      console.log(`  ${action}: ${slug} [${page.content.length} sections] ${result?.success ? '' : JSON.stringify(result).substring(0, 100)}`);
    } else {
      // Create new page
      result = await apiPost('cms/pages', {
        slug,
        ...pageBody,
        status: 'published',
      });
      const action = result?.success ? '🆕 CREATED' : '❌ FAILED';
      console.log(`  ${action}: ${slug} [${page.content.length} sections] ${result?.success ? '' : JSON.stringify(result).substring(0, 100)}`);
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  // ── 2. Verify ─────────────────────────────────────────────────────────────────
  console.log('\n📋 Verifying pages from API...');
  const allPages = await apiGet('cms/pages?limit=50');
  const pageList = allPages?.data || [];
  console.log(`   Total pages visible: ${pageList.length}`);
  pageList.forEach((p: any) => console.log(`   - ${p.slug} | ${JSON.stringify(p.title)} | published: ${p.isPublished}`));

  console.log('\n🎉 Done! Open Kalp-Admin and click "Refresh pages".');
  console.log('🔗 https://zero.kalptree.xyz\n');
}

seed().catch(console.error);
