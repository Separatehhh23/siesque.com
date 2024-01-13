<script lang="ts">
    import { count, incrementCount as increment, resetCount as reset } from "@/stores";
</script>

<button class="btn btn-primary" on:click={increment}>Count is {$count}</button>
<button class="btn btn-secondary" on:click={reset}>Reset count</button>
