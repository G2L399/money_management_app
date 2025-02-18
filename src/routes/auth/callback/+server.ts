import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.server.ts';
export async function POST({ request, cookies }) {
	const { access_token, refresh_token } = await request.json();

	if (!access_token || !refresh_token) {
		return json({ error: 'Invalid or missing authentication parameters' }, { status: 400 });
	}

	// Set the session with Supabase
	const { error } = await supabase.auth.setSession({ access_token, refresh_token });

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	cookies.set('sb-access-token', access_token, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 3600 // 1 hour
	});

	return json({ success: true });
}
