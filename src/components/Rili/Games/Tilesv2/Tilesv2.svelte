<script lang="ts">
  import { socket, onReadyCallback, addOpts } from "@/lib/tiles";

  let ready = false;

  onReadyCallback(() => {
    ready = true;

    addOpts({ color: "red", name: "Castor" });
  });
</script>

{#if ready}
  <p>Ready</p>
{:else}
  <p>Loading</p>
{/if}
