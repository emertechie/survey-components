<template>
  <nav class="flex h-16 items-center px-3">
    <h1 class="mr-16 text-xl font-bold">Swift Survey</h1>
    <MainNav class="mr-auto" />
    <UserNav />
  </nav>
</template>

<script setup lang="ts">
import MainNav from "./MainNav.vue";
import UserNav from "./UserNav.vue";
</script>
