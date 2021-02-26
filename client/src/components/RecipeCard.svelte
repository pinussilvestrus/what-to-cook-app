<script>

  export let recipe = {};
</script>

<style lang="scss">
  .recipe {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;

    .container {
      padding: 2px 16px;
      text-align: center;
      color: black;
      font-weight: 150;
      font-size: 32px;
    }

    a {
      text-decoration: none;
    }

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
  }
</style>

{#if recipe.id}
  <div class="recipe">
    <a href="{recipe.url}" target="_blank">
      <img src={recipe.image} alt={recipe.name} style="width:100%">
      <div class="container">
        <p>{recipe.name}</p>
      </div>
    </a>
  </div>
{/if}