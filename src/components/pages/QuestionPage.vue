<template>
  <div class="rounded-lg bg-white px-2 py-2 shadow">
    <h1 class="mb-2 font-semibold">Question Page</h1>

    <form
      class="mb-2 space-y-4"
      :validation-schema="formSchema"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        name="question"
      >
        <FormItem>
          <FormControl>
            <Textarea
              type="text"
              placeholder="Enter question"
              v-bind="componentField"
            ></Textarea>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="answer.type"
      >
        <FormItem>
          <FormLabel>Answer Type</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select answer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text"> Text </SelectItem>
                <SelectItem value="checkbox"> Checkbox </SelectItem>
                <SelectItem value="checkbox-list"> Checkbox List </SelectItem>
                <SelectItem value="radio-list"> Radio List </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <component
        v-if="page.answer?.type"
        :is="answerFieldsByType[page.answer.type]"
      />

      <pre>{{ page.answer.type }}</pre>

      <Button type="submit"> Submit </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useForm } from "vee-validate";
import { questionPageSchema } from "@/data/survey";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { answerFieldsByType } from "@/components/pages/answerTypeFields";

const { page } = defineProps<{ page: z.infer<typeof questionPageSchema> }>();

const formSchema = toTypedSchema(questionPageSchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: page,
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});
</script>
