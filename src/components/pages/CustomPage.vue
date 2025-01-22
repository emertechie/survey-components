<template>
  <div class="rounded-lg bg-white px-2 py-1 shadow">
    <h1>Custom Page</h1>
    <pre class="text-xs text-gray-500">{{ page.id }}</pre>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { customPageSchema } from "@/data/survey";

const { page } = defineProps<{ page: z.infer<typeof customPageSchema> }>();
</script>
