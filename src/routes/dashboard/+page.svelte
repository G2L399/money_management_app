<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import {
		ArrowUpRight,
		ArrowDownRight,
		DollarSign,
		CreditCard,
		ShoppingCart,
		Coffee
	} from 'lucide-svelte';

	let balance = 5280.5;
	let recentTransactions = [
		{ id: 1, name: 'Grocery Store', amount: -85.2, date: '2025-02-01' },
		{ id: 2, name: 'Salary Deposit', amount: 3000, date: '2025-01-31' },
		{ id: 3, name: 'Electric Bill', amount: -120.5, date: '2025-01-30' }
	];
	let expenseCategories = [
		{ name: 'Food', amount: 450, color: 'bg-blue-500' },
		{ name: 'Transport', amount: 200, color: 'bg-green-500' },
		{ name: 'Entertainment', amount: 150, color: 'bg-yellow-500' },
		{ name: 'Bills', amount: 800, color: 'bg-red-500' }
	];

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}
</script>

<div class="flex h-screen bg-gray-100">
	<!-- Sidebar -->
	<aside class="w-64 bg-white p-6 shadow-md">
		<h1 class="mb-6 text-2xl font-bold">MoneyWise</h1>
		<nav>
			<Button variant="ghost" class="mb-2 w-full justify-start">
				<DollarSign class="mr-2 h-4 w-4" />
				Dashboard
			</Button>
			<Button variant="ghost" class="mb-2 w-full justify-start">
				<CreditCard class="mr-2 h-4 w-4" />
				Transactions
			</Button>
			<Button variant="ghost" class="mb-2 w-full justify-start">
				<ShoppingCart class="mr-2 h-4 w-4" />
				Budget
			</Button>
			<Button variant="ghost" class="w-full justify-start">
				<Coffee class="mr-2 h-4 w-4" />
				Goals
			</Button>
		</nav>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 overflow-y-auto p-8">
		<div class="mb-8 flex items-center justify-between">
			<h2 class="text-3xl font-bold">Dashboard</h2>
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" alt="User" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</div>

		<!-- Balance Card -->
		<Card class="mb-8">
			<CardHeader>
				<CardTitle>Total Balance</CardTitle>
				<CardDescription>Your current account balance</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-4xl font-bold">{formatCurrency(balance)}</p>
			</CardContent>
		</Card>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			<!-- Recent Transactions -->
			<Card>
				<CardHeader>
					<CardTitle>Recent Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					{#each recentTransactions as transaction}
						<div class="mb-4 flex items-center justify-between">
							<div>
								<p class="font-semibold">{transaction.name}</p>
								<p class="text-sm text-gray-500">{transaction.date}</p>
							</div>
							<p class={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
								{#if transaction.amount > 0}
									<ArrowUpRight class="mr-1 inline" />
								{:else}
									<ArrowDownRight class="mr-1 inline" />
								{/if}
								{formatCurrency(Math.abs(transaction.amount))}
							</p>
						</div>
						{#if transaction.id !== recentTransactions.length}
							<Separator class="my-2" />
						{/if}
					{/each}
				</CardContent>
				<CardFooter>
					<Button variant="outline" class="w-full">View All Transactions</Button>
				</CardFooter>
			</Card>

			<!-- Expense Categories -->
			<Card>
				<CardHeader>
					<CardTitle>Expense Categories</CardTitle>
				</CardHeader>
				<CardContent>
					{#each expenseCategories as category}
						<div class="mb-4">
							<div class="mb-1 flex justify-between">
								<span>{category.name}</span>
								<span>{formatCurrency(category.amount)}</span>
							</div>
						</div>
					{/each}
				</CardContent>
				<CardFooter>
					<Button variant="outline" class="w-full">Manage Budget</Button>
				</CardFooter>
			</Card>
		</div>
	</main>
</div>
