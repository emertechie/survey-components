<template>
  <div class="rounded-lg bg-white px-2 py-1 shadow">
    <h1>Custom Page</h1>
    <pre class="text-xs text-gray-500">{{ page.id }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { Custom } from "@/data/survey";
const { page } = defineProps<{ page: Custom }>();
</script>
