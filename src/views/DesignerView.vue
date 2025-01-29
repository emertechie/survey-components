<template>
  <div>
    <h1 class="mb-6 text-xl font-bold">Designer</h1>

    <PagesContainer
      :pages="survey.pages"
      :updatePages="updatePages"
    />
  </div>
</template>

<script setup lang="ts">
import { type SurveyDefinition } from "@/data/definitions/survey";
import PagesContainer from "@/components/pages/PagesContainer.vue";

const { survey, updateSurvey } = defineProps<{
  survey: SurveyDefinition;
  updateSurvey: (updater: (draft: SurveyDefinition) => void) => void;
}>();

function updatePages(pagesUpdater: (draftPages: SurveyDefinition["pages"]) => void) {
  updateSurvey((draftSurvey) => {
    pagesUpdater(draftSurvey.pages);
  });
}
</script>
