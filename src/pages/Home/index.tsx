import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StarCountdownButton,
  TaskInput,
} from "./styles";

export const Home = () => {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type=""
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-sugestion"
          />

          <datalist id="task-sugestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StarCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StarCountdownButton>
      </form>
    </HomeContainer>
  );
};
