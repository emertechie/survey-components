<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot></slot>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuGroup>
        <DropdownMenuCheckboxItem
          :checked="pageType === 'question'"
          @click="changePageType('question')"
        >
          Question
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          :checked="pageType === 'custom'"
          @click="changePageType('custom')"
        >
          Custom Page
        </DropdownMenuCheckboxItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Image class="mr-2 h-4 w-4" />
          <span>Add image</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SquarePlay class="mr-2 h-4 w-4" />
          <span>Add video</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem @click="deletePage">
          <Trash2 class="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Trash2, Image, SquarePlay } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import type { PageDefinitionType } from "@/data/definitions/survey";
import { SurveyStoreKey } from "@/components/SurveyContextProvider.vue";

const { pageId, pageType } = defineProps<{
  pageId: string;
  pageType: PageDefinitionType;
}>();

const store = inject(SurveyStoreKey);
if (!store) {
  throw new Error("SurveyStore not found");
}

function changePageType(pageType: PageDefinitionType) {
  store?.changePageType(pageId, pageType);
}

function deletePage() {
  store?.deletePage(pageId);
}
</script>
