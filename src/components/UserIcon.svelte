<script lang="ts">
  import { currentUser } from "@/lib/pocketbase";
  import { getImageURL } from "@/lib/utils";

  export let id: string;
</script>

<img
  src={$currentUser.avatar
    ? getImageURL(
        $currentUser.collectionId,
        $currentUser.id,
        $currentUser.avatar,
      )
    : `https://ui-avatars.com/api/?name=${$currentUser.name}`}
  alt="Profile avatar"
  {id}
/>
