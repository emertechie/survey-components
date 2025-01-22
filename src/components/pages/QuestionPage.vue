<template>
  <div class="rounded-lg bg-white px-2 py-2 shadow">
    <h1 class="mb-2 font-semibold">Question Page</h1>

    <FormField
      v-slot="{ componentField }"
      name="question"
      @update:model-value="(value) => onPageChanged({ question: value })"
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
      @update:model-value="(value) => onPageChanged({ answer: createDefaultDefinition(value) })"
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

    <pre>{{ page.answer.type }}</pre>
  </div>
</template>

<script setup lang="ts">
import { type QuestionPage } from "@/data/survey";
import type { Definition, DefinitionType } from "@/data/definitions";
import {
  createCheckboxDefinition,
  createCheckboxListDefinition,
  createRadioListDefinition,
  createTextDefinition,
} from "@/data/definitions";
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

const { modelValue: page } = defineProps<{ modelValue: QuestionPage }>();
const emit = defineEmits<{
  "update:modelValue": [Partial<QuestionPage>];
}>();

function onPageChanged(update: Partial<QuestionPage>) {
  emit("update:modelValue", update);
}

function createDefaultDefinition(definitionType: DefinitionType): Definition {
  switch (definitionType) {
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
