import { supabase } from '$lib/supabase.server.ts';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session) {
		locals.user = session.user;
		throw redirect(302, '/dashboard');
	} else {
		throw redirect(302, '/auth/login');
	}
}
