<template>
  <div class="flex min-h-dvh">
    <DesignerView
      :survey
      :updateSurvey
      class="w-full bg-slate-100 p-3 sm:w-[36rem]"
    />
    <PreviewView
      :survey
      class="preview hidden p-3 pl-5 sm:block sm:w-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { SurveyDefinition } from "@/data/definitions/survey";
import { createCheckboxDefinition, createTextDefinition } from "@/data/definitions/answerTypes";
import DesignerView from "./DesignerView.vue";
import PreviewView from "./PreviewView.vue";
import { useImmer } from "@/lib/useImmer";

const [survey, updateSurvey] = useImmer<SurveyDefinition>({
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
});
</script>

<style scoped>
.preview {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#757ca0 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
}
</style>
