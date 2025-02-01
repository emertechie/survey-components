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

      <template v-if="survey.pages && survey.pages.length > 0">
        <PagesContainer :pages="survey.pages" />
      </template>
      <div
        v-else
        class="italic text-gray-500"
      >
        No pages defined yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSurveyContext } from "@/components/survey/design/SurveyContextProvider.vue";
import PagesContainer from "@/components/survey/render/PagesContainer.vue";
const { store } = useSurveyContext();
const survey = store.survey;
</script>
