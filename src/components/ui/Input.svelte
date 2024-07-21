<script lang="ts">
  export let id: string;
  export let label: string;
  export let disabled = false;
  export let required = false;
  export let value = "";
  export let placeholder = "";
  export let type = "text";
</script>

<div class="form-control mb-2 w-full max-w-lg">
  <label for={id} class="label pb-1 font-medium">
    <span class="label-text">{label}</span>
  </label>
  <input
    class="input input-bordered w-full max-w-lg"
    {type}
    {placeholder}
    {required}
    {disabled}
    {id}
    {value}
    name={id}
  />
</div>
