import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minustesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

interface CycleContextProviderProps {
  children: ReactNode;
}

interface CycleState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        case "INTERRUPT_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };
        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const setSecondPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };
  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minustesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });
    setAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  };

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
