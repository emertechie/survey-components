<template>
  <!-- TODO: definition.fieldName for name attribute -->
  <FormField
    :name="fieldName"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <FormItem>
      <FormControl>
        <Textarea
          :placeholder="fieldDefinition.placeholder"
          :required="fieldDefinition.required"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import type { TextDefinition } from "@/data/definitions/answerTypes";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// TODO: use defineModel

defineProps<{
  fieldName: string;
  fieldDefinition: TextDefinition;
  modelValue?: string;
}>();

defineEmits<{
  "update:modelValue": [string];
}>();
</script>
