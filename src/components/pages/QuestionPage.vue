<template>
  <!-- TODO: when focused, grow page dimenstions a little and use "focus-within:shadow-lg" -->
  <!-- TODO: common page component with slot for content -->
  <div
    class="rounded-lg bg-white px-2 pb-4 pt-2 shadow"
    :id="`page-${page.id}`"
  >
    <div class="mb-2 flex items-center justify-between">
      <h1 class="text-lg font-semibold">Question</h1>
      <div class="flex items-center">
        <!-- TODO: disable when at the top -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                @click="onMoveUp"
              >
                <ChevronUp />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move up</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <!-- TODO: disable when at the bottom -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                @click="onMoveDown"
              >
                <ChevronDown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move down</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PageContextDropdownMenu>
          <Button
            variant="ghost"
            size="icon"
          >
            <Settings2 />
          </Button>
        </PageContextDropdownMenu>
      </div>
    </div>

    <form
      class="mb-2 space-y-4"
      :validation-schema="pageFormSchema"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        name="question"
        :model-value="page.question"
        @update:model-value="(value) => onUpdate({ question: value })"
      >
        <FormItem>
          <FormControl>
            <Textarea
              type="text"
              placeholder="Enter question"
              v-bind="componentField"
              ref="questionInput"
            ></Textarea>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="answer.type"
        :model-value="page.answer?.type"
        @update:model-value="
          (value) => onUpdate({ answer: createDefaultDefinition(value) }, 'assign')
        "
      >
        <FormItem>
          <FormLabel>Answer Type</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger aria-label="Answer Type">
                <SelectValue placeholder="Select answer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text"> Text </SelectItem>
                <SelectItem
                  value="checkbox"
                  aria-label="Checkbox"
                >
                  Checkbox
                </SelectItem>
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
        :definition="page.answer"
        @partial-update="(value: any) => onUpdate({ answer: { ...value } })"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import {
  questionPageDefinitionSchema,
  type QuestionPageDefinition,
} from "@/data/definitions/survey";
import {
  createCheckboxDefinition,
  createCheckboxListDefinition,
  createRadioListDefinition,
  createTextDefinition,
  type AnswerDefinition,
  type AnswerDefinitionType,
} from "@/data/definitions/answerTypes";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings2, ChevronUp, ChevronDown } from "lucide-vue-next";
import { answerFieldsByType } from "@/components/pages/answerTypeFields";
import type { UpdateType } from "./types";
import { FocusManagerKey } from "@/composables/useFocusManager";
import { inject, onMounted, ref, watch } from "vue";
import type { ForwardRefHTMLElement } from "@/components/ui/types";
import PageContextDropdownMenu from "./PageContextDropdownMenu.vue";

const { page } = defineProps<{ page: QuestionPageDefinition }>();
const emit = defineEmits<{
  update: [Partial<QuestionPageDefinition>, UpdateType];
  moveUp: [];
  moveDown: [];
}>();

const pageFormSchema = toTypedSchema(questionPageDefinitionSchema);

const form = useForm({
  validationSchema: pageFormSchema,
  initialValues: page,
});

// Watch for focus requests for this page
const questionInput = ref<ForwardRefHTMLElement | null>(null);
const focusManager = inject(FocusManagerKey);

onMounted(() => {
  watch(
    () => focusManager?.lastFocusedId.value,
    (newId) => {
      if (newId === page.id) {
        questionInput.value?.domRef?.focus();
      }
    },
    { immediate: true },
  );
});

function onUpdate(update: Partial<QuestionPageDefinition>, updateType: UpdateType = "merge") {
  // For nested objects like "answer", we need to replace the entire page object to avoid stale state being left over.
  // Example: "placeholder" prop doesn't exist for a checkbox answer, so wouldn't get overridden with a merge
  const data = updateType === "assign" ? { ...page, ...update } : { id: page.id, ...update };
  emit("update", data, updateType);
}

function onMoveUp() {
  emit("moveUp");
}

function onMoveDown() {
  emit("moveDown");
}

const onSubmit = form.handleSubmit(() => {
  // onSave();
});

function createDefaultDefinition(type: AnswerDefinitionType): AnswerDefinition {
  switch (type) {
    case "text":
      return createTextDefinition();
    case "checkbox":
      return createCheckboxDefinition();
    case "checkbox-list":
      return createCheckboxListDefinition();
    case "radio-list":
      return createRadioListDefinition();
  }
}
</script>
