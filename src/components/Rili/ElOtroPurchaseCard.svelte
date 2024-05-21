<script lang="ts">
  import moment from "moment";
  import { elOtroPurchase, isShowingCard, hideCard } from "@/stores";

  const time = moment(
    new Date(String($elOtroPurchase.deal?.when)).getTime() -
      new Date().getTime(),
  ).utc();
  const days = time.format("D");
  const hours = time.format("HH");
  const minutes = time.format("mm");
  const seconds = time.format("SS");

  console.debug(
    "Time to VendeDOOR: ",
    new Date(String($elOtroPurchase.deal?.when)).getTime() -
      new Date().getTime(),
  );
</script>

{#if $elOtroPurchase.hasBoughtElOtro && !$isShowingCard}
  <div class="card w-96 bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">
        Vende<span
          class="inline-block bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent"
          >DOOR</span
        >
      </h2>
      <p class="text-cyan-500">
        Localizacion: <span class="text-gray-300"
          >{$elOtroPurchase.deal?.location}</span
        >
      </p>
      <p class="text-indigo-500">
        En: <span class="text-gray-300"
          >{`${days} dias, ${hours} horas, ${minutes} minutos y ${seconds} segundos`}</span
        >
      </p>
      <button class="btn btn-secondary" on:click={hideCard}>Close</button>
    </div>
  </div>
{/if}
