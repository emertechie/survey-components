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
          class="sticky top-0 flex h-[calc(100vh-4rem)] flex-1 flex-col overflow-hidden border-r border-gray-200 bg-slate-50 sm:w-80 sm:flex-none md:w-96"
        >
          <!-- Scrollable Sidebar Content -->
          <div class="flex-1 overflow-y-auto pb-12">
            <SurveyDesigner ref="surveyDesigner" />
          </div>

          <!-- Save / Cancel Toolbar -->
          <div
            class="absolute bottom-0 left-0 right-0 flex h-14 transform items-center justify-center border-t border-gray-300 bg-gray-200 px-2 transition-all duration-200"
            :class="{ 'translate-y-full': !hasChanges, 'translate-y-0': hasChanges }"
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
            class="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition-all duration-200 hover:bg-blue-600"
            :class="{ 'bottom-[0.36rem]': !hasChanges, 'bottom-16': hasChanges }"
            @click="addQuestionPage"
          >
            <Plus class="h-6 w-6" />
          </button>
        </aside>

        <!-- Main Content Area -->
        <main class="hidden flex-1 flex-col sm:block">
          <div
            class="flex h-[65px] items-center justify-center gap-4 border-b border-gray-200 bg-white p-2"
          >
            <DeviceSelectorButtons v-model="selectedDevice" />
          </div>
          <DeviceMockup :selected-device="selectedDevice">
            <SurveyPreview
              :survey
              class="h-[600px] overflow-y-auto"
            />
          </DeviceMockup>
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
import { nextTick, ref, useTemplateRef, watch } from "vue";
import { useFocusManager } from "@/composables/useFocusManager";
import { useScrollIntoView } from "@/composables/useScrollIntoView";
import { useSurveyStore } from "@/stores/useSurveyStore";
import SurveyContextProvider from "@/components/survey/design/SurveyContextProvider.vue";
import TopNav from "@/components/nav/TopNav.vue";
import DeviceMockup from "@/components/preview/DeviceMockup.vue";
import DeviceSelectorButtons from "@/components/preview/DeviceSelectorButtons.vue";
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

const selectedDevice = ref<"desktop" | "tablet" | "mobile">("desktop");

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
main {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23d1d5dc' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
