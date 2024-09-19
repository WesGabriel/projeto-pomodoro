import { produce } from "immer";
import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minustesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
}

interface CycleState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const cyclesReducer = (state: CycleState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCylceIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCylceIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCylceIndex].interruptDate = new Date();
      });
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCylceIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCylceIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCylceIndex].finishedDate = new Date();
      });
    }
    default:
      return state;
  }
};
