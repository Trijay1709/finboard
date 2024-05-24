import { Header } from "@/components/Header/Header";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}

export default Layout;
