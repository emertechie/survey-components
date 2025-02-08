<template>
  <div class="pb-6">
    <Tabs default-value="pages">
      <div
        class="sticky top-0 z-10 flex items-center gap-4 border-b border-gray-200 bg-white px-3 py-3"
      >
        <TabsList class="flex-1">
          <TabsTrigger value="pages"> Pages </TabsTrigger>
          <TabsTrigger value="settings"> Settings </TabsTrigger>
        </TabsList>

        <Button
          variant="secondary"
          class="py-5 shadow-none"
        >
          <WandSparkles class="-mr-1 !h-3 !w-3" /> AI
        </Button>
      </div>

      <TabsContent value="pages">
        <PagesContainer
          class="p-3"
          ref="pagesContainer"
        />
      </TabsContent>
      <TabsContent value="settings">
        <span class="p-3 text-muted-foreground">Todo</span>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PagesContainer from "@/components/survey/design/PagesContainer.vue";
import { useSurveyContext } from "@/components/survey/design/SurveyContextProvider.vue";
import { WandSparkles } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
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
