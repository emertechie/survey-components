<template>
  <div class="flex">
    <DesignerView class="h-dvh w-full sm:w-[36rem]" />
    <PreviewView class="hidden sm:block sm:w-full" />
  </div>
</template>

<script setup lang="ts">
import DesignerView from "./DesignerView.vue";
import PreviewView from "./PreviewView.vue";

const tree = {};

// TODO: define static tree
// TODO: store updated in localstorage. Have reset button
</script>
