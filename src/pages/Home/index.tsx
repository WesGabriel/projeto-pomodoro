import { Play } from "phosphor-react";

export const Home = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <input type="" id="task" />

          <label htmlFor="">durante</label>
          <input type="number" id="minutesAmount" />

          <span>minutos.</span>
        </div>

        <div>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </div>

        <button type="submit">
          <Play />
          Começar
        </button>
      </form>
    </div>
  );
};
