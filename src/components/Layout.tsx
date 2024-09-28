import { ReactNode } from "react";
import { FC } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode
}

const Layout:FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
