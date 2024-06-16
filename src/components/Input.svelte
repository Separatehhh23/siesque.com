<script lang="ts">
  export let value = "";
  export let placeholder = "";
  export let id: string;
  export let label: string;
  export let type = "text";
  export let disabled = false;
  export let required = false;
</script>

<div class="form-control mb-2 w-full max-w-lg">
  <label for={id} class="label pb-1 font-medium">
    <span class="label-text">{label}</span>
  </label>
  <input
    class="max w lg input input-bordered w-full"
    {type}
    {placeholder}
    {required}
    {disabled}
    {id}
    {value}
    name={id}
  />
</div>
