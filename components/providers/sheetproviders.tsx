"use client";

import { NewAccountSheet } from "../accounts/newAccountSheet";
import { EditAccountSheet } from "../accounts/EditAccountSheet";
import { useMountedState } from "react-use";
import { NewCategorySheet } from "@/features/categories/components/newCategorySheet";
import { EditCategorySheet } from "@/features/categories/components/EditCategorySheet";
import { NewTransactionSheet } from "@/features/transactions/components/newTransactionSheet";

function Sheetproviders() {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewCategorySheet />
      <EditCategorySheet />
      <NewTransactionSheet />
    </>
  );
}

export { Sheetproviders };
