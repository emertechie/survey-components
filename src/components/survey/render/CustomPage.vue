<template>
  <div class="space-y-2">
    <h3 class="text-lg font-medium">{{ pageDefinition.header }}</h3>
    <div>{{ pageDefinition.content }}</div>
  </div>
</template>

<script setup lang="ts">
import type { CustomPageDefinition } from "@/data/definitions/survey";

defineProps<{
  pageDefinition: CustomPageDefinition;
}>();
</script>
