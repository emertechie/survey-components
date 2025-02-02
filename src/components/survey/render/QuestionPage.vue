<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium">{{ pageDefinition.question }}</h3>
    <form
      class="mb-2 space-y-4"
      @submit="onSubmit"
    >
      <component
        :is="answerFieldsByType[pageDefinition.answer.type]"
        :field-name="pageDefinition.fieldName"
        :field-definition="pageDefinition.answer"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { answerFieldsByType } from "./answerFields";
import { type QuestionPageDefinition } from "@/data/definitions/survey";

// TODO: use defineModel

const props = defineProps<{
  pageDefinition: QuestionPageDefinition;
  modelValue?: unknown;
}>();

// TOOD: dynamically generate a validation schema based on `props.pageDefinition.answer`
// const pageFormSchema = toTypedSchema(questionPageDefinitionSchema);

defineEmits<{
  "update:modelValue": [unknown];
}>();

const form = useForm({
  // validationSchema: pageFormSchema,
  // initialValues: ,
});

const onSubmit = form.handleSubmit(() => {
  // onSave();
});
</script>
