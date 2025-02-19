import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.server';
import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';

export async function handle({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve: (event: RequestEvent, opts?: ResolveOptions) => Promise<Response>;
}) {
	console.log('middleware triggered');

	const publicRoutes = ['/auth/login', '/auth/signup', '/auth/callback'];
	if (publicRoutes.includes(event.url.pathname)) {
		return resolve(event);
	}

	const accessToken = event.cookies.get('access_token');
	const refresh_token = event.cookies.get('refresh_token');
	const token_expires_at = event.cookies.get('token_expires_at');

	if (!accessToken || !refresh_token || !token_expires_at) {
		throw redirect(302, '/auth/login');
	}

	try {
		const { data, error } = await supabase.auth.getUser(accessToken);

		if (error || !data?.user) {
			event.cookies.delete('access_token', { path: '/' });
			event.cookies.delete('refresh_token', { path: '/' });
			event.cookies.delete('token_expires_at', { path: '/' });
			throw redirect(302, '/auth/login');
		}

		event.locals.user = data.user;
	} catch (err) {
		console.error('Error validating token:', err);
		throw redirect(302, '/auth/login');
	}

	return resolve(event);
}
