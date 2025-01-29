<template>
  <div>
    <h1 class="mb-6 text-xl font-bold">Designer</h1>

    <div class="space-y-6">
      <TransitionGroup name="fade">
        <!-- NOTE: dynamic <component> needs static parent div for animations to work -->
        <div
          v-for="page of survey.pages"
          :key="page.id"
        >
          <component
            :is="components[page.type]"
            :page
            @update="onPageUpdate"
            @moveUp="onMovePageUp(page)"
            @moveDown="onMovePageDown(page)"
          />
        </div>
      </TransitionGroup>
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

function onMovePageUp(page: PageDefinition) {
  updateSurvey((draft) => {
    const index = draft.pages.findIndex((existingPage) => existingPage.id === page.id);
    if (index > 0) {
      const [page] = draft.pages.splice(index, 1);
      draft.pages.splice(index - 1, 0, page);
    }
  });
}

function onMovePageDown(page: PageDefinition) {
  updateSurvey((draft) => {
    const index = draft.pages.findIndex((existingPage) => existingPage.id === page.id);
    if (index < draft.pages.length - 1) {
      const [page] = draft.pages.splice(index, 1);
      draft.pages.splice(index + 1, 0, page);
    }
  });
}
</script>

<style scoped>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
