<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let loading = true;
	let errorMessage: string | null = null;

	onMount(async () => {
		const hashParams = new URLSearchParams(window.location.hash.substring(1));
		const access_token = hashParams.get('access_token');
		const refresh_token = hashParams.get('refresh_token');

		if (!access_token || !refresh_token) {
			errorMessage = 'Invalid or missing authentication parameters.';
			loading = false;
			return;
		}

		// Send the tokens to the server for authentication
		const response = await fetch('/auth/callback', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ access_token, refresh_token })
		});

		const result = await response.json();

		if (!response.ok) {
			errorMessage = result.error || 'Failed to authenticate.';
			loading = false;
		} else {
			// Redirect to dashboard on success
			goto('/dashboard');
		}
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else if errorMessage}
	<p style="color: red;">Error: {errorMessage}</p>
{:else}
	<p>Email confirmed successfully!</p>
{/if}
