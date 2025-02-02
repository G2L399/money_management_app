import { supabase } from '$lib/supabase.server.ts';
import type { User } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

let user: User | null = null;

export const load = async () => {
	const { data } = await supabase.auth.getUser();
	user = data.user;
	console.log('user data', user);

	if (!user) {
		redirect(303, '/auth/signUp');
	}
	return user;
};
