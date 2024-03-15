<script lang="ts">
  let password: string;

  async function submit() {
    if (!password) return;

    await fetch("/api/authorizeRili", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });
  }
</script>

<form class="join" on:submit|preventDefault={submit}>
  <input
    type="text"
    class="text-text input join-item input-bordered w-24 md:w-auto"
    bind:value={password}
  />
  <button class="btn btn-primary join-item">Submit</button>
</form>
