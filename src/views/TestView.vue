<template>
  <SurveyContextProvider
    :store="surveyStore"
    :focusManager="focusManager"
  >
    <div class="fixed inset-0 flex">
      <!-- Left scrollable panel -->
      <div class="h-full w-96 overflow-y-auto border-r bg-slate-100">
        <SurveyDesigner class="p-3" />
      </div>

      <!-- Right fixed panel -->
      <div class="flex-1 bg-slate-50">
        <SurveyPreview class="preview h-full p-3 pl-5" />
      </div>
    </div>
  </SurveyContextProvider>
</template>

<script setup lang="ts">
import type { SurveyDefinition } from "@/data/definitions/survey";
import { createCheckboxDefinition, createTextDefinition } from "@/data/definitions/answerTypes";
import SurveyDesigner from "./SurveyDesigner.vue";
import SurveyPreview from "./SurveyPreview.vue";
import { useFocusManager } from "@/composables/useFocusManager";
import { useSurveyStore } from "@/stores/useSurveyStore";
import SurveyContextProvider from "@/components/SurveyContextProvider.vue";

const initialState: SurveyDefinition = {
  pages: [
    {
      id: "start",
      type: "custom",
      header: "Quick Feedback",
      content: "We'd love to hear about your experience with our app!",
    },
    {
      id: "features-question",
      type: "question",
      question: "Which features do you use most frequently?",
      answer: createTextDefinition({
        multiline: true,
        placeholder: "Enter your answer",
        required: true,
      }),
    },
    {
      id: "recommend-question",
      type: "question",
      question: "Would you recommend our app to others?",
      answer: createCheckboxDefinition({
        mustBeChecked: true,
        label: "Yes",
      }),
    },
  ],
};

const focusManager = useFocusManager();

const surveyStore = useSurveyStore(initialState);
</script>

<style scoped>
.preview {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#757ca0 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
}
</style>
