import { ref, type Ref } from "vue";

export interface FocusManager {
  focus: (id: string) => void;
  lastFocusedId: Ref<string | null, string | null>;
}

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
