<script lang="ts">
  export let id: string;
  export let label: string;
  export let required = false;
  export let disabled = false;
  export let placeholder = "Select";
</script>

<div class="form-control mb-2 w-full max-w-lg">
  <label for={id} class="label pb-1 font-medium"
    ><span class="label-text">{label}</span></label
  >
  <select
    class="select select-bordered w-full max-w-lg"
    {required}
    {disabled}
    {id}
    name={id}
  >
    <option disabled selected>{placeholder}</option>
    <slot />
  </select>
</div>
