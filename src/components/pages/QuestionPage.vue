<template>
  <div class="rounded-lg bg-white px-2 py-2 shadow">
    <h1 class="mb-2 font-semibold">Question Page</h1>

    <form
      class="mb-2 space-y-4"
      :validation-schema="pageFormSchema"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        name="question"
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
        @update:model-value="(value) => onUpdate({ answer: createDefaultDefinition(value) })"
      >
        <FormItem>
          <FormLabel>Answer Type</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select answer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text"> Text </SelectItem>
                <SelectItem value="checkbox"> Checkbox </SelectItem>
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
      />

      <Button type="submit"> Submit </Button>
    </form>

    <pre>{{ page.answer.type }}</pre>
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { answerFieldsByType } from "@/components/pages/answerTypeFields";

const { page } = defineProps<{ page: QuestionPageDefinition }>();
const emit = defineEmits<{
  "update:modelValue": [Partial<QuestionPageDefinition>];
}>();

const pageFormSchema = toTypedSchema(questionPageDefinitionSchema);

const form = useForm({
  validationSchema: pageFormSchema,
  initialValues: page,
});

function onUpdate(update: Partial<QuestionPageDefinition>) {
  emit("update:modelValue", { id: page.id, ...update });
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
