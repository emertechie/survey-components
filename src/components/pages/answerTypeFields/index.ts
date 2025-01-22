import type { Component } from "vue";
import type { DefinitionType } from "@/data/definitions";
import TextFields from "./TextFields.vue";
import CheckboxFields from "./CheckboxFields.vue";
import CheckboxListFields from "./CheckboxListFields.vue";
import RadioListFields from "./RadioListFields.vue";

export const answerFieldsByType: Record<DefinitionType, Component> = {
  text: TextFields,
  checkbox: CheckboxFields,
  "checkbox-list": CheckboxListFields,
  "radio-list": RadioListFields,
};
