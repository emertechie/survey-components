import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionPage from "../QuestionPage.vue";
import { createCheckboxDefinition, createTextDefinition } from "@/data/definitions/answerTypes";
import type { QuestionPageDefinition } from "@/data/definitions/survey";

test("can display a text question", async () => {
  const page: QuestionPageDefinition = {
    id: "1",
    type: "question",
    question: "What is your name?",
    answer: createTextDefinition({
      multiline: true,
      required: true,
      placeholder: "Enter your name",
      minLength: 1,
      maxLength: 100,
    }),
  };

  const wrapper = mount(QuestionPage, {
    props: { page, disableMoveUp: false, disableMoveDown: false },
  });

  await wrapper.vm.$nextTick();

  expect(wrapper.get<HTMLTextAreaElement>('textarea[name="question"]').element.value).toBe("What is your name?");
  expect(wrapper.get<HTMLSelectElement>('select[name="answer.type"]').element.value).toBe("text");
  expect(wrapper.get<HTMLInputElement>('input[name="placeholder"]').element.value).toBe("Enter your name");
  expect(wrapper.get<HTMLInputElement>('input[name="multiline"]').element.checked).toBe(true);
  expect(wrapper.get<HTMLInputElement>('input[name="required"]').element.checked).toBe(true);
});

test("can display a checkbox question", async () => {
  const page: QuestionPageDefinition = {
    id: "1",
    type: "question",
    question: "Confirm age",
    answer: createCheckboxDefinition({
      label: "I am over 18",
      mustBeChecked: true,
    }),
  };

  const wrapper = mount(QuestionPage, {
    props: { page, disableMoveUp: false, disableMoveDown: false },
  });

  await wrapper.vm.$nextTick();

  expect(wrapper.get<HTMLTextAreaElement>('textarea[name="question"]').element.value).toBe("Confirm age");
  expect(wrapper.get<HTMLSelectElement>('select[name="answer.type"]').element.value).toBe("checkbox");
  expect(wrapper.get<HTMLInputElement>('input[name="label"]').element.value).toBe("I am over 18");
  expect(wrapper.get<HTMLInputElement>('input[name="mustBeChecked"]').element.checked).toBe(true);
});
