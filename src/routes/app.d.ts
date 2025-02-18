import type { User } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
