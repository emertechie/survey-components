<template>
  <div
    class="rounded-lg bg-white px-2 pb-4 pt-2 shadow"
    :data-testid="page.id"
  >
    <h1 class="mb-2 font-semibold">Question</h1>

    <form
      class="mb-2 space-y-4"
      :validation-schema="pageFormSchema"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        name="question"
        :model-value="page.question"
        @update:model-value="(value) => onUpdate({ question: value })"
      >
        <FormItem>
          <FormControl>
            <Textarea
              type="text"
              placeholder="Enter question"
              v-bind="componentField"
            ></Textarea>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="answer.type"
        :model-value="page.answer?.type"
        @update:model-value="
          (value) => onUpdate({ answer: createDefaultDefinition(value) }, 'assign')
        "
      >
        <FormItem>
          <FormLabel>Answer Type</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger aria-label="Answer Type">
                <SelectValue placeholder="Select answer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text"> Text </SelectItem>
                <SelectItem
                  value="checkbox"
                  aria-label="Checkbox"
                >
                  Checkbox
                </SelectItem>
                <SelectItem value="checkbox-list"> Checkbox List </SelectItem>
                <SelectItem value="radio-list"> Radio List </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <component
        v-if="page.answer?.type"
        :is="answerFieldsByType[page.answer.type]"
        :definition="page.answer"
        @partial-update="(value: any) => onUpdate({ answer: { ...value } })"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import {
  questionPageDefinitionSchema,
  type QuestionPageDefinition,
} from "@/data/definitions/survey";
import {
  createCheckboxDefinition,
  createCheckboxListDefinition,
  createRadioListDefinition,
  createTextDefinition,
  type AnswerDefinition,
  type AnswerDefinitionType,
} from "@/data/definitions/answerTypes";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { answerFieldsByType } from "@/components/pages/answerTypeFields";
import type { UpdateType } from "./types";

const { page } = defineProps<{ page: QuestionPageDefinition }>();
const emit = defineEmits<{
  update: [Partial<QuestionPageDefinition>, UpdateType];
}>();

const pageFormSchema = toTypedSchema(questionPageDefinitionSchema);

const form = useForm({
  validationSchema: pageFormSchema,
  initialValues: page,
});

function onUpdate(update: Partial<QuestionPageDefinition>, updateType: UpdateType = "merge") {
  // For nested objects like "answer", we need to replace the entire page object to avoid stale state being left over.
  // Example: "placeholder" prop doesn't exist for a checkbox answer, so wouldn't get overridden with a merge
  const data = updateType === "assign" ? { ...page, ...update } : { id: page.id, ...update };
  emit("update", data, updateType);
}

const onSubmit = form.handleSubmit(() => {
  // onSave();
});

function createDefaultDefinition(type: AnswerDefinitionType): AnswerDefinition {
  switch (type) {
    case "text":
      return createTextDefinition();
    case "checkbox":
      return createCheckboxDefinition();
    case "checkbox-list":
      return createCheckboxListDefinition();
    case "radio-list":
      return createRadioListDefinition();
  }
}
</script>
