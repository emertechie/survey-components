<template>
  <slot></slot>
</template>

<script lang="ts">
import type { InjectionKey } from "vue";
import type { SurveyStore } from "@/stores/useSurveyStore";
import type { FocusManager } from "@/composables/useFocusManager";

const SurveyStoreKey = Symbol() as InjectionKey<SurveyStore>;
const FocusManagerKey = Symbol() as InjectionKey<FocusManager>;

export function useSurveyContext() {
  const store = inject(SurveyStoreKey);
  if (!store) {
    throw new Error("SurveyStore not found");
  }

  const focusManager = inject(FocusManagerKey);
  if (!focusManager) {
    throw new Error("FocusManager not found");
  }

  return {
    store,
    focusManager,
  };
}
</script>

<script setup lang="ts">
import { inject, provide } from "vue";

const props = defineProps<{
  store: SurveyStore;
  focusManager: FocusManager;
}>();

provide(SurveyStoreKey, props.store);
provide(FocusManagerKey, props.focusManager);
</script>
