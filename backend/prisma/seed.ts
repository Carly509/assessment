// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface ClientData {
  name: string;
  birthday: string;
  type: 'Savings' | 'Checking';
  account: string;
  balance: number;
}

async function main() {
  console.log('Starting database seed...');

  // Remove duplicates by using a Map with account numbers as keys
  const clientsMap = new Map<string, ClientData>();

  const clientsData: ClientData[] = [
    {
      name: 'Alicia Marie Carter',
      birthday: '09 / 15 / 1993',
      type: 'Savings',
      account: '0596779403556',
      balance: 9876.54,
    },
    {
      name: 'David Nguyen',
      birthday: '04 / 22 / 1987',
      type: 'Checking',
      account: '1234567890123',
      balance: 8901.23,
    },
    {
      name: 'Samantha Lee Thompson',
      birthday: '12 / 07 / 1975',
      type: 'Savings',
      account: '9876543210987',
      balance: 7890.12,
    },
    {
      name: 'Marcus Jordan Pierce',
      birthday: '06 / 30 / 1990',
      type: 'Checking',
      account: '1029384756102',
      balance: 7654.32,
    },
    {
      name: 'Isabella Ramirez',
      birthday: '11 / 10 / 2002',
      type: 'Checking',
      account: '5647382910564',
      balance: 6543.21,
    },
    {
      name: 'Ethan James Holloway',
      birthday: '02 / 05 / 1981',
      type: 'Savings',
      account: '1928374655192',
      balance: 5432.1,
    },
    {
      name: 'Chloe Bennett',
      birthday: '07 / 18 / 1999',
      type: 'Checking',
      account: '3748291056374',
      balance: 4567.89,
    },
    {
      name: 'Michael Alan Rivera',
      birthday: '01 / 23 / 1985',
      type: 'Savings',
      account: '8473625142847',
      balance: 3210.98,
    },
    {
      name: 'Natalie Ortiz',
      birthday: '05 / 03 / 1978',
      type: 'Checking',
      account: '2938475610293',
      balance: 2678.9,
    },
    {
      name: 'Jason Christopher Blake',
      birthday: '10 / 12 / 2000',
      type: 'Savings',
      account: '9182736450918',
      balance: 2345.67,
    },
    {
      name: 'Emily Grace Kim',
      birthday: '03 / 29 / 1989',
      type: 'Checking',
      account: '7362810495736',
      balance: 1987.65,
    },
    {
      name: 'Liam Patterson',
      birthday: '08 / 27 / 1995',
      type: 'Savings',
      account: '1827364509182',
      balance: 1234.56,
    },
    {
      name: 'Olivia Danielle Ross',
      birthday: '12 / 19 / 1982',
      type: 'Checking',
      account: '3647382910594',
      balance: 140.31,
    },
    // Additional Dummy Data
    {
      name: 'Sophia Turner',
      birthday: '01 / 15 / 1990',
      type: 'Savings',
      account: '1112233445566',
      balance: 1500.0,
    },
    {
      name: 'James Smith',
      birthday: '07 / 25 / 1988',
      type: 'Checking',
      account: '2223344556677',
      balance: 3200.75,
    },
    {
      name: 'Mia Johnson',
      birthday: '03 / 11 / 1995',
      type: 'Savings',
      account: '3334455667788',
      balance: 4500.0,
    },
    {
      name: 'Benjamin Brown',
      birthday: '05 / 30 / 1980',
      type: 'Checking',
      account: '4445566778899',
      balance: 7800.0,
    },
    {
      name: 'Charlotte Davis',
      birthday: '09 / 22 / 1992',
      type: 'Savings',
      account: '5556677889900',
      balance: 8900.0,
    },
    {
      name: 'Lucas Wilson',
      birthday: '02 / 14 / 1986',
      type: 'Checking',
      account: '6667788990011',
      balance: 6700.0,
    },
    {
      name: 'Amelia Martinez',
      birthday: '08 / 05 / 1994',
      type: 'Savings',
      account: '7778899001122',
      balance: 5300.0,
    },
    {
      name: 'Elijah Anderson',
      birthday: '04 / 18 / 1983',
      type: 'Checking',
      account: '8889900112233',
      balance: 2200.0,
    },
    {
      name: 'Harper Thomas',
      birthday: '06 / 28 / 1991',
      type: 'Savings',
      account: '9990011223344',
      balance: 3400.0,
    },
    {
      name: 'Alexander Jackson',
      birthday: '11 / 12 / 1985',
      type: 'Checking',
      account: '0001122334455',
      balance: 4100.0,
    },
  ];

  // Remove duplicates
  clientsData.forEach((client) => {
    clientsMap.set(client.account, client);
  });

  try {
    const result = await prisma.client.createMany({
      data: Array.from(clientsMap.values()),
      skipDuplicates: true,
    });

    console.log(`Successfully seeded ${result.count} clients`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Failed to seed database:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
