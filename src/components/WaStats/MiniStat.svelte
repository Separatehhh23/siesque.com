<script lang="ts">
  export let amount: number;
</script>

{#if amount > 0}
  <p class="text-lg text-secondary">
    <span class="text-primary"><slot />:</span>
    {amount}
  </p>
{/if}
