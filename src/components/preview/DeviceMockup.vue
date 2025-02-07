<template>
  <div class="flex flex-1 items-center justify-center p-8">
    <div
      class="relative transition-all duration-300"
      :class="{
        'w-full max-w-5xl': selectedDevice === 'desktop',
        'w-full max-w-[768px]': selectedDevice === 'tablet',
        'w-full max-w-[375px]': selectedDevice === 'mobile',
      }"
    >
      <!-- Device Frame -->
      <div
        class="overflow-hidden rounded-lg border-[4px] border-gray-700 bg-indigo-50 shadow-lg"
        :class="{
          'border-gray-300': selectedDevice === 'desktop',
          'border-gray-400': selectedDevice !== 'desktop',
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Device = "desktop" | "tablet" | "mobile";

defineProps<{
  selectedDevice: Device;
}>();
</script>
