<template>
  <FormField
    v-slot="{ componentField }"
    name="placeholder"
    :model-value="definition.placeholder"
    @update:model-value="(value) => onUpdate({ placeholder: value })"
  >
    <FormItem>
      <FormLabel>Placeholder</FormLabel>
      <FormControl>
        <Input
          type="text"
          v-bind="componentField"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type TextDefinition } from "@/data/definitions/answerTypes";

const { definition } = defineProps<{ definition: TextDefinition }>();
const emit = defineEmits<{
  "partial-update": [Partial<TextDefinition>];
}>();

function onUpdate(update: Partial<TextDefinition>) {
  emit("partial-update", { ...update });
}
</script>
