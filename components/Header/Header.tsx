import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { HeaderLogo } from "./Logo";
import { Navigation } from "./Navigation";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "./WelcomeMsg";

function Header() {
  return (
    <div className="bg-gradient-to-b from-[#00ADB5] to-[#1e989f] px-4 py-8 lg:px-14 pb-36">
      <div className=" max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center justify-center gap-x-14">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <div className="text-[#EEE]">
              <UserButton showName afterSignOutUrl="/" />
            </div>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="text-muted-foreground animate-spin size-7" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
      </div>
    </div>
  );
}

export { Header };
