<template>
  <FormField
    v-slot="{ componentField }"
    name="placeholder"
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
// import { z } from "zod";
// import { textControlSchema } from "@/data/forms";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// const { control } = defineProps<{ control: z.infer<typeof textControlSchema> }>();
</script>
