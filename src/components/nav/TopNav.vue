<template>
  <nav class="flex h-16 items-center justify-between border-b px-3">
    <div class="flex items-center gap-2">
      <h1 class="text-xl font-bold">Swift Survey</h1>
      <div class="ml-1 rounded-lg bg-amber-600 px-3 py-1 text-[10px] text-white">Early WIP!</div>
      <MainNav class="ml-10 hidden sm:block" />
    </div>
    <UserNav />
  </nav>
</template>

<script setup lang="ts">
import MainNav from "./MainNav.vue";
import UserNav from "./UserNav.vue";
</script>
