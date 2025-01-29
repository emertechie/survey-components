<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Preview</h1>
    <div>
      <div class="mb-4 text-sm italic">Coming soon... For now, here's the JSON</div>
      <pre class="font-mono text-xs">{{ survey }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type SurveyDefinition } from "@/data/definitions/survey";

const { survey } = defineProps<{ survey: SurveyDefinition }>();
</script>
