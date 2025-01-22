<template>
  <div class="flex">
    <DesignerView
      :survey
      class="h-dvh w-full bg-slate-100 p-3 sm:w-[36rem]"
    />
    <PreviewView
      :survey
      class="preview hidden p-3 pl-5 sm:block sm:w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import DesignerView from "./DesignerView.vue";
import PreviewView from "./PreviewView.vue";
import { type Survey } from "@/data/survey";

const survey = ref<Survey>({
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
      question: "My first question",
      answer: {
        id: uuidv4(),
        type: "checkbox",
        title: "Is it good?",
      },
    },
  ],
});

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
