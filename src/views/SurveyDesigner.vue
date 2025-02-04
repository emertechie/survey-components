<template>
  <div class="p-3 pb-6">
    <h1 class="mb-4 text-lg font-semibold">Edit Survey</h1>

    <PagesContainer ref="pagesContainer" />
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
