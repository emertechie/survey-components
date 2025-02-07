<template>
  <DeviceSelectorButton
    :model-value="modelValue"
    @update:model-value="(device) => $emit('update:modelValue', device)"
    device="desktop"
    :icon="Monitor"
    label="Desktop"
  />

  <DeviceSelectorButton
    :model-value="modelValue"
    @update:model-value="(device) => $emit('update:modelValue', device)"
    device="tablet"
    :icon="Tablet"
    label="Tablet"
  />

  <DeviceSelectorButton
    :model-value="modelValue"
    @update:model-value="(device) => $emit('update:modelValue', device)"
    device="mobile"
    :icon="Smartphone"
    label="Smartphone"
  />
</template>

<script setup lang="ts">
import { Monitor, Smartphone, Tablet } from "lucide-vue-next";
import DeviceSelectorButton from "./DeviceSelectorButton.vue";

type Device = "desktop" | "tablet" | "mobile";

defineProps<{
  modelValue: Device;
}>();

defineEmits<{
  "update:modelValue": [Device];
}>();
</script>
