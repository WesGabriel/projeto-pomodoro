import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutConstainer } from "./styles";

export const DefaultLayout = () => {
  return (
    <LayoutConstainer>
      <Header />
      <Outlet />
    </LayoutConstainer>
  );
};
