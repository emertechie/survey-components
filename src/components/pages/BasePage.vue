<template>
  <div
    class="rounded-lg bg-white px-2 pb-4 pt-1 shadow"
    :id="`page-${page.id}`"
  >
    <div class="mb-2 flex items-center justify-between">
      <h1 class="text-lg font-semibold">{{ pageHeader }}</h1>
      <div class="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                :disabled="disableMoveUp"
                @click="$emit('moveUp')"
              >
                <ChevronUp />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move up</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                :disabled="disableMoveDown"
                @click="$emit('moveDown')"
              >
                <ChevronDown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move down</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PageContextDropdownMenu
          :pageId="page.id"
          :pageType="page.type"
        >
          <Button
            variant="ghost"
            size="icon"
          >
            <Settings2 />
          </Button>
        </PageContextDropdownMenu>
      </div>
    </div>

    <slot :page="page" />
  </div>
</template>

<script setup lang="ts">
import { type PageDefinition } from "@/data/definitions/survey";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings2, ChevronUp, ChevronDown } from "lucide-vue-next";
import { FocusManagerKey } from "@/composables/useFocusManager";
import { computed, inject, onMounted, watch } from "vue";
import PageContextDropdownMenu from "./PageContextDropdownMenu.vue";

const { page } = defineProps<{
  page: PageDefinition;
  disableMoveUp: boolean;
  disableMoveDown: boolean;
}>();

const emit = defineEmits<{
  moveUp: [];
  moveDown: [];
  focus: [];
}>();

const pageHeader = computed(() => {
  switch (page.type) {
    case "question":
      return "Question";
    case "custom":
      return "Custom Page";
    // TODO: why is this needed for linter?
    default:
      throw new Error("Unknown page type");
  }
});

// Watch for focus requests for this page
const focusManager = inject(FocusManagerKey);

onMounted(() => {
  watch(
    () => focusManager?.lastFocusedId.value,
    (newId) => {
      if (newId === page.id) {
        emit("focus");
      }
    },
    { immediate: true },
  );
});
</script>
