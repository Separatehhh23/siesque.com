<script lang="ts">
  import { onMount } from "svelte";
  import { users, tilesUser } from "./$shared";
  import { currentUser } from "@/lib/pocketbase";
  import { cn } from "@/lib/utils";
  import ChooseName from "./ChooseName.svelte";
  import type { User, UserColor } from "./$shared";
  import type { Position } from "@/types";

  type TileType = "tree" | "house" | "none";

  type Tile = {
    position: Position;
    type: TileType;
    color: UserColor;
    active: boolean;
  };

  let tiles: Tile[][] = Array.from({ length: 25 }).map(() =>
    Array.from({ length: 10 }),
  );
  let treeW = 0.2;

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

    tiles[x][y].active = true;

    console.log($tilesUser);
  }

  // Perlin noise implementation
  const grad3 = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 1, -1],
    [0, -1, -1],
  ];

  const p = [];
  for (let i = 0; i < 256; i++) {
    p[i] = Math.floor(Math.random() * 256);
  }
  const perm = [];
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
  }

  function dot(g, x, y) {
    return g[0] * x + g[1] * y;
  }

  function mix(a, b, t) {
    return (1.0 - t) * a + t * b;
  }

  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function noise(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const topRight = [xf - 1.0, yf - 1.0];
    const topLeft = [xf, yf - 1.0];
    const bottomRight = [xf - 1.0, yf];
    const bottomLeft = [xf, yf];
    const gTR = grad3[perm[X + 1 + perm[Y + 1]] % 12];
    const gTL = grad3[perm[X + perm[Y + 1]] % 12];
    const gBR = grad3[perm[X + 1 + perm[Y]] % 12];
    const gBL = grad3[perm[X + perm[Y]] % 12];
    const dTR = dot(gTR, topRight[0], topRight[1]);
    const dTL = dot(gTL, topLeft[0], topLeft[1]);
    const dBR = dot(gBR, bottomRight[0], bottomRight[1]);
    const dBL = dot(gBL, bottomLeft[0], bottomLeft[1]);
    const u = fade(xf);
    const v = fade(yf);
    return mix(mix(dBL, dBR, u), mix(dTL, dTR, u), v);
  }

  function variateTile({ x, y }: Position): TileType {
    // Scale coordinates to generate larger patterns
    const scale = 0.1;
    const n = noise(x * scale, y * scale);

    // Use the noise value to decide on tree placement
    if (n > treeW) {
      return "tree";
    } else {
      return "none";
    }
  }

  function createTiles() {
    if ($tilesUser) {
      Array.from({ length: 25 }).map((_, x) =>
        Array.from({ length: 10 }).forEach((__, y) => {
          const active = $tilesUser.cells[`${x}-${y}`]?.active;
          const color = $tilesUser.color;
          const variation = variateTile({ x, y });

          tiles[x][y] = {
            position: { x, y },
            type: variation,
            active,
            color,
          };
        }),
      );
    }
  }

  onMount(() => {
    tilesUser.subscribe(() => createTiles());
    console.log("Tiles: ", tiles);
  });
</script>

{#if !$users.filter((user) => user.id === $currentUser.id).length}
  <ChooseName />
{:else}
  <div class="m-8 flex h-screen w-screen items-center justify-center p-8">
    <div class="flex flex-col">
      <div class="flex flex-row gap-2 py-2">
        <div class="form-control mb-2 w-full max-w-lg">
          <label for="treeW" class="label pb-1 font-medium">
            <span class="label-text">Tree amount</span>
          </label>
          <input
            class="input input-bordered w-full max-w-lg"
            id="treeW"
            bind:value={treeW}
          />
        </div>
      </div>
      <div class="flex flex-row">
        {#each tiles as col, x (x)}
          <div class="flex flex-col">
            {#each col as cell, y (y)}
              <button
                class={cn("h-16 w-16 cursor-pointer border", {
                  "bg-red-500": cell.color === "red" && cell.active,
                  "bg-green-500": cell.color === "red" && cell.active,
                  "bg-blue-500": cell.color === "blue" && cell.active,
                  "bg-orange-500": cell.color === "orange" && cell.active,
                  "bg-purple-500": cell.color === "purple" && cell.active,
                  "bg-white": cell.variation === "tree",
                })}
                on:click={() => handleCellClick({ x, y })}
                >{cell.variation}</button
              >
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
