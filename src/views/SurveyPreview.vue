<template>
  <div class="relative">
    <h1 class="mb-4 text-xl font-bold">Preview</h1>
    <div
      class="absolute bottom-5 left-5 w-96 rounded-lg border border-gray-200 bg-white p-4 shadow-xl"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">{{ survey.title || "Survey Preview" }}</h2>
        <button class="text-gray-500 hover:text-gray-700">
          <span class="sr-only">Close</span>
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        class="page-wrapper mb-4 min-h-[200px] overflow-hidden"
        :style="{ height: containerHeight + 'px' }"
      >
        <template v-if="survey.pages && survey.pages.length > 0">
          <div
            class="mb-2 text-sm text-gray-500"
            ref="pageNumberEl"
          >
            Page {{ currentPageIndex + 1 }} of {{ survey.pages.length }}
          </div>
          <Transition
            :name="transitionName"
            mode="out-in"
          >
            <div
              :key="currentPageIndex"
              ref="contentEl"
              class="space-y-4"
            >
              <pre class="font-mono text-xs">{{ survey.pages[currentPageIndex] }}</pre>
            </div>
          </Transition>
        </template>
        <div
          v-else
          class="italic text-gray-500"
        >
          No pages defined yet
        </div>
      </div>

      <div class="flex justify-between">
        <button
          @click="previousPage"
          :disabled="currentPageIndex === 0"
          class="rounded bg-gray-100 px-3 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPageIndex === survey.pages?.length - 1"
          class="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSurveyContext } from "@/components/survey/design/SurveyContextProvider.vue";
import { ref, computed } from "vue";
import { useResizeObserver } from "@vueuse/core";

const { store } = useSurveyContext();
const survey = store.survey;

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
  if (survey.value.pages && currentPageIndex.value < survey.value.pages.length - 1) {
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
