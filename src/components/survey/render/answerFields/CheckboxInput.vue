<template>
  <FormField
    :name="fieldName"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <FormItem class="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox :required="fieldDefinition.mustBeChecked" />
      </FormControl>
      <div class="space-y-1 leading-none">
        <FormLabel>
          {{ fieldDefinition.label }}
        </FormLabel>
      </div>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import type { CheckboxDefinition } from "@/data/definitions/answerTypes";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

// TODO: use defineModel

defineProps<{
  fieldName: string;
  fieldDefinition: CheckboxDefinition;
  modelValue?: boolean;
}>();

defineEmits<{
  "update:modelValue": [boolean];
}>();
</script>
