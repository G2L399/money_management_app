import { supabase } from '$lib/supabase.server.ts';

export const actions = {
	async signup({ request }) {
		const formData = new URLSearchParams(await request.text());
		const email = formData.get('email')!;
		const password = formData.get('password')!;

		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) {
			return { status: 400, message: error.message };
		}

		return {
			message: 'Check your email for confirmation!',
			status: 200,
			redirect: '/auth/callback',
			data
		};
	}
};
