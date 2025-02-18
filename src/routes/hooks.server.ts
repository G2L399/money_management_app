import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.server'; // Import your Supabase client
import type { Handle } from '@sveltejs/kit';

const handle: Handle = async ({ event, resolve }) => {
	// Skip authentication checks for public routes
	const publicRoutes = ['/login', '/signup']; // Add any other public routes here
	if (publicRoutes.includes(event.url.pathname)) {
		return resolve(event);
	}

	// Check for the access_token cookie
	const accessToken = event.cookies.get('access_token');

	if (!accessToken) {
		// Redirect to /login if no access_token is found
		throw redirect(302, '/login');
	}

	// Optionally, validate the token with Supabase
	try {
		const { data, error } = await supabase.auth.getUser(accessToken);

		if (error || !data?.user) {
			// If the token is invalid or expired, clear cookies and redirect to /login
			event.cookies.delete('access_token', { path: '/' });
			event.cookies.delete('refresh_token', { path: '/' });
			event.cookies.delete('token_expires_at', { path: '/' });
			throw redirect(302, '/login');
		}

		// Attach the user data to the event.locals for use in your app
		event.locals.user = data.user;
	} catch (err) {
		console.error('Error validating token:', err);
		throw redirect(302, '/login');
	}

	// Resolve the request
	return resolve(event);
};

export default handle;
