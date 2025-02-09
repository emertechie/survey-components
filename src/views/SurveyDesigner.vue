<template>
  <div class="pb-6">
    <Tabs default-value="pages">
      <div class="flex flex-col">
        <div
          class="sticky top-0 z-20 flex items-center gap-4 border-b border-gray-200 bg-white px-3 py-3"
        >
          <TabsList class="flex-1">
            <TabsTrigger value="pages"> Pages </TabsTrigger>
            <TabsTrigger value="settings"> Settings </TabsTrigger>
          </TabsList>

          <Toggle
            v-model:pressed="showAIPrompt"
            class="py-5"
          >
            <WandSparkles class="mr-1 !h-3 !w-3" /> AI
          </Toggle>
        </div>

        <!-- AI Prompt Panel with height transition -->
        <div
          class="sticky top-[65px] z-10 overflow-hidden transition-[height] duration-300 ease-out"
          :style="{ height: showAIPrompt ? promptPanel?.offsetHeight + 'px' : '0px' }"
        >
          <div
            class="border-b border-gray-200 bg-white px-3 py-3"
            ref="promptPanel"
          >
            <Textarea
              v-model="aiPrompt"
              ref="aiPromptTextarea"
              placeholder="Ask AI to edit the survey..."
              class="min-h-[80px] resize-none"
            />

            <div
              class="mt-2 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground"
            >
              <Info class="h-3 w-3" />
              Not implemented yet
            </div>
          </div>
        </div>

        <!-- Tab Content -->
        <TabsContent value="pages">
          <PagesContainer
            class="p-3"
            ref="pagesContainer"
          />
        </TabsContent>
        <TabsContent value="settings">
          <span class="p-3 text-muted-foreground">Todo</span>
        </TabsContent>
      </div>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useTemplateRef } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Textarea } from "@/components/ui/textarea";
import PagesContainer from "@/components/survey/design/PagesContainer.vue";
import { useSurveyContext } from "@/components/survey/design/SurveyContextProvider.vue";
import { WandSparkles, Info } from "lucide-vue-next";

const pagesContainer = useTemplateRef<InstanceType<typeof PagesContainer>>("pagesContainer");
const { store } = useSurveyContext();

const promptPanel = ref<HTMLElement | null>(null);
const showAIPrompt = ref(false);
const aiPrompt = ref("");
const aiPromptTextarea = useTemplateRef<InstanceType<typeof Textarea>>("aiPromptTextarea");

watch(showAIPrompt, (toggled) => {
  if (toggled) {
    // Avoid drawing attention to textarea moving into view during transition
    setTimeout(() => {
      aiPromptTextarea.value?.$el.focus();
    }, 150);
  } else {
    aiPromptTextarea.value?.$el.blur();
  }
});

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
