import { supabase } from '$lib/supabase.server.ts';

export const actions = {
	async signIn({ request }) {
		console.log('request', request);

		const formData = new URLSearchParams(await request.text());
		const email = formData.get('email')!;
		const password = formData.get('password')!;

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			return { message: error.message, status: 400 };
		}
		return {
			message: 'Successfully signed in',
			status: 200,
			redirect: '/dashboard',
			data
		};
	}
};
