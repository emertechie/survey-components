import type { Component } from "vue";
import type { ControlType } from "@/data/forms";
import TextFields from "./TextFields.vue";
import CheckboxFields from "./CheckboxFields.vue";
import CheckboxListFields from "./CheckboxListFields.vue";
import RadioListFields from "./RadioListFields.vue";

export const answerFieldsByType: Record<ControlType, Component> = {
  text: TextFields,
  checkbox: CheckboxFields,
  "checkbox-list": CheckboxListFields,
  "radio-list": RadioListFields,
};
