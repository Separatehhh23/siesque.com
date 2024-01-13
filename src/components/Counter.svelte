<script lang="ts">
    import { count, incrementCount as increment, resetCount as reset } from "@/stores";
</script>

<!-- <button class="btn btn-primary" on:click={increment}>Count is {$count}</button> -->

<a class="btn btn-primary" href={$count === 69 ? "/capcha" : null} on:click={increment}>Count is {$count}</a>
<button class="btn btn-secondary" on:click={reset}>Reset count</button>
