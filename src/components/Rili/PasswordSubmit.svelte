<script lang="ts">
  let password: string;

  async function submit() {
    const res = await fetch("/api/authorizeRili", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    });

    if (res.status !== 200) return;

    const cookie: Promise<string> = await res
      .json()
      .then((data) => data.cookie);

    document.cookie = `password=${cookie}; expires=Never; SameSite=None; secure=true; path=/`;
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
