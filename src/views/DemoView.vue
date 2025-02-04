<template>
  <div class="flex min-h-screen flex-col">
    <!-- Top Navigation Bar -->
    <TopNav />

    <!-- Main Container -->
    <div class="flex flex-1">
      <SurveyContextProvider
        :store="surveyStore"
        :focusManager="focusManager"
      >
        <!-- Sidebar -->
        <aside
          class="sticky top-0 flex h-[calc(100vh-4rem)] flex-1 flex-col overflow-hidden sm:w-80 sm:flex-none md:w-96"
        >
          <!-- Scrollable Sidebar Content -->
          <div class="flex-1 overflow-y-auto pb-12">
            <SurveyDesigner ref="surveyDesigner" />
          </div>

          <!-- Save / Cancel Toolbar -->
          <div
            class="absolute bottom-0 left-0 right-0 flex h-14 items-center justify-center border-t border-gray-300 bg-gray-200 px-2 transition"
            :class="{ 'opacity-0': !hasChanges, 'opacity-100': hasChanges }"
          >
            <div class="flex gap-2">
              <Button
                :disabled="!hasChanges"
                @click="handleSave"
              >
                Save
              </Button>

              <Button
                variant="secondary"
                :disabled="!hasChanges"
                @click="cancelChanges"
              >
                Cancel
              </Button>
            </div>
          </div>

          <!-- Plus button -->
          <button
            class="absolute bottom-[0.36rem] right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition-colors hover:bg-blue-600"
            @click="addQuestionPage"
          >
            <Plus class="h-6 w-6" />
          </button>
        </aside>

        <!-- Main Content Area -->
        <main class="hidden flex-1 sm:block">
          <SurveyPreview
            :survey
            class="preview h-full p-3 pl-5"
          />
        </main>
      </SurveyContextProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import type { SurveyDefinition } from "@/data/definitions/survey";
import { createCheckboxDefinition, createTextDefinition } from "@/data/definitions/answerTypes";
import SurveyDesigner from "./SurveyDesigner.vue";
import SurveyPreview from "./SurveyPreview.vue";
import { Plus } from "lucide-vue-next";
import { nextTick, useTemplateRef, watch } from "vue";
import { useFocusManager } from "@/composables/useFocusManager";
import { useScrollIntoView } from "@/composables/useScrollIntoView";
import { useSurveyStore } from "@/stores/useSurveyStore";
import SurveyContextProvider from "@/components/survey/design/SurveyContextProvider.vue";
import TopNav from "@/components/nav/TopNav.vue";
const surveyDesigner = useTemplateRef<InstanceType<typeof SurveyDesigner>>("surveyDesigner");

const initialState: SurveyDefinition = {
  title: "My Test Survey",
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
      question: "Which features do you use most frequently?",
      fieldName: "features",
      answer: createTextDefinition({
        multiline: true,
        placeholder: "Enter your answer",
      }),
    },
    {
      id: uuidv4(),
      type: "question",
      question: "Confirm your age",
      fieldName: "age",
      answer: createCheckboxDefinition({
        label: "I am over 18",
        mustBeChecked: true,
      }),
    },
  ],
};

const focusManager = useFocusManager();

const surveyStore = useSurveyStore(initialState);
const { survey, createNewPage, addPage, hasChanges, cancelChanges } = surveyStore;

function addQuestionPage() {
  const newPage = createNewPage("question");
  addPage(newPage);

  // Wait for DOM update then scroll and trigger focus
  nextTick(() => {
    const scrollContainer = document.querySelector<HTMLElement>(".overflow-y-auto");
    const element = document.querySelector<HTMLElement>(`#page-${newPage.id}`);

    if (scrollContainer && element) {
      const { isScrolling } = useScrollIntoView(element, scrollContainer, { behavior: "smooth" });

      // Wait for smooth scroll to finish before focusing to prevent jumping straight down to new page
      const unwatch = watch(isScrolling, (isScrolling) => {
        if (!isScrolling) {
          focusManager.focus(newPage.id);
          unwatch();
        }
      });
    }
  });
}

async function handleSave() {
  if (surveyDesigner.value) {
    await surveyDesigner.value.save();
  } else {
    throw new Error("SurveyDesigner component not found");
  }
}
</script>

<style scoped>
.preview {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#757ca0 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
}
</style>
