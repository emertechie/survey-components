import { ref, type InjectionKey, type Ref } from "vue";

export interface FocusManager {
  focus: (id: string) => void;
  lastFocusedId: Ref<string | null, string | null>;
}

export const FocusManagerKey = Symbol() as InjectionKey<FocusManager>;

export function useFocusManager() {
  const lastFocusedId = ref<string | null>(null);

  const focus = (pageId: string) => {
    lastFocusedId.value = pageId;
  };

  return {
    focus,
    lastFocusedId,
  };
}
