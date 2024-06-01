"use client";

import { NewAccountSheet } from "../accounts/newAccountSheet";
import { EditAccountSheet } from "../accounts/EditAccountSheet";
import { useMountedState } from "react-use";

function Sheetproviders() {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
}

export { Sheetproviders };
