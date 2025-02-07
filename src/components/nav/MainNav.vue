<template>
  <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
    <TooltipProvider
      v-for="item in navItems"
      :key="item.label"
    >
      <Tooltip
        :delay-duration="0"
        :disabled="item.implemented"
      >
        <TooltipTrigger as-child>
          <a
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            :class="{ 'text-primary': item.implemented }"
          >
            {{ item.label }}
          </a>
        </TooltipTrigger>
        <TooltipContent> Not Implemented </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </nav>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  {
    label: "Overview",
    implemented: false,
  },
  {
    label: "Surveys",
    implemented: true,
  },
  {
    label: "Templates",
    implemented: false,
  },
  {
    label: "Settings",
    implemented: false,
  },
];
</script>
