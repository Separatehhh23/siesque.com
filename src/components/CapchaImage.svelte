<script lang="ts">
    const handleClick = () =>  {
        localStorage.setItem("iscastor", JSON.stringify(true));
        alert('Mentira! Eres un castor');
    }
</script>

<button on:click={handleClick}>
    <img
      src="trafficLight.jpeg"
      alt="semaforo"
      height="250"
      width="250"
    />
</button>
