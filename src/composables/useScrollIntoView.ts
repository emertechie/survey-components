import { useScroll, type UseScrollOptions } from "@vueuse/core";

export function useScrollIntoView(
  element: HTMLElement,
  container: HTMLElement,
  options: UseScrollOptions,
) {
  const { isScrolling, x, y, arrivedState, directions } = useScroll(container, options);

  // Calculate scroll target position
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const scrollTarget = elementRect.top - containerRect.top + container.scrollTop;

  // Trigger scroll
  y.value = scrollTarget;

  return {
    isScrolling,
    x,
    y,
    arrivedState,
    directions,
  };
}
