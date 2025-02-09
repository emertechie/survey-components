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
          :style="{ height: panelHeight }"
        >
          <div
            class="border-b border-gray-200 bg-white px-3 py-3"
            ref="promptPanel"
          >
            <Textarea
              v-model="aiPrompt"
              placeholder="Enter your AI prompt here..."
              class="min-h-[100px] resize-none"
            />
          </div>
        </div>

        <!-- Tab Content -->
        <div
          class="transition-transform duration-300 ease-out"
          :style="contentStyle"
        >
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
      </div>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { useTemplateRef } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Textarea } from "@/components/ui/textarea";
import PagesContainer from "@/components/survey/design/PagesContainer.vue";
import { useSurveyContext } from "@/components/survey/design/SurveyContextProvider.vue";
import { WandSparkles } from "lucide-vue-next";

const pagesContainer = useTemplateRef<InstanceType<typeof PagesContainer>>("pagesContainer");
const { store } = useSurveyContext();

const showAIPrompt = ref(false);
const aiPrompt = ref("");

const promptPanel = ref<HTMLElement | null>(null);
const promptHeight = ref(0);

// Update prompt height when panel becomes visible
watch(showAIPrompt, async (visible) => {
  if (visible && promptPanel.value) {
    promptHeight.value = promptPanel.value.offsetHeight;
  } else {
    promptHeight.value = 0;
  }
});

// Compute panel height for animation
const panelHeight = computed(() => (showAIPrompt.value ? `${promptHeight.value}px` : "0px"));

// Compute transform for content to slide down
const contentStyle = computed(() => ({
  transform: showAIPrompt.value ? `translateY(0px)` : `translateY(-${promptHeight.value}px)`,
}));

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
