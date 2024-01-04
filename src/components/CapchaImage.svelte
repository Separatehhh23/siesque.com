<script lang="ts">
    const handleClick = (): null =>  {
        localStorage.setItem("iscastor", JSON.stringify(true));
        alert('Mentira! Eres un castor');
        return null;
    }
</script>

<button on:click={handleClick}>
    <img
      src="src/assets/trafficLight.jpeg"
      alt="semaforo"
      height="250"
      width="250"
    />
</button>
