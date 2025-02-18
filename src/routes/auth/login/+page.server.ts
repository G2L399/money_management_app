import { supabase } from '$lib/supabase.server.ts';

export const actions = {
	async signIn({ request, cookies }) {
		const formData = new URLSearchParams(await request.text());
		const email = formData.get('email')!;
		const password = formData.get('password')!;

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			return { message: error.message, status: 400 };
		}
		const { access_token, refresh_token, expires_in, expires_at } = data.session;

		cookies.set('access_token', access_token, {
			path: '/',
			httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
			secure: true, // Ensures the cookie is only sent over HTTPS
			sameSite: 'strict', // Protects against CSRF attacks
			maxAge: expires_in // Cookie expiration time in seconds
		});

		cookies.set('refresh_token', refresh_token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // Refresh token typically lasts longer (e.g., 7 days)
		});

		// Optionally, store expiration details in cookies
		cookies.set('token_expires_at', expires_at!.toString(), {
			path: '/',
			httpOnly: false, // Can be accessed by client-side code if needed
			secure: true,
			sameSite: 'strict',
			maxAge: expires_in
		});

		return {
			message: 'Successfully signed in',
			status: 200,
			redirect: '/dashboard',
			data
		};
	}
};
