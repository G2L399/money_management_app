import { supabase } from '$lib/supabase.server';

export const load = async ({ locals }) => {
	const { data: balance, error } = await supabase
		.from('balance')
		.select('*')
		.eq('user_id', locals.user?.id); // Explicitly filter

	if (error) {
		console.error('Error fetching balance:', error);
	}

	console.log('Balance:', balance);
	return { balance };
};
