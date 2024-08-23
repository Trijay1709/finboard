import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

import { insertCategorySchema, insertTransactionsSchema } from "@/db/schema";
import { z } from "zod";

import { useCategoryEdit } from "@/features/categories/api/use-category-edit";
import axios from "axios";
import { toast } from "sonner";
import { useOpenAccount } from "@/features/acc/hooks/use-open-account";

import { useCategoryGetOne } from "@/features/categories/api/use-category-get-one";
import { Loader2 } from "lucide-react";
import { usecategoryDelete } from "@/features/categories/api/use-category-delete";
import { useConfirm } from "@/hooks/useConfirm";

import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useTransactionGetOne } from "../api/use-transactions-get-one";
import { useTransactionDelete } from "../api/use-transactions-delete";
import { useTransactionEdit } from "../api/use-transactions-edit";
import { TransactionForm } from "./NewTransactionForm";
import { useCategoryCreate } from "@/features/categories/api/use-category-create";
import { useCategoryGet } from "@/features/categories/api/use-category-get";
import { useAccountCreate } from "@/features/acc/api/use-account-create";
import { useAccountsGet } from "@/features/acc/api/use-account-get";

function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();

  const editmutation = useTransactionEdit(id);
  const deletemutation = useTransactionDelete(id);
  const transactionQuery = useTransactionGetOne(id);
  const formSchema = insertTransactionsSchema.omit({
    id: true,
  });
  const [ConfirmationModal, confirm] = useConfirm(
    "Are You Sure?",
    "You are going to delete this query"
  );

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deletemutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };
  type formValues = z.input<typeof formSchema>;
  const onSubmit = async (values: formValues) => {
    console.log(values);
    editmutation.mutate(values, {
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
  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        amount: transactionQuery.data.amount.toString(),
      }
    : {
        accountId: "",
        categoryId: "",
        payee: "",
        notes: "",
        date: new Date(),
        amount: "",
      };

  const isPending =
    editmutation.isPending ||
    deletemutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;
  return (
    <>
      <ConfirmationModal />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
          </SheetHeader>
          {!isLoading ? (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              defaultValues={defaultValues}
              onDelete={handleDelete}
              onCreateAccount={onCreateAccount}
            />
          ) : (
            <div className=" absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export { EditTransactionSheet };
