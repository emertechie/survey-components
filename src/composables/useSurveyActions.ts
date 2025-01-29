import { v4 as uuidv4 } from "uuid";
import type {
  PageDefinition,
  PageDefinitionType,
  SurveyDefinition,
} from "@/data/definitions/survey";
import type { InjectionKey } from "vue";
import { createTextDefinition } from "@/data/definitions/answerTypes";

interface SurveyActions {
  changePageType: (pageId: string, newType: "question" | "custom") => void;
}

export const SurveyActionsKey = Symbol() as InjectionKey<SurveyActions>;

// TODO: consider making this a store instead (need to think about Pinia & Immer first)
export function useSurveyActions(
  updateSurvey: (surveyUpdater: (draftSurvey: SurveyDefinition) => void) => void,
) {
  return {
    // TODO: move the "onPageUpdate" / page up / page down functions from PagesContainer to here
    // TODO: move the add new page logic here
    changePageType(pageId: string, newType: PageDefinitionType) {
      updateSurvey((draftSurvey) => {
        const index = draftSurvey.pages.findIndex((existingPage) => existingPage.id === pageId);
        if (index !== -1) {
          draftSurvey.pages.splice(index, 1, createNewPage(newType));
        }
      });
    },
  };
}

// TODO: having to export this also is a bit smelly. Re-think
export function createNewPage(pageType: PageDefinitionType): PageDefinition {
  const newPageId = uuidv4();

  switch (pageType) {
    case "question":
      return {
        id: newPageId,
        type: "question",
        question: "New question",
        answer: createTextDefinition(),
      };
    case "custom":
      return {
        id: newPageId,
        type: "custom",
        content: "Dummy content here",
      };
  }
}
