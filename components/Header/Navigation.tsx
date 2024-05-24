"use client";

import { Menu, MenuSquare } from "lucide-react";
import Image from "next/image";
import { NavButton } from "./NavButton";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transaction",
    label: "Transaction",
  },
  {
    href: "/account",
    label: "Account",
  },
  {
    href: "/categories",
    label: "Categories",
  },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia("(max-width : 1024px)", false);
  const router = useRouter();
  const onClickHandle = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  const pathname = usePathname();
  if (isMobile) {
    return (
      <div className="flex items-center justify-center gap-x-2">
        <nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button
                className="font-normal hover:bg-slate-50/30 focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none border-none focus-visible: text-lg text-[#EEE] hover:text-[#EEE] bg-transparent"
                variant="outline"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-y-2 pt-6 pl-2">
                {routes.map((route) => {
                  return (
                    <Button
                      className="w-full justify-start"
                      variant={pathname === route.href ? "secondary" : "ghost"}
                      onClick={() => onClickHandle(route.href)}
                    >
                      {route.label}
                    </Button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
        <Link href="/">
          <Image src="logo.svg" height={60} width={60} alt="finboard" />
        </Link>
      </div>
    );
  }
  return (
    <nav>
      <div className="hidden lg:flex justify-center items-center gap-x-5 ">
        {routes.map((route) => {
          return (
            <NavButton
              key={route.label}
              label={route.label}
              href={route.href}
              isActive={pathname === route.href}
            />
          );
        })}
      </div>
    </nav>
  );
}

export { Navigation };
