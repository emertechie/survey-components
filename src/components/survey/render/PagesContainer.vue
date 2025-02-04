<template>
  <div>
    <div
      class="mb-2 text-sm text-gray-500"
      ref="pageNumberEl"
    >
      Page {{ currentPageIndex + 1 }} of {{ pageDefinitions.length }}
    </div>

    <div
      class="page-wrapper mb-4 min-h-[200px] overflow-hidden"
      :style="{ height: containerHeight + 'px' }"
    >
      <Transition
        :name="transitionName"
        mode="out-in"
      >
        <div
          :key="currentPageIndex"
          ref="contentEl"
          class="space-y-4"
        >
          <component
            :is="pageComponentsByType[pageDefinitions[currentPageIndex].type]"
            :page-definition="pageDefinitions[currentPageIndex]"
          />
        </div>
      </Transition>
    </div>

    <div class="flex justify-between">
      <!-- TODO: use proper button component with icons -->
      <button
        @click="previousPage"
        :disabled="currentPageIndex === 0"
        class="rounded bg-gray-100 px-3 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <button
        @click="nextPage"
        :disabled="currentPageIndex === pageDefinitions.length - 1"
        class="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import type { PageDefinitionType, PageDefinition } from "@/data/definitions/survey";
import QuestionPage from "@/components/survey/render/QuestionPage.vue";
import CustomPage from "@/components/survey/render/CustomPage.vue";

import { ref, computed } from "vue";
import { useResizeObserver } from "@vueuse/core";

const props = defineProps<{
  pageDefinitions: PageDefinition[];
}>();

const pageComponentsByType: Record<PageDefinitionType, Component> = {
  question: QuestionPage,
  custom: CustomPage,
};

const currentPageIndex = ref(0);
const slideDirection = ref("next");
const containerHeight = ref(0);
const contentEl = ref<HTMLElement | null>(null);
const pageNumberEl = ref<HTMLElement | null>(null);

const transitionName = computed(() => {
  return `slide-${slideDirection.value}`;
});

useResizeObserver(contentEl, (entries) => {
  const pageNumEl = pageNumberEl.value;
  const pageNumElHeight = pageNumEl
    ? pageNumEl.offsetHeight + parseInt(getComputedStyle(pageNumEl).marginBottom)
    : 0;
  containerHeight.value = entries[entries.length - 1].contentRect.height + pageNumElHeight + 8;
});

const nextPage = () => {
  if (currentPageIndex.value < props.pageDefinitions.length - 1) {
    slideDirection.value = "next";
    currentPageIndex.value++;
  }
};

const previousPage = () => {
  if (currentPageIndex.value > 0) {
    slideDirection.value = "prev";
    currentPageIndex.value--;
  }
};
</script>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.1s ease-in-out;
}

.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.page-wrapper {
  transition: height 0.1s ease-out;
}
</style>
