<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data = [
		{ month: 'Jan', desktop: 186, mobile: 80 },
		{ month: 'Feb', desktop: 305, mobile: 200 },
		{ month: 'Mar', desktop: 237, mobile: 120 },
		{ month: 'Apr', desktop: 73, mobile: 190 },
		{ month: 'May', desktop: 209, mobile: 130 },
		{ month: 'Jun', desktop: 214, mobile: 140 }
	];

	export let config = {
		desktop: {
			label: 'Desktop',
			color: 'rgba(255,0,0,1)'
		},
		mobile: {
			label: 'Mobile',
			color: 'rgba(255,0,0,1)'
		}
	};

	let chart;
	/**
	 * @type {import("chart.js").ChartItem}
	 */
	let chartElement;

	onMount(() => {
		chart = new Chart(chartElement, {
			type: 'line',
			data: {
				labels: data.map((d) => d.month),
				datasets: [
					{
						label: config.desktop.label,
						data: data.map((d) => d.desktop),
						borderColor: config.desktop.color,
						backgroundColor: config.desktop.color,
						tension: 0,
						pointStyle: 'rect',
						pointRadius: 10,
						pointHoverRadius: 6
					},
					{
						label: config.mobile.label,
						data: data.map((d) => d.mobile),
						borderColor: config.mobile.color,
						backgroundColor: config.mobile.color,
						tension: 0,
						pointStyle: 'rect',
						pointRadius: 10,
						pointHoverRadius: 6,
						hoverBackgroundColor: 'red'
					}
				]
			},
			options: {
				interaction: {
					intersect: false
				},
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'bottom',
						labels: {
							usePointStyle: true,
							pointStyle: 'rect',
							padding: 10,
							font: {
								family: "'Inter', sans-serif",
								size: 12
							}
						}
					},
					tooltip: {
						backgroundColor: 'hsl(var(--background))',
						bodyColor: 'hsl(var(--muted-foreground))',
						borderColor: 'hsl(var(--border))',
						borderWidth: 5,
						bodyFont: {
							family: "'Inter', sans-serif",
							size: 12
						},
						titleFont: {
							family: "'Inter', sans-serif",
							size: 14,
							weight: 'bold'
						}
					}
				},
				scales: {
					x: {
						ticks: {
							font: {
								family: "'Inter', sans-serif",
								size: 12
							}
						}
					},
					y: {
						beginAtZero: true,
						ticks: {
							font: {
								family: "'Inter', sans-serif",
								size: 12
							}
						}
					}
				}
			}
		});
	});
</script>

<div class="chart-container">
	<canvas bind:this={chartElement}></canvas>
</div>

<style>
	.chart-container {
		min-height: 300px;
		width: 100%;
	}

	:global(:root) {
		--chart-1: 220 70% 50%;
		--chart-2: 160 60% 45%;
		--chart-3: 30 80% 55%;
		--chart-4: 280 65% 60%;
		--chart-5: 340 75% 55%;
		--background: 0 0% 100%;
		--foreground: 222.2 84% 4.9%;
		--muted-foreground: 215.4 16.3% 46.9%;
		--border: 214.3 31.8% 91.4%;
	}

	:global(.dark) {
		--chart-1: 220 70% 50%;
		--chart-2: 160 60% 45%;
		--chart-3: 30 80% 55%;
		--chart-4: 280 65% 60%;
		--chart-5: 340 75% 55%;
		--background: 222.2 84% 4.9%;
		--foreground: 210 40% 98%;
		--muted-foreground: 215 20.2% 65.1%;
		--border: 217.2 32.6% 17.5%;
	}
</style>
