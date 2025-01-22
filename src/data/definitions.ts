import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const baseDefinitionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
});

export const textDefinitionSchema = baseDefinitionSchema.extend({
  type: z.literal("text"),
  multiline: z.boolean(),
  placeholder: z.string().optional(),
  required: z.boolean(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
});
type TextDefinition = z.infer<typeof textDefinitionSchema>;

export const checkboxDefinitionSchema = baseDefinitionSchema.extend({
  type: z.literal("checkbox"),
  label: z.string().optional(),
  mustBeChecked: z.boolean(),
});
type CheckboxDefinition = z.infer<typeof checkboxDefinitionSchema>;

export const checkboxListDefinitionSchema = baseDefinitionSchema.extend({
  type: z.literal("checkbox-list"),
  labels: z.array(z.string()),
  minChecked: z.number().optional(),
  maxChecked: z.number().optional(),
});
type CheckboxListDefinition = z.infer<typeof checkboxListDefinitionSchema>;

const radioOptionSchema = z.object({
  label: z.string(),
  value: z.string().optional(),
});

export const radioListDefinitionSchema = baseDefinitionSchema.extend({
  type: z.literal("radio-list"),
  options: z.array(radioOptionSchema),
  required: z.boolean(),
});
type RadioListDefinition = z.infer<typeof radioListDefinitionSchema>;

export const definitionSchema = z.discriminatedUnion("type", [
  textDefinitionSchema,
  checkboxDefinitionSchema,
  checkboxListDefinitionSchema,
  radioListDefinitionSchema,
]);

export type Definition = z.infer<typeof definitionSchema>;
export type DefinitionType = Definition["type"];

export function createTextDefinition(overrides?: Partial<TextDefinition>): TextDefinition {
  return {
    type: "text",
    id: uuidv4(),
    multiline: false,
    required: false,
    ...overrides,
  };
}

export function createCheckboxDefinition(
  overrides?: Partial<CheckboxDefinition>,
): CheckboxDefinition {
  return {
    type: "checkbox",
    id: uuidv4(),
    mustBeChecked: false,
    ...overrides,
  };
}

export function createCheckboxListDefinition(
  overrides?: Partial<CheckboxListDefinition>,
): CheckboxListDefinition {
  return {
    type: "checkbox-list",
    id: uuidv4(),
    labels: ["Checkbox 1", "Checkbox 2"],
    ...overrides,
  };
}

export function createRadioListDefinition(
  overrides?: Partial<RadioListDefinition>,
): RadioListDefinition {
  return {
    type: "radio-list",
    id: uuidv4(),
    options: [{ label: "Radio 1" }, { label: "Radio 2" }],
    required: false,
    ...overrides,
  };
}
