<template>
  <FormField
    :name="fieldName"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <FormItem>
      <div class="space-y-2">
        <!-- <FormLabel>{{ definition.label }}</FormLabel> -->
        <div class="space-y-2">
          <div
            v-for="label in fieldDefinition.labels"
            :key="label"
            class="flex items-center space-x-2"
          >
            <!-- TODO -->

            <!-- <FormControl>
              <Checkbox
                :value="option.value"
                :model-value="modelValue?.includes(option.value)"
                @update:model-value="onOptionToggle(option.value)"
                :required="definition.required"
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ option.label }}
            </FormLabel> -->
          </div>
        </div>
      </div>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import type { CheckboxListDefinition } from "@/data/definitions/answerTypes";
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Checkbox } from "@/components/ui/checkbox";

const props = defineProps<{
  fieldName: string;
  fieldDefinition: CheckboxListDefinition;
  modelValue?: string[];
}>();

const emit = defineEmits<{
  "update:modelValue": [string[]];
}>();

/* function onOptionToggle(value: string) {
  const currentValue = props.modelValue || [];
  const newValue = currentValue.includes(value)
    ? currentValue.filter((v) => v !== value)
    : [...currentValue, value];
  emit("update:modelValue", newValue);
} */
</script>
