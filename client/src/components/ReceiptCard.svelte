<script>

  export let receipt = {};
</script>

<style lang="scss">
  .receipt {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;

    .container {
      padding: 2px 16px;
      text-align: center;
      color: black;
      font-weight: 150;
      font-size: 32px;
    }

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
  }
</style>

{#if receipt.id}
  <div class="receipt">
    <a href="{receipt.url}" target="_blank">
      <img src={receipt.image} alt={receipt.name} style="width:100%">
      <div class="container">
        <p>{receipt.name}</p>
      </div>
    </a>
  </div>
{/if}