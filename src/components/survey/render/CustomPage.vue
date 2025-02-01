<template>
  <div>
    <h1 v-if="page.header">{{ page.header }}</h1>
    <pre>{{ page.content }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { CustomPageDefinition } from "@/data/definitions/survey";

defineProps<{
  page: CustomPageDefinition;
}>();
</script>
