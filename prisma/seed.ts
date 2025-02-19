/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../src/lib/prisma.ts';
import { fakerID_ID as faker } from '@faker-js/faker';
const user_id = 'f5bac40c-5bdc-4260-992e-f0f541502c68';
async function seed() {
	console.log(`🌱 Start Seeding...`);
	console.log(`💵 Creating balance...`);
	const balance = await prisma.balance.create({
		data: {
			user_id,
			amount: faker.number.int({ min: 10000, max: 100000 })
		}
	});
	console.log(`✅ Created balance.`);

	console.log('🗃 Creating categories...');
	const categories: any[] = [];
	for (let i = 0; i < 10; i++) {
		const category = await prisma.categories.create({
			data: {
				user_id,
				name: faker.lorem.word(5),
				amount: faker.number.int({ min: 1000, max: 10000 })
			}
		});
		categories.push(category);
	}
	console.log(`✅ Created categories.`);

	console.log(`📦 Creating transactions...`);

	for (let i = 0; i < 10; i++) {
		const category_id = faker.helpers.arrayElement(categories).id;
		await prisma.transactions.create({
			data: {
				user_id,
				category_id: category_id,
				amount: faker.number.int({ min: 1000, max: 10000 }),
				description: faker.lorem.sentence(),
				type: faker.helpers.arrayElement(['INCOME', 'EXPENSES']),
				transaction_date: faker.date.past()
			}
		});
	}
	console.log(`✅ Created transactions.`);

	console.log('🎉 Creating Goals...');

	for (let i = 0; i < 10; i++) {
		await prisma.goals.create({
			data: {
				user_id,
				name: faker.lorem.word(5),
				target_amount: faker.number.int({ min: 1000000, max: 10000000 }),
				current_amount: balance.amount,
				status: faker.helpers.arrayElement(['FAILED', 'PENDING', 'SUCCESS']),
				deadline: faker.date.future({ years: 5 })
			}
		});
	}
	console.log('✅ Created Goals.');

	console.log(`🌱 Finished Seeding!`);
}

seed()
	.catch((e) => {
		console.error('🔥 Seeding failed:', e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
