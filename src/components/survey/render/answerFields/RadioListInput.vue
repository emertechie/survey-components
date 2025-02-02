<template>
  <!-- TODO -->
  <pre>{{ fieldDefinition }}</pre>
</template>

<script setup lang="ts">
import type { RadioListDefinition } from "@/data/definitions/answerTypes";

defineProps<{
  fieldName?: string;
  fieldDefinition: RadioListDefinition;
  modelValue?: string;
}>();

defineEmits<{
  "update:modelValue": [string];
}>();
</script>
