<template>
  <FormField
    v-slot="{ componentField }"
    name="multiline"
    :model-value="definition.multiline"
    @update:model-value="(value) => onUpdate({ multiline: value })"
  >
    <FormItem>
      <FormControl>
        <div class="flex items-center space-x-2">
          <Checkbox
            v-bind="componentField"
            :id="multilineId"
          />
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            :for="multilineId"
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

  <h3 class="text-xs uppercase tracking-wide text-gray-500">Validation</h3>

  <FormField
    v-slot="{ componentField }"
    name="required"
    :model-value="definition.required"
    @update:model-value="(value) => onUpdate({ required: value })"
  >
    <FormItem>
      <FormControl>
        <div class="flex items-center space-x-2">
          <Checkbox
            v-bind="componentField"
            :id="requiredId"
          />
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            :for="requiredId"
          >
            Required
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
import { type TextDefinition } from "@/data/definitions/answerTypes";
import { useId } from "vue";

const { definition } = defineProps<{ definition: TextDefinition }>();
const emit = defineEmits<{
  "partial-update": [Partial<TextDefinition>];
}>();

const componentId = useId();
const multilineId = `multiline-${componentId}`;
const requiredId = `required-${componentId}`;

function onUpdate(update: Partial<TextDefinition>) {
  emit("partial-update", { ...update });
}
</script>
