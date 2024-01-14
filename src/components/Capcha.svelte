<script lang="ts">
    let clicked = false;

    function handleClick() {
        localStorage.setItem("iscastor", JSON.stringify(true));
        alert("Mentira! Eres un castor");
    }
</script>

<div
    class="flex size-[26rem] flex-col justify-between bg-base-200 shadow-2xl"
>
    <p class="p-2 font-bold text-secondary">
        Pulsa todos los semaforos para comprobar que no eres un castor
    </p>
    <div class="flex flex-col items-center justify-center">
        <div class="grid w-96 grid-cols-3 grid-rows-3">
            {#each Array.from({ length: 9 }, (value, index) => index) as i}
                <div class="p-2">
                    <button class="cursor-pointer" on:click={() => clicked = true}>
                        <img src="trafficLight.jpeg" alt="semaforo" width="128" />
                    </button>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex flex-row justify-end pb-4 pr-6">
        <button class="btn btn-primary" on:click={clicked ? handleClick : null}>Verify</button>
    </div>
</div>
