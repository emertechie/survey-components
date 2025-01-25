import { test, expect } from "@playwright/test";

test("can render question page", async ({ page }) => {
  await page.goto("http://localhost:5173/test");

  const questionPage = page.getByTestId("features-question");

  await expect(questionPage.getByPlaceholder("Enter question")).toHaveValue(
    "Which features do you use most frequently?",
  );

  const comboBox = questionPage.getByRole("combobox", { name: "Answer Type" });
  await expect(comboBox).toHaveText("Text");

  const multiline = questionPage.getByLabel("Multiline");
  await expect(multiline).toBeChecked();

  const placeholder = questionPage.getByLabel("Placeholder");
  await expect(placeholder).toHaveValue("Enter your answer");

  const required = questionPage.getByLabel("Required");
  await expect(required).toBeChecked();
});
