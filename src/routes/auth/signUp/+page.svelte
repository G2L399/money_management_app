<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	let loading = $state(false);

	let email = $state('');
	let password = $state('');
	let data = $state();
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<h2 class="text-3xl">Sign Up</h2>

	<div class="flex flex-col items-center justify-center">
		<form
			use:enhance={() => {
				loading = true;
				return async ({ result }) => {
					loading = false;
					data = result;
					return (data = data.data);
				};
			}}
			action="?/signup"
			method="POST"
		>
			<div class="flex w-96 flex-col items-center justify-center gap-4">
				<div class="w-full">
					<Label for="email" class="text-xl">Email</Label>
					<Input bind:value={email} name="email" />
				</div>
				<div class="w-full">
					<Label class="text-xl" for="password">Password</Label>
					<Input bind:value={password} name="password" type="password" />
				</div>
				<Button class="h-auto w-full text-xl" disabled={loading} type="submit">Sign Up</Button>
			</div>
		</form>
		<a href="/auth/login" aria-label="Login">Have an account?</a>
		<p>
			{#if data?.message}
				{data.message}
			{/if}
		</p>
	</div>
</div>
