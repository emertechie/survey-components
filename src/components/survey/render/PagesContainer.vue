<template>
  <div>
    <div
      v-for="page of pages"
      :key="page.id"
    >
      <component
        :is="pageComponentsByType[page.type]"
        :page="page"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import type { PageDefinitionType, PageDefinition } from "@/data/definitions/survey";
import QuestionPage from "@/components/survey/render/QuestionPage.vue";
import CustomPage from "@/components/survey/render/CustomPage.vue";

defineProps<{
  pages: PageDefinition[];
}>();

const pageComponentsByType: Record<PageDefinitionType, Component> = {
  question: QuestionPage,
  custom: CustomPage,
};
</script>
