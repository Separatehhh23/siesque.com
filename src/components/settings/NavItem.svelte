<script lang="ts">
  import { cn } from "@/lib/utils";

  export let path: string;
  export let href: string;
</script>

<li>
  <a {href} class={cn("font-medium", { active: path === href })}><slot /></a>
</li>
