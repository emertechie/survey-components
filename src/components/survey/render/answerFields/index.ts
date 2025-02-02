import type { Component } from "vue";
import type { AnswerDefinitionType } from "@/data/definitions/answerTypes";
import TextInput from "./TextInput.vue";
import CheckboxInput from "./CheckboxInput.vue";
import CheckboxListInput from "./CheckboxListInput.vue";
import RadioListInput from "./RadioListInput.vue";

export const answerFieldsByType: Record<AnswerDefinitionType, Component> = {
  text: TextInput,
  checkbox: CheckboxInput,
  "checkbox-list": CheckboxListInput,
  "radio-list": RadioListInput,
};
