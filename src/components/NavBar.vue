<script setup lang="ts">
import ProfileIcon from "./ProfileIcon.vue";
</script>

<template>
  <div class="navbar">
    <!--Logo-->
    <div class="flex-1">
      <a
        href="/"
        class="btn btn-ghost text-xl text-primary"
      >Pylinker</a>
    </div>

    <!--Blog-->
    <a
      class="btn btn-ghost text-text"
      href="/blog"
    >Blog</a>
    <div class="ml-2" />

    <!--Search Bar-->
    <div class="flex-none gap-2">
      <div class="form-control">
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered w-24 text-text md:w-auto"
        >
      </div>

      <ProfileIcon />
    </div>
  </div>
  <div class="w-screen h-0.5 bg-neutral" />
</template>
