<script lang="ts">
  import PasswordColector from "./PasswordColector.svelte";

  let password: string;

  async function submit() {}
</script>

<PasswordColector {submit} {password} />
