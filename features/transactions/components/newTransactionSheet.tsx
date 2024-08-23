import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";
import { useNewTransaction } from "../hooks/use-new-transaction";
import { useTransactionCreate } from "../api/use-transactions-create";
import { useCategoryGet } from "@/features/categories/api/use-category-get";
import { useCategoryCreate } from "@/features/categories/api/use-category-create";
import { useAccountsGet } from "@/features/acc/api/use-account-get";
import { useAccountCreate } from "@/features/acc/api/use-account-create";
import { TransactionForm } from "./NewTransactionForm";
import { Loader2 } from "lucide-react";

function NewTransactionSheet() {
  const { isOpen, onClose, onOpen } = useNewTransaction();
  const mutation = useTransactionCreate();
  const categoryMutation = useCategoryCreate();
  const categoryQuery = useCategoryGet();
  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const formSchema = insertTransactionsSchema.omit({
    id: true,
  });
  const accountMutation = useAccountCreate();
  const accountQuery = useAccountsGet();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    mutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  type formValues = z.input<typeof formSchema>;
  const onSubmit = async (values: formValues) => {
    console.log(values);
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });

    // console.log(json);
    // const response = await axios
    //   .post("/api/accounts", json)
    //   .then(() => {
    //     onClose();
    //     toast.success("Account created");
    //   })
    //   .catch(() => {
    //     toast.error("Failed to create account");
    //   });
  };
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Add New Transaction</SheetTitle>
            <SheetDescription>Create a new transaction.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className=" animate-spin size-6 text-muted-foreground" />
            </div>
          ) : (
            <TransactionForm
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export { NewTransactionSheet };
