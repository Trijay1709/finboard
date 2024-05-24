"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type NavButtonProps = {
  label: string;
  href: string;
  isActive?: boolean;
};

function NavButton({ label, href, isActive }: NavButtonProps) {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-slate-50/30 focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none border-none focus-visible: text-lg text-[#EEE] hover:text-[#EEE] transition",
        isActive ? "bg-slate-50/20" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export { NavButton };
