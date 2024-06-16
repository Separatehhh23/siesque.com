<script lang="ts">
  import { currentUser } from "@/lib/pocketbase";
  import { getImageURL } from "@/lib/utils";

  export let className = "";
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
  id="avatar-preview"
  class={className}
/>
