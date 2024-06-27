<script lang="ts">
  import { users, tilesUser } from "./$shared";
  import { currentUser } from "@/lib/pocketbase";
  import { cn } from "@/lib/utils";
  import ChooseName from "./ChooseName.svelte";
  import type { User } from "./$shared";
  import type { Position } from "@/types";

  function handleCellClick({ x, y }: Position) {
    const id = `${x}-${y}`;
    const cell = $tilesUser.cells[id];

    tilesUser.set({
      ...$tilesUser,
      cells: {
        ...$tilesUser.cells,
        [id]: {
          id,
          position: {
            x,
            y,
          },
          active: cell ? !cell.active : true,
        },
      },
    } as User);

    console.log($tilesUser);
  }
</script>

{#if !$users.filter((user) => user.id === $currentUser.id).length}
  <ChooseName />
{:else}
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="flex flex-row">
      {#each Array.from({ length: 25 }) as _, x (x)}
        <div class="flex flex-col">
          {#each Array.from({ length: 10 }) as __, y (y)}
            {@const active = $tilesUser.cells[`${x}-${y}`]?.active}
            {@const color = $tilesUser.color}
            <button
              class={cn("h-16 w-16 cursor-pointer border", {
                "bg-red-500": color === "red" && active,
                "bg-green-500": color === "red" && active,
                "bg-blue-500": color === "blue" && active,
                "bg-orange-500": color === "orange" && active,
                "bg-purple-500": color === "purple" && active,
              })}
              on:click={() => handleCellClick({ x, y })}
            ></button>
          {/each}
        </div>
      {/each}
    </div>
  </div>
{/if}
