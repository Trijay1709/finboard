import { Header } from "@/components/Header/Header";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <section>
      <Header />
      <div className="px-3 lg:px-8">{children}</div>
    </section>
  );
}

export default Layout;
