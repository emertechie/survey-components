<template>
  <div class="rounded bg-white px-2 py-1 shadow">
    <h1>Question Page</h1>
    <pre class="text-xs text-gray-500">{{ page.id }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { QuestionPage } from "@/data/survey";
const { page } = defineProps<{ page: QuestionPage }>();
</script>
