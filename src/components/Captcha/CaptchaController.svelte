<script lang="ts">
  import { capchaOpen } from "../../stores";

  function handleToggle() {
    if ($capchaOpen) {
      capchaOpen.set(false);
    } else {
      capchaOpen.set(true);
    }
  }
</script>

<button class="btn btn-primary" on:click={handleToggle}>Show</button>
