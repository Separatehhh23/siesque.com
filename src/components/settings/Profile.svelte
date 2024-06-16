<script lang="ts">
  import { Icon, Pencil } from "svelte-hero-icons";

  import SettingsLayout from "./SettingsLayout.svelte";
  import Input from "../Input.svelte";
  import { pb, currentUser } from "@/lib/pocketbase";
  import { getImageURL } from "@/lib/utils";

  export let path: string;

  let loading = false;
  let nameTaken = false;

  function showPreview(event) {
    const target = event.target;
    const files = target.files;

    if (files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const preview = document.getElementById(
        "avatar-preview",
      ) as HTMLImageElement;
      preview.src = src;
    }
  }

  async function updateProfile(event: FormDataEvent) {
    loading = true;
    nameTaken = false;

    const data = new FormData(event.target);
    const userAvatar = data.get("avatar") as File;

    if (userAvatar.size === 0) {
      data.delete("avatar");
    }

    try {
      const usersWithName = await pb
        .collection("users")
        .getFirstListItem(`name='${data.get("name")}'`);

      if (usersWithName.id && usersWithName.id !== $currentUser.id) {
        nameTaken = true;
        loading = false;
        return;
      }
    } catch (_) {}

    try {
      await pb.collection("users").update($currentUser.id, data);
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  }
</script>

<SettingsLayout {path}>
  <div class="flex h-full w-full flex-col">
    <form
      class="flex w-full flex-col space-y-2"
      enctype="multipart/form-data"
      action=""
      method="POST"
      on:submit|preventDefault={updateProfile}
    >
      <h3 class="text-2xl font-medium">Update profile</h3>
      <div class="form-control w-full max-w-lg">
        <label for="avatar" class="label pb-1 font-medium">
          <span class="label-text">Profile picture</span>
        </label>
        <label
          for="avatar"
          class="avatar w-32 rounded-full hover:cursor-pointer"
        >
          <label
            for="avatar"
            class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer"
          >
            <span class="btn btn-circle btn-secondary btn-sm">
              <Icon src={Pencil} class="h-4 w-4" />
            </span>
          </label>
          <div class="w-32 rounded-full">
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
            />
          </div>
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          value=""
          accept="image/*"
          disabled={loading}
          on:change={showPreview}
          hidden
        />
      </div>
      <Input
        id="name"
        label="Display name"
        disabled={loading}
        value={$currentUser.name}
      />
      {#if nameTaken}
        <div role="alert" class="alert alert-error w-full max-w-lg pt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>Name already taken</span>
        </div>
      {/if}
      <div class="w-full max-w-lg pt-3">
        <button
          class="btn btn-primary w-full max-w-lg"
          disabled={loading}
          type="submit"
        >
          Update profile
        </button>
      </div>
    </form>
  </div>
</SettingsLayout>
