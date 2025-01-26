<template>
  <div class="fixed inset-0 flex">
    <!-- Left scrollable panel -->
    <div class="relative h-full w-96 overflow-y-auto border-r bg-slate-100">
      <DesignerView
        :survey
        :updateSurvey
        :undo
        class="p-3"
      />
      <button
        class="sticky bottom-4 float-right mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
      >
        <Plus class="h-6 w-6" />
      </button>
    </div>

    <!-- Right fixed panel -->
    <div class="flex-1 bg-slate-50">
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

const [survey, updateSurvey, { inversePatches, applyPatches }] = useImmer<SurveyDefinition>({
  pages: [
    {
      id: uuidv4(),
      type: "custom",
      header: "Welcome",
      content: "Welcome to my little survey",
    },
    {
      id: uuidv4(),
      type: "question",
      question: "How do you feel today?",
      answer: createTextDefinition({
        multiline: true,
        placeholder: "Tell me",
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
});

// watchEffect(() => {
//   console.log("Patches", JSON.stringify(patches.value, null, 2));
// });
// watchEffect(() => {
//   console.log("Inverse Patches", JSON.stringify(inversePatches.value, null, 2));
// });

function undo() {
  const patch = inversePatches.value.pop();
  if (patch) {
    survey.value = applyPatches(survey.value, [patch]);
  }
}

// function redo() {
//   TODO
// }

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
