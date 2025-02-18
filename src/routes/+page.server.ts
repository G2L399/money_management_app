// import { supabase } from '$lib/supabase.server.ts';
// import { redirect } from '@sveltejs/kit';

// export async function load() {
// 	const {
// 		data: { session }
// 	} = await supabase.auth.getSession();

// 	if (session) {
// 		throw redirect(302, '/dashboard');
// 	} else {
// 		throw redirect(302, '/auth/login');
// 	}
// }
