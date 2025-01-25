import { test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionPage from "../QuestionPage.vue";
import { createCheckboxDefinition, createTextDefinition } from "@/data/definitions/answerTypes";
import type { QuestionPageDefinition } from "@/data/definitions/survey";
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

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
    props: { page },
  });

  await wrapper.vm.$nextTick();

  expect(wrapper.get<HTMLTextAreaElement>('textarea[name="question"]').element.value).toBe("Confirm age");
  expect(wrapper.get<HTMLSelectElement>('select[name="answer.type"]').element.value).toBe("checkbox");
  expect(wrapper.get<HTMLInputElement>('input[name="label"]').element.value).toBe("I am over 18");
  expect(wrapper.get<HTMLInputElement>('input[name="mustBeChecked"]').element.checked).toBe(true);
});

// TODO: this test is pointless as it's just manually setting up and passing in the props
// Need to use testing-library to simulate real web interactions better. Or else E2E test
test.skip("can change answer type", async () => {
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

  // const answerTypeComboBox = wrapper.get<HTMLButtonElement>('button[role="combobox"]');
  // answerTypeComboBox.trigger("click");
  // await wrapper.vm.$nextTick();
  // const checkboxOption = wrapper.get<HTMLButtonElement>('button[role="option"][value="checkbox"]');
  // checkboxOption.trigger("click");
  // await wrapper.vm.$nextTick();

  // Change to checkbox answer with default values
  await wrapper.setProps({
    page: {
      ...page,
      answer: {
        ...page.answer, // Note: simulate actual behaviour to repro bug with fields not being reset
        type: "checkbox",
        mustBeChecked: false,
      },
    },
  });

  // await wrapper.vm.$nextTick();

  // Verify checkbox question setup
  expect(wrapper.get<HTMLTextAreaElement>('textarea[name="question"]').element.value).toBe("What is your name?");
  expect(wrapper.get<HTMLSelectElement>('select[name="answer.type"]').element.value).toBe("checkbox");
  expect(wrapper.get<HTMLInputElement>('input[name="label"]').element.value).toBe("");
  expect(wrapper.get<HTMLInputElement>('input[name="mustBeChecked"]').element.checked).toBe(false);

  // Change back to text answer with default values
  await wrapper.setProps({
    page: {
      ...page,
      answer: {
        ...page.answer, // Note: simulate actual behaviour to repro bug with fields not being reset
        type: "text",
        multiline: false,
        required: false,
      },
    },
  });

  // await wrapper.vm.$nextTick();

  // Verify text question setup
  expect(wrapper.get<HTMLTextAreaElement>('textarea[name="question"]').element.value).toBe("What is your name?");
  expect(wrapper.get<HTMLSelectElement>('select[name="answer.type"]').element.value).toBe("text");
  expect(wrapper.get<HTMLInputElement>('input[name="placeholder"]').element.value).toBe("");
  expect(wrapper.get<HTMLInputElement>('input[name="multiline"]').element.checked).toBe(false);
  expect(wrapper.get<HTMLInputElement>('input[name="required"]').element.checked).toBe(false);
});

test.skip("can change answer type 2", async () => {
  // TODO: if test ever passes, move this setup block to better location
  // This is needed for testing Radix Vue components with `user.click`
  class MockPointerEvent extends Event {
    button: number;
    ctrlKey: boolean;
    pointerType: string;

    constructor(type: string, props: PointerEventInit) {
      super(type, props);
      this.button = props.button || 0;
      this.ctrlKey = props.ctrlKey || false;
      this.pointerType = props.pointerType || "mouse";
    }
  }
  window.PointerEvent = MockPointerEvent as any;
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();

  const user = userEvent.setup();

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

  const controls = {
    question: () => screen.getByPlaceholderText<HTMLTextAreaElement>("Enter question"),
    answerType: () => screen.getByRole<HTMLButtonElement>("combobox", { name: "Answer Type" }),
    answerTypeOption: (option: string) => screen.getByRole<HTMLButtonElement>("option", { name: option }),
    multiline: () => screen.getByRole<HTMLButtonElement>("checkbox", { name: "Multiline" }),
    placeholder: () => screen.getByLabelText<HTMLInputElement>("Placeholder"),
    required: () => screen.getByRole<HTMLButtonElement>("checkbox", { name: "Required" }),
  };

  render(QuestionPage, { props: { page } });

  // Verify initial text question setup
  expect(controls.question().value).toBe("What is your name?");
  await waitFor(() => expect(controls.answerType().textContent?.trim()).toBe("Text"));
  expect(controls.multiline().getAttribute("aria-checked")).toBe("true");
  expect(controls.placeholder().value).toBe("Enter your name");
  expect(controls.required().getAttribute("aria-checked")).toBe("true");

  const trigger = controls.answerType();
  await user.click(trigger);
  expect(trigger.getAttribute("aria-expanded")).toBe("true");

  const option = controls.answerTypeOption("Checkbox");

  // TODO: this is probably not needed
  // Wait for any animations/transitions to complete
  await new Promise((resolve) => setTimeout(resolve, 10));

  // TODO: this next line causes a focus error.
  // See open bug: https://github.com/unovue/radix-vue/issues/1374
  await user.click(option);

  await waitFor(() => expect(trigger.getAttribute("aria-expanded")).toBe("false"));
  await waitFor(() =>
    expect(screen.getByRole("combobox", { name: "Answer Type" }).textContent?.trim()).toBe("Checkbox"),
  );
});
