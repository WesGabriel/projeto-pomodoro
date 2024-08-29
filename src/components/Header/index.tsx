import { HeaderContainer } from "./style";
import logo from "../../assets/Logo.svg";
import { Scroll, Timer } from "phosphor-react";

export const Header = () => {
  return (
    <HeaderContainer>
      <span>
        <img src={logo} alt="Logo" />
      </span>
      <nav>
        <a href="">
          <Timer size={24} />
        </a>
        <a href="">
          <Scroll size={24} />
        </a>
      </nav>
    </HeaderContainer>
  );
};
