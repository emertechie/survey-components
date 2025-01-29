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
import { SurveyStoreKey } from "@/components/SurveyContextProvider.vue";
import { inject } from "vue";

const store = inject(SurveyStoreKey);
if (!store) {
  throw new Error("SurveyStore not found");
}

const survey = store.survey;
</script>
