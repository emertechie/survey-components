<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Designer</h1>

    <div class="space-y-4">
      <div
        v-for="page of survey.pages"
        :key="page.id"
      >
        <component
          :is="components[page.type]"
          :page
          @partial-update="onPartialUpdate"
        />
      </div>
    </div>
    <div class="flex gap-2">
      <Button
        v-if="undo"
        @click="undo"
        >Undo</Button
      >
      <Button
        v-if="redo"
        @click="redo"
        >Redo</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component } from "vue";
import { merge } from "lodash-es";
import {
  type PageDefinitionType,
  type SurveyDefinition,
  type PageDefinition,
} from "@/data/definitions/survey";
import QuestionPage from "@/components/pages/QuestionPage.vue";
import CustomPage from "@/components/pages/CustomPage.vue";
import { Button } from "@/components/ui/button";

const { survey, updateSurvey, undo, redo } = defineProps<{
  survey: SurveyDefinition;
  updateSurvey: (updater: (draft: SurveyDefinition) => void) => void;
  undo?: () => void;
  redo?: () => void;
}>();

const components: Record<PageDefinitionType, Component> = {
  question: QuestionPage,
  custom: CustomPage,
};

type PartialWithId<T> = Partial<T> & { id: string };

function onPartialUpdate(partialUpdates: PartialWithId<PageDefinition>) {
  updateSurvey((draft) => {
    const index = draft.pages.findIndex((existingPage) => existingPage.id === partialUpdates.id);
    if (index !== -1) {
      merge(draft.pages[index], partialUpdates);
    }
  });
}
</script>
