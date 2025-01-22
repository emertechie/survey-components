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
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import { surveySchema, type PageType } from "@/data/survey";
import QuestionPage from "@/components/pages/QuestionPage.vue";
import CustomPage from "@/components/pages/CustomPage.vue";
import type { Component } from "vue";

const { survey } = defineProps<{ survey: z.infer<typeof surveySchema> }>();

const components: Record<PageType, Component> = {
  question: QuestionPage,
  custom: CustomPage,
};
</script>
