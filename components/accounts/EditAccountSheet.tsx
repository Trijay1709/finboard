import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

import { AccountForm } from "./NewAccountForm";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useAccountEdit } from "@/features/acc/api/use-account-edit";
import axios from "axios";
import { toast } from "sonner";
import { useOpenAccount } from "@/features/acc/hooks/use-open-account";
import { useAccountsGetOne } from "@/features/acc/api/use-account-get-one";
import { Loader2 } from "lucide-react";
import { useAccountDelete } from "@/features/acc/api/use-account-delete";
import { useConfirm } from "@/hooks/useConfirm";

function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();

  const editmutation = useAccountEdit(id);
  const deletemutation = useAccountDelete(id);
  const accountQuery = useAccountsGetOne(id);
  const formSchema = insertAccountSchema.pick({
    name: true,
  });
  const [ConfirmationModal, confirm] = useConfirm(
    "Are You Sure?",
    "You are going to delete this account"
  );

  const isPending = editmutation.isPending || deletemutation.isPending;
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

  const defaultValues = { name: accountQuery.data?.name || "" };

  const isLoading = accountQuery.isLoading;
  return (
    <>
      <ConfirmationModal />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
          </SheetHeader>
          {!isLoading ? (
            <AccountForm
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              id={id}
              onDelete={handleDelete}
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

export { EditAccountSheet };
