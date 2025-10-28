import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.sale.deleteMany();

  // Create sales
  await prisma.sale.createMany({
    data: [
      {
        productName: 'Laptop Pro',
        category: 'Electronics',
        quantity: 2,
        price: 1299.99,
        totalAmount: 2599.98,
        saleDate: new Date('2025-10-15'),
      },
      {
        productName: 'Wireless Mouse',
        category: 'Electronics',
        quantity: 5,
        price: 29.99,
        totalAmount: 149.95,
        saleDate: new Date('2025-10-16'),
      },
      {
        productName: 'Office Chair',
        category: 'Furniture',
        quantity: 3,
        price: 249.99,
        totalAmount: 749.97,
        saleDate: new Date('2025-10-17'),
      },
      {
        productName: 'Desk Lamp',
        category: 'Furniture',
        quantity: 4,
        price: 39.99,
        totalAmount: 159.96,
        saleDate: new Date('2025-10-18'),
      },
      {
        productName: 'USB-C Cable',
        category: 'Electronics',
        quantity: 10,
        price: 12.99,
        totalAmount: 129.90,
        saleDate: new Date('2025-10-19'),
      },
      {
        productName: 'Monitor 27"',
        category: 'Electronics',
        quantity: 2,
        price: 399.99,
        totalAmount: 799.98,
        saleDate: new Date('2025-10-20'),
      },
      {
        productName: 'Ergonomic Keyboard',
        category: 'Electronics',
        quantity: 3,
        price: 89.99,
        totalAmount: 269.97,
        saleDate: new Date('2025-10-21'),
      },
      {
        productName: 'Standing Desk',
        category: 'Furniture',
        quantity: 1,
        price: 599.99,
        totalAmount: 599.99,
        saleDate: new Date('2025-10-22'),
      },
      {
        productName: 'Notebook Set',
        category: 'Stationery',
        quantity: 15,
        price: 9.99,
        totalAmount: 149.85,
        saleDate: new Date('2025-10-23'),
      },
      {
        productName: 'Pen Pack',
        category: 'Stationery',
        quantity: 20,
        price: 4.99,
        totalAmount: 99.80,
        saleDate: new Date('2025-10-24'),
      },
    ],
  });

  console.log('✓ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });