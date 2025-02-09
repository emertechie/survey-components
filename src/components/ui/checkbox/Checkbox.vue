<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "radix-vue";
import { Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";

// NOTE: This is an edited version of the Checkbox component which adds support for v-model binding
// See: https://github.com/unovue/shadcn-vue/issues/622#issuecomment-2178932075
// Otherwise, have to manually bind "@update:checked", "checked", "name" everywhere

const props = defineProps<
  CheckboxRootProps & { class?: HTMLAttributes["class"] } & { modelValue?: boolean }
>();
const emits = defineEmits<CheckboxRootEmits & { "update:modelValue": [value: boolean] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :checked="props.modelValue"
    @update:checked="(value) => emits('update:modelValue', value)"
    :class="
      cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        props.class,
      )
    "
  >
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
      <slot>
        <Check class="h-4 w-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
