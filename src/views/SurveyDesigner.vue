<template>
  <div class="pb-6">
    <div class="sticky top-0 z-10 border-b border-gray-200 bg-gray-100 p-3">
      <h1 class="text-lg font-semibold">Edit Survey</h1>
    </div>

    <PagesContainer
      class="p-3"
      ref="pagesContainer"
    />
  </div>
</template>

<script setup lang="ts">
import PagesContainer from "@/components/survey/design/PagesContainer.vue";
import { useSurveyContext } from "@/components/survey/design/SurveyContextProvider.vue";
import { useTemplateRef } from "vue";

const pagesContainer = useTemplateRef<InstanceType<typeof PagesContainer>>("pagesContainer");
const { store } = useSurveyContext();

defineExpose({
  save: async () => {
    if (pagesContainer.value) {
      const pageResults = await pagesContainer.value.validateAllPages();
      const allValid = pageResults.every((result) => result.valid);
      if (allValid) {
        store.saveChanges();
      }
    } else {
      throw new Error("PagesContainer component not found");
    }
  },
});
</script>
