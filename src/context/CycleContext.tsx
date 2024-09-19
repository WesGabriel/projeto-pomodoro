import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle, cyclesReducer } from "../Reducers/cycles/reducer";
import {
  addNewACycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../Reducers/cycles/actions";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
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

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@pomodoro:cycle-state-1.0.0"
      );
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
    }
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@pomodoro:cycle-state-1.0.0", stateJSON);
  }, [cyclesState]);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const setSecondPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };
  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minustesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewACycleAction(newCycle));
    setAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction());
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
