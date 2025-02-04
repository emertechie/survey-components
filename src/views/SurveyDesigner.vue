<template>
  <div class="p-3 pb-6">
    <h1 class="mb-4 text-lg font-semibold">Edit Survey</h1>

    <Tabs
      default-value="design"
      class="w-full"
    >
      <TabsList class="w-full">
        <TabsTrigger value="design"> Design </TabsTrigger>
        <TabsTrigger value="settings"> Settings </TabsTrigger>
      </TabsList>
      <TabsContent value="design">
        <PagesContainer
          class="mt-4"
          ref="pagesContainer"
        />
      </TabsContent>
      <TabsContent value="settings"> TODO! </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PagesContainer from "@/components/survey/design/PagesContainer.vue";
import { useSurveyContext } from "@/components/survey/design/SurveyContextProvider.vue";

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

<style scoped>
[role="tab"] {
  flex-grow: 1;
}
</style>
