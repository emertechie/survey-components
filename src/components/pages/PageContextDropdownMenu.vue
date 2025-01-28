<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Trash2, Image, SquarePlay } from "lucide-vue-next";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot></slot>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <!-- <DropdownMenuGroup>
        <DropdownMenuItem>
          <ChevronUp class="mr-2 h-4 w-4" />
          <span>Move Up</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ChevronDown class="mr-2 h-4 w-4" />
          <span>Move Down</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator /> -->

      <DropdownMenuGroup>
        <DropdownMenuCheckboxItem :checked="true"> Question </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem> Custom Page </DropdownMenuCheckboxItem>
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
        <DropdownMenuItem>
          <Trash2 class="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
