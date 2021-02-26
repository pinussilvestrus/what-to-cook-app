<script>
	import RecipeCard from './components/RecipeCard.svelte';

	import Diagram from './components/Diagram.svelte';

	import diagramXML from '../../resources/diagram.bpmn';

	const clusterId = process.env.CLOUD_CLUSTER_ID;

	const orgaId = process.env.CLOUD_ORGA_ID;

	const serverUrl = process.env.camundaCloudUrl || 'http://localhost:3000';

	const camundaCloudUrl = `https://console.cloud.camunda.io/org/${orgaId}`;

	const camundaOperateUrl = `https://${clusterId}.operate.camunda.io`;

	const fetchRecipes = async () => {
		const response = await fetch(`${serverUrl}/fetch`);

		if(response.ok) {
			recipes = await response.json();
		}
	}

	const handleReloadRecipes = (event) => {
		fetchRecipes();
	}

	let recipes = [];
</script>

<style lang="scss">
	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	.header {
		h1 {
			font-size: 4em;
			font-weight: 200;
		}
	}

	.recipes-container {
		padding: 0 10rem 2rem 10rem;

		.recipes {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-auto-rows: auto;
			grid-gap: 3rem;
		}

		.empty-recipes {
			font-size: larger;
			font-style: italic;
		}

		.btn-reload {
			margin-bottom: 2rem;
			font-size: 1.2rem;
    	height: 3rem;
    	width: 12rem;
		}
	}

	.cloud-connection {
		padding: 2rem 3rem 2rem 10rem;
    text-align: left;
		background-color: #3c85ff;
		color: white;

		.diagram-box {
 			width: 33%;
			border: 1px solid #efefef;
			margin: 2rem 0;
    	padding: 2rem;
			background: white;
		}

		a {
			color: white;
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

	<div class="recipes-container">
		<button class="btn btn-primary btn-reload" on:click={handleReloadRecipes}>Reload recipes</button>

		{#if recipes.length}
			<div class="recipes">
				{#each recipes as r}
					<RecipeCard recipe={r} />
				{/each}
			</div>
		{:else}
			<div class="empty-recipes">No recipes - reload needed.</div>
		{/if}

	</div>

	<div class="cloud-connection">
		<h2>Powered by Camunda Cloud</h2>

		<p>Cluster: <a 
				href="{camundaCloudUrl + '/cluster/' + clusterId}" 
				target="_blank" 
				class="pill">{clusterId}</a>
		</p>

		<div class="diagram-box">
			<Diagram xml={diagramXML} />
		</div>

		<a href="{camundaOperateUrl + '/#/instances?filter={%22active%22:true,%22incidents%22:true,%22completed%22:true,%22canceled%22:true,%22version%22:%222%22,%22workflow%22:%22Process_1%22}&name=Process_1'}" target="_blank"> Open in Camunda Operate</a>
	</div>
</main>