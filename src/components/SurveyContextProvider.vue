<template>
  <slot></slot>
</template>

<script lang="ts">
import type { InjectionKey } from "vue";
import type { SurveyStore } from "@/stores/useSurveyStore";
import type { FocusManager } from "@/composables/useFocusManager";

export const SurveyStoreKey = Symbol() as InjectionKey<SurveyStore>;
export const FocusManagerKey = Symbol() as InjectionKey<FocusManager>;
</script>

<script setup lang="ts">
import { provide } from "vue";

const props = defineProps<{
  store: SurveyStore;
  focusManager: FocusManager;
}>();

provide(SurveyStoreKey, props.store);
provide(FocusManagerKey, props.focusManager);
</script>
