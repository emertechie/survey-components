import type { Control } from "./forms";

interface VisibilityRules {
  visible: boolean; // TODO: implement actual rules
}

interface BasePage {
  id: string;
  visibility?: VisibilityRules;
}

export interface QuestionPage extends BasePage {
  type: "question";
  question: string;
  answer: Control;
}

export interface CustomPage extends BasePage {
  type: "custom";
  header?: string;
  content: string;
}

export type Page = QuestionPage | CustomPage;
export type PageType = Page["type"];

export type Survey = {
  pages: Page[];
};
