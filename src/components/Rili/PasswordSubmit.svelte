<script lang="ts">
  import PasswordColector from "./PasswordColector.svelte";

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

<PasswordColector {submit} {password} />
