import { v4 as uuidv4 } from "uuid";
import { merge } from "lodash-es";
import type {
  PageDefinition,
  PageDefinitionType,
  SurveyDefinition,
} from "@/data/definitions/survey";
import { createTextDefinition } from "@/data/definitions/answerTypes";
import { useImmer } from "@/lib/useImmer";
import { computed, type ComputedRef, type ShallowRef } from "vue";

export type UpdateType = "merge" | "assign";

export type PartialWithId<T> = Partial<T> & { id: string };

interface AddPageOptions {
  addAfterPageId?: string;
}

export interface SurveyStore {
  survey: ShallowRef<SurveyDefinition>;
  updateSurvey: (fn: (draft: SurveyDefinition) => void) => void;
  cancelChanges: () => void;
  canUndo: ComputedRef<boolean>;
  createNewPage: (pageType: PageDefinitionType) => PageDefinition;
  addPage: (page: PageDefinition, options?: AddPageOptions) => void;
  changePageType: (pageId: string, newType: PageDefinitionType) => void;
  updatePage: (update: PartialWithId<PageDefinition>, updateType: UpdateType) => void;
  movePageUp: (pageId: string) => void;
  movePageDown: (pageId: string) => void;
}

export function useSurveyStore(initialState: SurveyDefinition): SurveyStore {
  const [survey, updateSurvey, { patches, inversePatches /*, applyPatches */ }] =
    useImmer(initialState);

  const canUndo = computed(() => patches.value.length > 0);

  function cancelChanges() {
    survey.value = initialState;
    patches.value = [];
    inversePatches.value = [];
  }

  function createNewPage(pageType: PageDefinitionType): PageDefinition {
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

  function addPage(page: PageDefinition, options?: AddPageOptions) {
    updateSurvey((draftSurvey) => {
      if (options?.addAfterPageId) {
        const index = draftSurvey.pages.findIndex(
          (existingPage) => existingPage.id === options.addAfterPageId,
        );
        if (index !== -1) {
          draftSurvey.pages.splice(index + 1, 0, page);
        }
      } else {
        draftSurvey.pages.push(page);
      }
    });
  }

  function changePageType(pageId: string, newType: PageDefinitionType) {
    updateSurvey((draftSurvey) => {
      const index = draftSurvey.pages.findIndex((existingPage) => existingPage.id === pageId);
      if (index !== -1) {
        draftSurvey.pages.splice(index, 1, createNewPage(newType));
      }
    });
  }

  function updatePage(update: PartialWithId<PageDefinition>, updateType: UpdateType) {
    updateSurvey((draftSurvey) => {
      const index = draftSurvey.pages.findIndex((existingPage) => existingPage.id === update.id);
      if (index !== -1) {
        if (updateType === "assign") {
          Object.assign(draftSurvey.pages[index], update);
        } else if (updateType === "merge") {
          merge(draftSurvey.pages[index], update);
        }
      }
    });
  }

  function movePageUp(pageId: string) {
    updateSurvey((draftSurvey) => {
      const index = draftSurvey.pages.findIndex((existingPage) => existingPage.id === pageId);
      if (index > 0) {
        const [page] = draftSurvey.pages.splice(index, 1);
        draftSurvey.pages.splice(index - 1, 0, page);
      }
    });
  }

  function movePageDown(pageId: string) {
    updateSurvey((draftSurvey) => {
      const index = draftSurvey.pages.findIndex((existingPage) => existingPage.id === pageId);
      if (index < draftSurvey.pages.length - 1) {
        const [page] = draftSurvey.pages.splice(index, 1);
        draftSurvey.pages.splice(index + 1, 0, page);
      }
    });
  }

  return {
    survey,
    updateSurvey,
    cancelChanges,
    canUndo,
    // todo
    // canRedo
    // redo
    createNewPage,
    addPage,
    changePageType,
    updatePage,
    movePageUp,
    movePageDown,
  };
}
