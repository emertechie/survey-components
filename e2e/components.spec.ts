import { test, expect } from "@playwright/test";

test("can render question page", async ({ page }) => {
  await page.goto("http://localhost:5173/test");

  const questionPage = page.locator("#page-features-question");

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

test("can render checkbox page", async ({ page }) => {
  await page.goto("http://localhost:5173/test");

  const questionPage = page.locator("#page-recommend-question");

  await expect(questionPage.getByPlaceholder("Enter question")).toHaveValue(
    "Would you recommend our app to others?",
  );

  const comboBox = questionPage.getByRole("combobox", { name: "Answer Type" });
  await expect(comboBox).toHaveText("Checkbox");

  const label = questionPage.getByLabel("Label");
  await expect(label).toHaveValue("Yes");

  const mustBeChecked = questionPage.getByLabel("Must be checked");
  await expect(mustBeChecked).toBeChecked();
});

test("can switch answer type", async ({ page }) => {
  await page.goto("http://localhost:5173/test");

  const questionPage = page.locator("#page-features-question");

  // Note: there was a bug where placeholder was not reset on changing answer type, so check here and later on
  const placeholder = questionPage.getByLabel("Placeholder");
  await expect(placeholder).toHaveValue("Enter your answer");

  // Change answer type to checkbox
  await questionPage.getByRole("combobox", { name: "Answer Type" }).click();
  await page.getByLabel("Checkbox", { exact: true }).click();
  await expect(questionPage.getByRole("combobox", { name: "Answer Type" })).toHaveText("Checkbox");

  // Ensure default values rendered for checkbox answer
  await expect(questionPage.getByLabel("Label")).toHaveValue("");
  await expect(questionPage.getByLabel("Must be checked")).not.toBeChecked();

  // Change answer type back to text
  await questionPage.getByRole("combobox", { name: "Answer Type" }).click();
  await page.getByLabel("Text", { exact: true }).click();
  await expect(questionPage.getByRole("combobox", { name: "Answer Type" })).toHaveText("Text");

  // Ensure default values rendered for text answer
  await expect(questionPage.getByLabel("Multiline")).not.toBeChecked();
  await expect(questionPage.getByLabel("Placeholder")).toHaveValue(""); // NOTE: bug fix
  await expect(questionPage.getByLabel("Required")).not.toBeChecked();
});
