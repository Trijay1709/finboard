"use client";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/acc/hooks/use-new-account";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { isOpen, onOpen } = useNewAccount();
  return (
    <main>
      <Button onClick={onOpen}>Add an account</Button>
    </main>
  );
}
