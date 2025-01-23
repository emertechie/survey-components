import type { Component } from "vue";
import type { AnswerDefinitionType } from "@/data/definitions/answerTypes";
import TextFields from "./TextFields.vue";
import CheckboxFields from "./CheckboxFields.vue";
import CheckboxListFields from "./CheckboxListFields.vue";
import RadioListFields from "./RadioListFields.vue";

export const answerFieldsByType: Record<AnswerDefinitionType, Component> = {
  text: TextFields,
  checkbox: CheckboxFields,
  "checkbox-list": CheckboxListFields,
  "radio-list": RadioListFields,
};
