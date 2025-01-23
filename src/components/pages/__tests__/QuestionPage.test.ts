import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionPage from "../QuestionPage.vue";
import { createTextDefinition, createCheckboxDefinition } from "@/data/definitions/answerTypes";
import type { QuestionPageDefinition } from "@/data/definitions/survey";

test("can display a text question", async () => {
  const page: QuestionPageDefinition = {
    id: "1",
    type: "question",
    question: "What is your name?",
    answer: createTextDefinition({
      multiline: true,
      required: true,
    }),
  };

  const wrapper = mount(QuestionPage, {
    props: { page },
  });

  await wrapper.vm.$nextTick();

  const questionTextArea = wrapper.get<HTMLTextAreaElement>('textarea[name="question"]');
  const answerTypeSelect = wrapper.get<HTMLSelectElement>('select[name="answer.type"]');
  // const answerTypeSelect = wrapper.get<HTMLButtonElement>('button[role="combobox"]');
  // const answerTypeSelect = wrapper.get<HTMLButtonElement>('button[role="combobox"]:has(+ select)');
  // const answerTypeSelectEl = wrapper.get('select[name="answer.type"]').element
  //   .previousElementSibling as HTMLButtonElement;

  expect(questionTextArea.element.value).toBe("What is your name?");
  expect(answerTypeSelect.element.value).toBe("text");
  // expect(answerTypeSelect.element.innerText).toBe("Text");
  // expect(answerTypeSelectEl.innerText).toBe("Text");
});
