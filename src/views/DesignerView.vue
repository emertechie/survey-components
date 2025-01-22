<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Designer</h1>

    <form
      class="mb-2 space-y-4"
      :validation-schema="surveyFormSchema"
      @submit="onSubmit"
    >
      <div class="space-y-4">
        <div
          v-for="page of survey.pages"
          :key="page.id"
        >
          <component
            :is="components[page.type]"
            :modelValue="page"
            @update:modelValue="onPageChanged"
          />
        </div>
      </div>

      <Button type="submit"> Submit </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import { surveySchema, type PageType, type Survey, type Page } from "@/data/survey";
import QuestionPage from "@/components/pages/QuestionPage.vue";
import CustomPage from "@/components/pages/CustomPage.vue";
import type { Component } from "vue";

const {
  modelValue: survey,
  onSave,
  // onCancel,
} = defineProps<{
  modelValue: Survey;
  onSave: () => void;
  onCancel: () => void;
}>();

const emit = defineEmits<{
  "update:modelValue": [Survey];
}>();

const components: Record<PageType, Component> = {
  question: QuestionPage,
  custom: CustomPage,
};

const surveyFormSchema = toTypedSchema(surveySchema);

const form = useForm({
  validationSchema: surveyFormSchema,
  initialValues: survey,
});

function onPageChanged(page: Page) {
  console.log("Page changed", page);
  // TODO: apply to modelValue
  // emit("update:modelValue");
}

const onSubmit = form.handleSubmit(() => {
  onSave();
});
</script>
