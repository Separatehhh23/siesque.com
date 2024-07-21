<script lang="ts">
  export let show = true;
  export let title: string;
</script>

{#if show}
  <div>
    <h1 class="text-primary">{title}</h1>
    <ul>
      <slot />
    </ul>
  </div>
{/if}
