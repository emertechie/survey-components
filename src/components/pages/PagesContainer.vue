<template>
  <div class="space-y-6">
    <TransitionGroup name="fade">
      <!-- NOTE: dynamic <component> needs static parent div for animations to work -->
      <div
        v-for="page of pages"
        :key="page.id"
      >
        <component
          :is="components[page.type]"
          :page="page"
          :disable-move-up="isFirstPage(page)"
          :disable-move-down="isLastPage(page)"
          @update="onPageUpdate"
          @moveUp="onMovePageUp(page)"
          @moveDown="onMovePageDown(page)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { type Component } from "vue";
import { merge } from "lodash-es";
import { type PageDefinitionType, type PageDefinition } from "@/data/definitions/survey";
import QuestionPage from "@/components/pages/QuestionPage.vue";
import CustomPage from "@/components/pages/CustomPage.vue";
import type { UpdateType, PartialWithId } from "@/components/pages/types";

const props = defineProps<{
  pages: PageDefinition[];
  updatePages: (pagesUpdater: (draftPages: PageDefinition[]) => void) => void;
}>();

const components: Record<PageDefinitionType, Component> = {
  question: QuestionPage,
  custom: CustomPage,
};

function onPageUpdate(update: PartialWithId<PageDefinition>, updateType: UpdateType) {
  props.updatePages((draftPages) => {
    const index = draftPages.findIndex((existingPage) => existingPage.id === update.id);
    if (index !== -1) {
      if (updateType === "assign") {
        Object.assign(draftPages[index], update);
      } else if (updateType === "merge") {
        merge(draftPages[index], update);
      }
    }
  });
}

function onMovePageUp(page: PageDefinition) {
  props.updatePages((draftPages: PageDefinition[]) => {
    const index = draftPages.findIndex((existingPage) => existingPage.id === page.id);
    if (index > 0) {
      const [page] = draftPages.splice(index, 1);
      draftPages.splice(index - 1, 0, page);
    }
  });
}

function onMovePageDown(page: PageDefinition) {
  props.updatePages((draftPages: PageDefinition[]) => {
    const index = draftPages.findIndex((existingPage) => existingPage.id === page.id);
    if (index < draftPages.length - 1) {
      const [page] = draftPages.splice(index, 1);
      draftPages.splice(index + 1, 0, page);
    }
  });
}

function isFirstPage(page: PageDefinition): boolean {
  return page.id === props.pages[0].id;
}

function isLastPage(page: PageDefinition): boolean {
  return page.id === props.pages[props.pages.length - 1].id;
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
  width: 100%;
}
</style>
