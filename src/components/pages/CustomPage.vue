<template>
  <BasePage
    :page="page"
    :disable-move-up="disableMoveUp"
    :disable-move-down="disableMoveDown"
    @move-up="$emit('moveUp')"
    @move-down="$emit('moveDown')"
    @focus="onFocus"
  >
    <template #default>
      <form
        class="mb-2 space-y-4"
        :validation-schema="pageFormSchema"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="header"
          :model-value="page.header"
          @update:model-value="(value) => onUpdate({ header: value })"
        >
          <FormItem>
            <FormLabel>Header</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter header"
                v-bind="componentField"
                ref="headerInput"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="content"
          :model-value="page.content"
          @update:model-value="(value) => onUpdate({ content: value })"
        >
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter content"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { customPageDefinitionSchema, type CustomPageDefinition } from "@/data/definitions/survey";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ForwardRefHTMLElement } from "@/components/ui/types";
import type { UpdateType } from "@/stores/useSurveyStore";
import BasePage from "./BasePage.vue";
import type { ValidationResult } from "@/lib/types";

const { page, disableMoveUp, disableMoveDown } = defineProps<{
  page: CustomPageDefinition;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
}>();

const emit = defineEmits<{
  update: [Partial<CustomPageDefinition>, UpdateType];
  moveUp: [];
  moveDown: [];
}>();

defineExpose({
  validate: validateForm,
});

const pageFormSchema = toTypedSchema(customPageDefinitionSchema);
const headerInput = ref<ForwardRefHTMLElement | null>(null);

const form = useForm({
  validationSchema: pageFormSchema,
  initialValues: page,
});

async function validateForm(): Promise<ValidationResult<CustomPageDefinition>> {
  const { valid, errors } = await form.validate();
  if (valid) {
    return { valid: true, values: form.values as CustomPageDefinition };
  }
  return { valid: false, errors };
}

function onUpdate(update: Partial<CustomPageDefinition>) {
  emit("update", { id: page.id, ...update }, "merge");
}

function onFocus() {
  headerInput.value?.domRef?.focus();
}

const onSubmit = form.handleSubmit(() => {
  // onSave();
});
</script>
