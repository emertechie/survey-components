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
        <DropdownMenuItem
          disabled
          @click="addImage"
        >
          <Image class="mr-2 h-4 w-4" />
          <span>Add image</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          @click="addVideo"
        >
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
import { useSurveyContext } from "@/components/SurveyContextProvider.vue";

const { pageId, pageType } = defineProps<{
  pageId: string;
  pageType: PageDefinitionType;
}>();

const { store } = useSurveyContext();

function changePageType(pageType: PageDefinitionType) {
  store.changePageType(pageId, pageType);
}

function deletePage() {
  store.deletePage(pageId);
}

function addImage() {
  alert("Not implemented");
  // store.addImage(pageId);
}

function addVideo() {
  alert("Not implemented");
  // store.addVideo(pageId);
}
</script>
