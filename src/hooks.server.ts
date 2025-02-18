import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.server'; // Import your Supabase client
import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';

export async function handle({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve: (event: RequestEvent, opts?: ResolveOptions) => Promise<Response>;
}) {
	const publicRoutes = ['/auth/login', '/auth/signup'];
	if (publicRoutes.includes(event.url.pathname)) {
		return resolve(event);
	}

	const accessToken = event.cookies.get('access_token');

	if (!accessToken) {
		throw redirect(302, '/login');
	}

	try {
		const { data, error } = await supabase.auth.getUser(accessToken);

		if (error || !data?.user) {
			event.cookies.delete('access_token', { path: '/' });
			event.cookies.delete('refresh_token', { path: '/' });
			event.cookies.delete('token_expires_at', { path: '/' });
			throw redirect(302, '/login');
		}

		event.locals.user = data.user;
	} catch (err) {
		console.error('Error validating token:', err);
		throw redirect(302, '/login');
	}

	return resolve(event);
}
