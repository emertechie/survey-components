import { ref, type InjectionKey, type Ref } from "vue";

export interface FocusManager {
  focusPage: (pageId: string) => void;
  lastFocusedPageId: Ref<string | null, string | null>;
}

export const FocusManagerKey = Symbol() as InjectionKey<FocusManager>;

export function useFocusManager() {
  const lastFocusedPageId = ref<string | null>(null);

  const focusPage = (pageId: string) => {
    lastFocusedPageId.value = pageId;
  };

  return {
    focusPage,
    lastFocusedPageId,
  };
}
