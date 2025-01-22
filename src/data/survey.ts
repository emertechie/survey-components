import { definitionSchema } from "./definitions";
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
  answer: definitionSchema,
});
export type QuestionPage = z.infer<typeof questionPageSchema>;

export const customPageSchema = basePageSchema.extend({
  type: z.literal("custom"),
  header: z.string().optional(),
  content: z.string(),
});
export type CustomPage = z.infer<typeof customPageSchema>;

export const pageSchema = z.discriminatedUnion("type", [questionPageSchema, customPageSchema]);
export type Page = z.infer<typeof pageSchema>;
export type PageType = Page["type"];

export const surveySchema = z.object({
  pages: z.array(pageSchema),
});
export type Survey = z.infer<typeof surveySchema>;
