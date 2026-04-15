import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SEED_CATEGORIES = [
  { name: 'Mobiles', slug: 'mobiles', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80' },
  { name: 'Electronics', slug: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80' },
  { name: 'Fashion', slug: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80' },
  { name: 'Home', slug: 'home', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80' }
];

const SEED_PRODUCTS = [
  // Mobiles
  {
    categorySlug: 'mobiles',
    name: 'Apple iPhone 15 (Black, 128 GB)',
    slug: 'apple-iphone-15-black-128gb',
    brand: 'Apple',
    description: 'Dynamic Island bubbles up alerts and Live Activities. 48MP Main camera with 2x Telephoto. USB-C connector.',
    price: 65999,
    originalPrice: 79900,
    discount: 17,
    rating: 4.6,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'https://images.unsplash.com/photo-1533228100845-08145b01de14?w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80'
    ]
  },
  {
    categorySlug: 'mobiles',
    name: 'SAMSUNG Galaxy S24 5G (Onyx Black, 256 GB)',
    slug: 'samsung-galaxy-s24-5g-onyx-black-256gb',
    brand: 'Samsung',
    description: 'Galaxy AI is here. Welcome to the era of mobile AI.',
    price: 79999,
    originalPrice: 89999,
    discount: 11,
    rating: 4.7,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
      'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=800&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cddea?w=800&q=80'
    ]
  },
  // Add 48 more products exactly following this structure...
];

async function main() {
  console.log(`Start seeding ...`);
  
  // Seed Categories
  for (const cat of SEED_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        imageUrl: cat.imageUrl,
      },
    });
  }

  // Seed Products
  for (const prodData of SEED_PRODUCTS) {
    const category = await prisma.category.findUnique({
      where: { slug: prodData.categorySlug }
    });

    if (category) {
      const product = await prisma.product.upsert({
        where: { slug: prodData.slug },
        update: {},
        create: {
          categoryId: category.id,
          name: prodData.name,
          slug: prodData.slug,
          brand: prodData.brand,
          description: prodData.description,
          price: prodData.price,
          originalPrice: prodData.originalPrice,
          discount: prodData.discount,
          rating: prodData.rating,
          stock: prodData.stock,
          images: {
            create: prodData.images.map((url, i) => ({
              url,
              isPrimary: i === 0
            }))
          }
        }
      });
      console.log(`Created product: ${product.name}`);
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });