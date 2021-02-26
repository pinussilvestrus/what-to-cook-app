<script>
	import RecipeCard from './components/RecipeCard.svelte';

	import Diagram from './components/Diagram.svelte';

	import TEST_RECIPES from '../../resources/recipes.json';

	import diagramXML from '../../resources/diagram.bpmn';

	const CAMUNDA_CLOUD_URL = 'https://console.cloud.camunda.io/org/cfdfe9e6-ea43-4e73-848e-314838b25b24/';

	const clusterId = process.env.CLOUD_CLUSTER_ID;

	// TODO: fetch from server
	let recipes = TEST_RECIPES;

</script>


<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.header {
		h1 {
			color: #394F8A;
			font-size: 4em;
			font-weight: 200;
		}
	}

	.recipes {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
 		grid-auto-rows: auto;
		grid-gap: 3rem;
		padding: 0 5rem 2rem 5rem;
	}

	.cloud-connection {
		padding: 2rem 3rem;

		.diagram-box {
			margin: auto;
 			width: 50%;
			border: 1px solid black;
    	padding: 2rem;
		}
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<div class="header">
		<h1>What to cook next week?</h1>
	</div>

	<div class="recipes">
		{#each recipes as r}
			<RecipeCard recipe={r} />
		{/each}
	</div>

	<hr />

	<div class="cloud-connection">
		<h2>Powered by Camunda Cloud</h2>

		<p>Cluster: <a 
				href="{CAMUNDA_CLOUD_URL + 'cluster/' + clusterId}" 
				target="_blank" 
				class="pill">{clusterId}</a>
		</p>

		<div class="diagram-box">
			<Diagram xml={diagramXML} />
		</div>
	</div>
</main>