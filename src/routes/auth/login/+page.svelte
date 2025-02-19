<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';

	let loading = $state(false);
	let email = $state('');
	let password = $state('');
	let data = $state();
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<h2 class="text-3xl">Sign In</h2>

	<div class="flex flex-col items-center justify-center">
		<form
			use:enhance={() => {
				loading = true;
				const toastID = toast.loading('Logging in...', {
					description: 'Please wait while we process your request.'
				});
				return async ({ result }) => {
					loading = false;
					if (result.type === 'success') {
						data = result.data;
						if (data.status === 200) {
							toast.success('Login successful!', {
								id: toastID,
								description: ''
							});
							goto('/dashboard');
						} else {
							toast.error('Login failed!', {
								id: toastID,
								description: data.message,
								action: {
									label: 'X',
									onClick: () => {}
								}
							});
						}
					} else if (result.type === 'error') {
						data = result.error;
						console.log(data, 'data');

						toast.error('Login failed!', {
							id: toastID
						});
						console.error('Error:', data);
					}
					return data;
				};
			}}
			action="?/signIn"
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
				<Button class="h-auto w-full text-xl" disabled={loading} type="submit">Sign In</Button>
			</div>
		</form>
	</div>
</div>
