import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_API_KEY } from '$env/static/private';
if (!SUPABASE_URL || !SUPABASE_API_KEY) {
	throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
