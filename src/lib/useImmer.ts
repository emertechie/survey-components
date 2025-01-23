import { produce, type Patch, enablePatches } from "immer";
import { ref, shallowRef } from "vue";

enablePatches();

export function useImmer<T>(baseState: T) {
  const patches = ref<Patch[]>([]);
  const inversePatches = ref<Patch[]>([]);
  const state = shallowRef(baseState);
  const update = (updater: (draft: T) => void) => {
    state.value = produce(state.value, updater, (_patches: Patch[], _inversePatches: Patch[]) => {
      patches.value.push(..._patches);
      inversePatches.value.push(..._inversePatches);
    });
  };

  return [state, update, patches, inversePatches] as const;
}
