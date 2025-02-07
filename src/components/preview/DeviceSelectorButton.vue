<template>
  <TooltipProvider>
    <Tooltip :delay-duration="300">
      <TooltipTrigger as-child>
        <Button
          variant="ghost"
          size="icon"
          :class="{ 'bg-accent': modelValue === device }"
          @click="$emit('update:modelValue', device)"
        >
          <component :is="icon" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ label }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { type Component } from "vue";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type Device = "desktop" | "tablet" | "mobile";

defineProps<{
  modelValue: Device;
  device: Device;
  icon: Component;
  label: string;
}>();

defineEmits<{
  "update:modelValue": [Device];
}>();
</script>
