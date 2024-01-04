<script lang="ts">
    const handleClick = () =>  {
        localStorage.setItem("iscastor", JSON.stringify(true));
        alert('Mentira! eres un castor');
        return null;
    }
</script>

<button on:click={handleClick()}>
    <img
      src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F58594172893fc07d5b88dd15%2Ft%2F5acf3555f950b77b26f0ef7c%2F1523529051523%2Ftraffic-lights.jpg&sp=1704394558T9477e99b6cb7ce40112fd869d53cfb84c60754a1baca1c3c24f8b4c066ccff1c"
      alt="semaforo"
      class="resize"
    />
</button>