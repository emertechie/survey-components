<template>
  <div>
    <h1 class="text-lg font-medium">Preview</h1>
    <div>
      <pre class="font-mono text-xs">{{ survey }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Survey } from "@/data/survey";

const { survey } = defineProps<{ survey: Survey }>();
</script>
