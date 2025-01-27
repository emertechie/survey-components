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
          @update="onPageUpdate"
        />
      </div>
    </div>
    <!-- <div class="mt-4 flex gap-2">
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
    </div> -->
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
import type { UpdateType } from "@/components/pages/types";

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

function onPageUpdate(update: PartialWithId<PageDefinition>, updateType: UpdateType) {
  updateSurvey((draft) => {
    const index = draft.pages.findIndex((existingPage) => existingPage.id === update.id);
    if (index !== -1) {
      if (updateType === "assign") {
        Object.assign(draft.pages[index], update);
      } else if (updateType === "merge") {
        merge(draft.pages[index], update);
      }
    }
  });
}
</script>
