<script lang="ts">
  import { cn } from "@/lib/utils";

  export let id: string;
  export let label: string;
  export let className = "";
  export let accept = "";
  export let disabled = false;
  export let required = false;
</script>

<div class="form-control mb-2 w-full max-w-lg">
  <label for={id} class="label pb-1 font-medium">
    <span class="label-text">{@html label}</span>
  </label>
  <input
    type="file"
    class={cn("file-input file-input-bordered w-full max-w-lg", className)}
    name={id}
    {id}
    {accept}
    {disabled}
    {required}
  />
</div>
