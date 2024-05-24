"use client";

import { useUser } from "@clerk/nextjs";

function WelcomeMsg() {
  const user = useUser();
  return (
    <div className="text-[#EEE] text-3xl font-bold ">
      Welcome to FinBoard, <br />
      {user.user?.firstName} 👋
    </div>
  );
}

export { WelcomeMsg };
