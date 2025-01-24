<template>
  <FormField
    v-slot="{ componentField }"
    name="label"
    :model-value="definition.label"
    @update:model-value="(value) => onUpdate({ label: value })"
  >
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl>
        <Input
          type="text"
          v-bind="componentField"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

  <h3 class="text-xs uppercase tracking-wide text-gray-500">Validation</h3>

  <FormField
    v-slot="{ componentField }"
    name="mustBeChecked"
    :model-value="definition.mustBeChecked"
    @update:model-value="(value) => onUpdate({ mustBeChecked: value })"
  >
    <FormItem>
      <FormControl>
        <div class="flex items-center space-x-2">
          <Checkbox
            id="mustBeChecked"
            v-bind="componentField"
          />
          <label
            for="mustBeChecked"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Must be checked
          </label>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type CheckboxDefinition } from "@/data/definitions/answerTypes";

const { definition } = defineProps<{ definition: CheckboxDefinition }>();
const emit = defineEmits<{
  "partial-update": [Partial<CheckboxDefinition>];
}>();

function onUpdate(update: Partial<CheckboxDefinition>) {
  emit("partial-update", { ...update });
}
</script>
