<script lang="ts">
  import Submit from "./Submit.svelte";

  export let handle: (e) => void;
  export let enctype: string;
  export let action: string;
  export let method: string;
  export let loading: boolean;
</script>

<div class="gap-4 rounded-xl bg-base-200 p-4">
  <form
    on:submit|preventDefault={handle}
    class="flex flex-col gap-2"
    {action}
    {enctype}
    {method}
  >
    <slot />
    <Submit disabled={loading} />
  </form>
  <slot name="area" />
</div>
