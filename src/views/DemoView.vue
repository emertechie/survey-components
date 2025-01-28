<template>
  <div class="fixed inset-0 flex">
    <!-- Left scrollable panel -->
    <div class="relative h-full w-full overflow-y-auto border-r bg-slate-50 sm:w-96">
      <DesignerView
        :survey
        :updateSurvey
        :undo
        class="pb-6 pt-3"
      />

      <div class="sticky bottom-0 left-0 right-0">
        <!-- Toolbar -->
        <div
          class="z-10 flex w-full justify-center gap-1 border-t border-t-gray-200 bg-slate-100 p-3 transition"
          :class="{ 'opacity-0': !hasChanges, 'opacity-100': hasChanges }"
        >
          <button
            class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            @click="handleSave"
          >
            Save
          </button>
          <button
            class="rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
            @click="handleCancel"
          >
            Cancel
          </button>
        </div>

        <!-- Plus button -->
        <button
          class="absolute bottom-2 right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
          @click="addPage"
        >
          <Plus class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Right fixed panel -->
    <div class="hidden flex-1 bg-slate-50 sm:block">
      <PreviewView
        :survey
        class="preview h-full p-3 pl-5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import type { SurveyDefinition } from "@/data/definitions/survey";
import { createCheckboxDefinition, createTextDefinition } from "@/data/definitions/answerTypes";
import DesignerView from "./DesignerView.vue";
import PreviewView from "./PreviewView.vue";
import { useImmer } from "@/lib/useImmer";
import { Plus } from "lucide-vue-next";
import { ref, watchEffect, nextTick, provide, watch } from "vue";
import { useFocusManager, FocusManagerKey } from "@/composables/useFocusManager";
import { useScrollIntoView } from "@/composables/useScrollIntoView";

const hasChanges = ref(false);

const initialState: SurveyDefinition = {
  pages: [
    // {
    //   id: uuidv4(),
    //   type: "custom",
    //   header: "Welcome",
    //   content: "Welcome to my little survey",
    // },
    {
      id: uuidv4(),
      type: "question",
      question: "Which features do you use most frequently?",
      answer: createTextDefinition({
        multiline: true,
        placeholder: "Enter your answer",
      }),
    },
    {
      id: uuidv4(),
      type: "question",
      question: "Confirm your age",
      answer: createCheckboxDefinition({
        label: "I am over 18",
        mustBeChecked: true,
      }),
    },
  ],
};
const [survey, updateSurvey, { patches, inversePatches, applyPatches }] = useImmer(initialState);

// watchEffect(() => {
//   console.log("Patches", JSON.stringify(patches.value, null, 2));
// });
// watchEffect(() => {
//   console.log("Inverse Patches", JSON.stringify(inversePatches.value, null, 2));
// });

watchEffect(() => {
  hasChanges.value = patches.value.length > 0;
});

// const hasChanges = computed(() => patches.value.length > 0);

function undo() {
  const patch = inversePatches.value.pop();
  if (patch) {
    survey.value = applyPatches(survey.value, [patch]);
  }
}

// function redo() {
//   TODO
// }

const focusManager = useFocusManager();
provide(FocusManagerKey, focusManager);

function addPage() {
  const newPageId = uuidv4();

  updateSurvey((draft) => {
    draft.pages.push({
      id: newPageId,
      type: "question",
      question: "New question",
      answer: createTextDefinition(),
    });
  });

  // Wait for DOM update then scroll and trigger focus
  nextTick(() => {
    const scrollContainer = document.querySelector<HTMLElement>(".overflow-y-auto");
    const element = document.querySelector<HTMLElement>(`#page-${newPageId}`);

    if (scrollContainer && element) {
      const { isScrolling } = useScrollIntoView(element, scrollContainer, { behavior: "smooth" });

      // Wait for smooth scroll to finish before focusing to prevent jumping straight down to new page
      const unwatch = watch(isScrolling, (isScrolling) => {
        if (!isScrolling) {
          focusManager.focus(newPageId);
          unwatch();
        }
      });
    }
  });
}

function handleSave() {
  // TODO: Implement save functionality
  alert("Not implemented yet :)");
}

function handleCancel() {
  survey.value = initialState;
  patches.value = [];
  inversePatches.value = [];
}

// TODO: store updated in localstorage. Have reset button
</script>

<style scoped>
.preview {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#757ca0 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
}
</style>
