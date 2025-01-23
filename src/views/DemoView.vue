<template>
  <div class="flex min-h-dvh">
    <DesignerView
      :survey
      :updateSurvey
      :undo
      class="w-full bg-slate-100 p-3 sm:w-[36rem]"
    />
    <PreviewView
      :survey
      class="preview hidden p-3 pl-5 sm:block sm:w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import type { SurveyDefinition } from "@/data/definitions/survey";
import { createCheckboxDefinition, createTextDefinition } from "@/data/definitions/answerTypes";
import DesignerView from "./DesignerView.vue";
import PreviewView from "./PreviewView.vue";
import { useImmer } from "@/lib/useImmer";

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
      answer: createTextDefinition(),
    },
    {
      id: uuidv4(),
      type: "question",
      question: "Is this a great question?",
      answer: createCheckboxDefinition({ mustBeChecked: true }),
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
