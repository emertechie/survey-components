<template>
  <FormField
    v-slot="{ field }"
    name="multiline"
    :model-value="definition.multiline"
    @update:model-value="(value) => onUpdate({ multiline: value })"
  >
    <FormItem>
      <FormControl>
        <div class="flex items-center space-x-2">
          <Checkbox
            id="multiline"
            :name="field.name"
            :checked="field.value"
            @update:checked="field.onChange"
          />
          <label
            for="multiline"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Multiline
          </label>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

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

  <!-- <h3 class="text-xs uppercase tracking-wide text-gray-500">Validation</h3> -->
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type TextDefinition } from "@/data/definitions/answerTypes";

const { definition } = defineProps<{ definition: TextDefinition }>();
const emit = defineEmits<{
  "partial-update": [Partial<TextDefinition>];
}>();

function onUpdate(update: Partial<TextDefinition>) {
  emit("partial-update", { ...update });
}
</script>
