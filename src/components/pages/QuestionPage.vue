<template>
  <div class="rounded bg-white px-2 py-1 shadow">
    <h1>Question Page</h1>
    <pre class="text-xs text-gray-500">{{ page.id }}</pre>
  </div>
</template>

<script setup lang="ts">
// import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import type { questionPageSchema } from "@/data/survey";

const { page } = defineProps<{ page: z.infer<typeof questionPageSchema> }>();

// const formSchema = toTypedSchema(
//   z.object({
//     question: z.string().min(1).max(1000),
//     answerType: z.string().min(1).max(1000),
//   }),
// );
</script>
