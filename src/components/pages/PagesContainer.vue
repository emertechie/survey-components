<template>
  <div class="space-y-6">
    <TransitionGroup name="fade">
      <!-- NOTE: dynamic <component> needs static parent div for animations to work -->
      <div
        v-for="(page, index) of store.survey.value.pages"
        :key="page.id"
      >
        <component
          :is="pageComponentsByType[page.type]"
          :page="page"
          :disable-move-up="isFirstPage(page)"
          :disable-move-down="isLastPage(page)"
          :ref="
            (el: PageComponent) => {
              pageRefs[index] = el;
            }
          "
          @update="onPageUpdate"
          @moveUp="onMovePageUp(page.id)"
          @moveDown="onMovePageDown(page.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, type Component } from "vue";
import { type PageDefinitionType, type PageDefinition } from "@/data/definitions/survey";
import QuestionPage from "@/components/pages/QuestionPage.vue";
import CustomPage from "@/components/pages/CustomPage.vue";
import { useSurveyContext } from "@/components/SurveyContextProvider.vue";
import { type PartialWithId, type UpdateType } from "@/stores/useSurveyStore";
import type { ValidationResult } from "@/lib/types";

defineExpose({
  validateAllPages,
});

const { store } = useSurveyContext();

type PageComponent = InstanceType<typeof CustomPage> | InstanceType<typeof QuestionPage>;

const pageComponentsByType: Record<PageDefinitionType, Component> = {
  question: QuestionPage,
  custom: CustomPage,
};

const pageRefs = ref<PageComponent[]>([]);

function onPageUpdate(update: PartialWithId<PageDefinition>, updateType: UpdateType) {
  store.updatePage(update, updateType);
}

function onMovePageUp(pageId: string) {
  store.movePageUp(pageId);
}

function onMovePageDown(pageId: string) {
  store.movePageDown(pageId);
}

function isFirstPage(page: PageDefinition): boolean {
  return page.id === store.survey.value.pages[0].id;
}

function isLastPage(page: PageDefinition): boolean {
  return page.id === store.survey.value.pages[store?.survey.value.pages.length - 1].id;
}

async function validateAllPages(): Promise<ValidationResult<PageDefinition>[]> {
  return Promise.all(
    pageRefs.value.map((pageComponent) => {
      if (pageComponent.validate) {
        return pageComponent.validate();
      }
      throw new Error("Page component does not have a validate method");
    }),
  );
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
