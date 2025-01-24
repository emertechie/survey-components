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
    props: { page },
  });

  await wrapper.vm.$nextTick();

  const questionTextArea = wrapper.get<HTMLTextAreaElement>('textarea[name="question"]');
  const answerTypeSelect = wrapper.get<HTMLSelectElement>('select[name="answer.type"]');
  const placeholderInput = wrapper.get<HTMLInputElement>('input[name="placeholder"]');
  const multilineCheckboxInput = wrapper.get<HTMLInputElement>('input[name="multiline"]');
  const requiredCheckboxInput = wrapper.get<HTMLInputElement>('input[name="required"]');

  expect(questionTextArea.element.value).toBe("What is your name?");
  expect(answerTypeSelect.element.value).toBe("text");
  expect(placeholderInput.element.value).toBe("Enter your name");
  expect(multilineCheckboxInput.element.checked).toBe(true);
  expect(requiredCheckboxInput.element.checked).toBe(true);
});

test("can display a checkbox question", async () => {
  const page: QuestionPageDefinition = {
    id: "1",
    type: "question",
    question: "Confirm you are old enough",
    answer: createCheckboxDefinition({
      label: "I am over 18",
      mustBeChecked: true,
    }),
  };

  const wrapper = mount(QuestionPage, {
    props: { page },
  });

  await wrapper.vm.$nextTick();

  const questionTextArea = wrapper.get<HTMLTextAreaElement>('textarea[name="question"]');
  const answerTypeSelect = wrapper.get<HTMLSelectElement>('select[name="answer.type"]');
  const labelInput = wrapper.get<HTMLInputElement>('input[name="label"]');
  const mustBeCheckedCheckboxInput = wrapper.get<HTMLInputElement>('input[name="mustBeChecked"]');

  expect(questionTextArea.element.value).toBe("Confirm you are old enough");
  expect(answerTypeSelect.element.value).toBe("checkbox");
  expect(labelInput.element.value).toBe("I am over 18");
  expect(mustBeCheckedCheckboxInput.element.checked).toBe(true);
});

test("can change answer type", async () => {
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
    props: { page },
  });

  await wrapper.vm.$nextTick();

  // Verify initial text question setup
  expect(wrapper.get<HTMLTextAreaElement>('textarea[name="question"]').element.value).toBe("What is your name?");
  expect(wrapper.get<HTMLSelectElement>('select[name="answer.type"]').element.value).toBe("text");
  expect(wrapper.get<HTMLInputElement>('input[name="placeholder"]').element.value).toBe("Enter your name");
  expect(wrapper.get<HTMLInputElement>('input[name="multiline"]').element.checked).toBe(true);
  expect(wrapper.get<HTMLInputElement>('input[name="required"]').element.checked).toBe(true);

  // Change to checkbox answer with default values
  await wrapper.setProps({
    page: {
      ...page,
      answer: createCheckboxDefinition(),
    },
  });

  // Verify checkbox question setup
  expect(wrapper.get<HTMLTextAreaElement>('textarea[name="question"]').element.value).toBe("What is your name?");
  expect(wrapper.get<HTMLSelectElement>('select[name="answer.type"]').element.value).toBe("checkbox");
  expect(wrapper.get<HTMLInputElement>('input[name="label"]').element.value).toBe("");
  expect(wrapper.get<HTMLInputElement>('input[name="mustBeChecked"]').element.checked).toBe(false);

  // Change back to text answer with default values
  await wrapper.setProps({
    page: {
      ...page,
      answer: createTextDefinition(),
    },
  });

  // Verify text question setup
  expect(wrapper.get<HTMLTextAreaElement>('textarea[name="question"]').element.value).toBe("What is your name?");
  expect(wrapper.get<HTMLSelectElement>('select[name="answer.type"]').element.value).toBe("text");
  expect(wrapper.get<HTMLInputElement>('input[name="placeholder"]').element.value).toBe("");
  expect(wrapper.get<HTMLInputElement>('input[name="multiline"]').element.checked).toBe(false);
  expect(wrapper.get<HTMLInputElement>('input[name="required"]').element.checked).toBe(false);
});
