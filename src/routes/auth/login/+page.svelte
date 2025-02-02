<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	let loading = $state(false);

	let email = $state('');
	let password = $state('');
	let data = $state();
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen">
	<h2 class="text-3xl">Sign In</h2>

	<div class="flex flex-col items-center justify-center">
		<form
			use:enhance={() => {
				loading = true;
				return async ({ result }) => {
					loading = false;
					if (result.type === 'success') {
						data = result.data;
						console.log('data', $state.snapshot(data));

						if (data.status === 200) {
							goto('/dashboard');
						}
					} else if (result.type === 'error') {
						data = result.error;
						console.error('Error:', data);
					}
					return data;
				};
			}}
			action="?/signIn"
			method="POST"
		>
			<div class="w-96 flex flex-col items-center justify-center gap-4">
				<div class="w-full">
					<Label for="email" class="text-xl">Email</Label>
					<Input bind:value={email} name="email" />
				</div>
				<div class="w-full">
					<Label class="text-xl" for="password">Password</Label>
					<Input bind:value={password} name="password" type="password" />
				</div>
				<Button class="w-full h-auto text-xl" disabled={loading} type="submit">Sign In</Button>
			</div>
		</form>
		<p>
			{#if data?.message}
				{data.message}
			{/if}
		</p>
	</div>
</div>
