<template>
  <div>
    <h1 class="text-xl font-bold">Preview</h1>
    <div>
      <pre class="font-mono text-xs">{{ survey }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type SurveyDefinition } from "@/data/survey";

const { survey } = defineProps<{ survey: SurveyDefinition }>();
</script>
