import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="w-screen h-screen grid-cols-1 lg:grid-cols-2 grid">
        <div className="h-screen flex items-center justify-center bg-gradient-to-l from-[#00ADB5]/70  to-[#222831] ">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className=" animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
        <div className="hidden lg:block">
          <div className="h-screen w-full backcons flex items-center justify-center ">
            <Image src="/logo.svg" width={300} height={300} alt="logo"></Image>
          </div>
        </div>
      </div>
    </>
  );
}
