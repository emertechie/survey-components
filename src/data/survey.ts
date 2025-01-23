import { definitionSchema } from "./definitions";
import { z } from "zod";

export const visibilityRulesSchema = z.object({
  visible: z.boolean(),
});

const basePageSchema = z.object({
  id: z.string(),
  visibility: visibilityRulesSchema.optional(),
});

export const questionPageDefinitionSchema = basePageSchema.extend({
  type: z.literal("question"),
  question: z.string().min(1),
  answer: definitionSchema,
});
export type QuestionPageDefinition = z.infer<typeof questionPageDefinitionSchema>;

export const customPageDefinitionSchema = basePageSchema.extend({
  type: z.literal("custom"),
  header: z.string().optional(),
  content: z.string(),
});
export type CustomPageDefinition = z.infer<typeof customPageDefinitionSchema>;

export const pageDefinitionSchema = z.discriminatedUnion("type", [
  questionPageDefinitionSchema,
  customPageDefinitionSchema,
]);
export type PageDefinition = z.infer<typeof pageDefinitionSchema>;
export type PageDefinitionType = PageDefinition["type"];

export const surveyDefinitionSchema = z.object({
  pages: z.array(pageDefinitionSchema),
});
export type SurveyDefinition = z.infer<typeof surveyDefinitionSchema>;
