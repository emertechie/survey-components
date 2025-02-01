<template>
  <div>
    <h1>{{ page.question }}</h1>
    <p>TODO</p>
  </div>
</template>

<script setup lang="ts">
import type { QuestionPageDefinition } from "@/data/definitions/survey";

defineProps<{
  page: QuestionPageDefinition;
}>();
</script>
