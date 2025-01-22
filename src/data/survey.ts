import { controlSchema } from "./forms";
import { z } from "zod";

export const visibilityRulesSchema = z.object({
  visible: z.boolean(),
});

const basePageSchema = z.object({
  id: z.string(),
  visibility: visibilityRulesSchema.optional(),
});

export const questionPageSchema = basePageSchema.extend({
  type: z.literal("question"),
  question: z.string(),
  answer: controlSchema,
});

export const customPageSchema = basePageSchema.extend({
  type: z.literal("custom"),
  header: z.string().optional(),
  content: z.string(),
});

export const pageSchema = z.discriminatedUnion("type", [questionPageSchema, customPageSchema]);

export const surveySchema = z.object({
  pages: z.array(pageSchema),
});

export type PageType = z.infer<typeof pageSchema>["type"];
