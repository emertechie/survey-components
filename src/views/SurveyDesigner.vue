<template>
  <div class="pb-6">
    <h1 class="p-3 pb-0 text-lg font-semibold">Edit Survey</h1>

    <Tabs
      default-value="design"
      class="w-full"
    >
      <div class="sticky top-0 z-10 w-full bg-white px-3 py-4">
        <TabsList class="w-full">
          <TabsTrigger value="design"> Design </TabsTrigger>
          <TabsTrigger value="settings"> Settings </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="design">
        <PagesContainer
          class="p-3 pt-0"
          ref="pagesContainer"
        />
      </TabsContent>
      <TabsContent value="settings">
        <span class="text-muted-foreground">Todo</span>
      </TabsContent>
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
