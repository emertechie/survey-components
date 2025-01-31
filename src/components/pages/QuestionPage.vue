<template>
  <BasePage
    :page="page"
    :disable-move-up="disableMoveUp"
    :disable-move-down="disableMoveDown"
    @move-up="$emit('moveUp')"
    @move-down="$emit('moveDown')"
    @focus="onFocus"
  >
    <template #default>
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
                ref="questionInput"
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
    </template>
  </BasePage>
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
import { ref } from "vue";
import type { ForwardRefHTMLElement } from "@/components/ui/types";
import type { UpdateType } from "@/stores/useSurveyStore";
import type { ValidationResult } from "@/lib/types";
import BasePage from "./BasePage.vue";

const { page, disableMoveUp, disableMoveDown } = defineProps<{
  page: QuestionPageDefinition;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
}>();

const emit = defineEmits<{
  update: [Partial<QuestionPageDefinition>, UpdateType];
  moveUp: [];
  moveDown: [];
}>();

defineExpose({
  validate: validateForm,
});

const pageFormSchema = toTypedSchema(questionPageDefinitionSchema);
const questionInput = ref<ForwardRefHTMLElement | null>(null);

const form = useForm({
  validationSchema: pageFormSchema,
  initialValues: page,
});

async function validateForm(): Promise<ValidationResult<QuestionPageDefinition>> {
  const { valid, errors } = await form.validate();
  if (valid) {
    return { valid: true, values: form.values as QuestionPageDefinition };
  }
  // TODO: Fix TS error here - shouldn't need the cast to Record<string, string>
  return { valid: false, errors: errors as Record<string, string> };
}

function onUpdate(update: Partial<QuestionPageDefinition>, updateType: UpdateType = "merge") {
  // For nested objects like "answer", we need to replace the entire page object to avoid stale state being left over.
  // Example: "placeholder" prop doesn't exist for a checkbox answer, so wouldn't get overridden with a merge
  const data = updateType === "assign" ? { ...page, ...update } : { id: page.id, ...update };
  emit("update", data, updateType);
}

function onFocus() {
  questionInput.value?.domRef?.focus();
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
