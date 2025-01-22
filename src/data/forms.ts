import { z } from "zod";

const baseControlSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
});

const radioOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
});

export const textControlSchema = baseControlSchema.extend({
  type: z.literal("text"),
  multiline: z.boolean(),
  placeholder: z.string().optional(),
  required: z.boolean(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
});

export const checkboxControlSchema = baseControlSchema.extend({
  type: z.literal("checkbox"),
  label: z.string().optional(),
  mustBeChecked: z.boolean(),
});

export const checkboxListControlSchema = baseControlSchema.extend({
  type: z.literal("checkbox-list"),
  labels: z.array(z.string()),
  minChecked: z.number().optional(),
  maxChecked: z.number().optional(),
});

export const radioListControlSchema = baseControlSchema.extend({
  type: z.literal("radio-list"),
  options: z.array(radioOptionSchema),
  required: z.boolean(),
});

export const controlSchema = z.discriminatedUnion("type", [
  textControlSchema,
  checkboxControlSchema,
  checkboxListControlSchema,
  radioListControlSchema,
]);

export type ControlType = z.infer<typeof controlSchema>["type"];
