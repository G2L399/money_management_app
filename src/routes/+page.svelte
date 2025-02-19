<script>
	import BarChart from './component.svelte';

	let data = [
		{ year: 2010, popularity: 20 },
		{ year: 2011, popularity: 25 },
		{ year: 2012, popularity: 30 },
		{ year: 2013, popularity: 35 },
		{ year: 2014, popularity: 40 },
		{ year: 2015, popularity: 45 }
	];

	const chartConfig = {
		desktop: {
			label: 'Desktop',
			color: 'hsl(var(--chart-1))'
		},
		mobile: {
			label: 'Mobile',
			color: 'hsl(var(--chart-2))'
		}
	};
</script>

<main>
	<h1>Shadcn-like Chart in Svelte</h1>
	<BarChart />
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	h1 {
		font-family: 'Inter', sans-serif;
		margin-bottom: 20px;
	}
</style>
