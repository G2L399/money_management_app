import prisma from '$lib/prisma.ts';

export const load = async ({ locals }) => {
	const balances = await prisma.balance.findFirst({
		where: {
			user_id: locals.user!.id
		}
	});
	const trans = await prisma.transactions.findMany({
		where: {
			user_id: locals.user!.id
		},
		include: {
			categories: true
		},
		orderBy: {
			created_at: 'desc'
		},
		take: 3
	});

	return { trans, balances };
};
