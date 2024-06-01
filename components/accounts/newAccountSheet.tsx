import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "@/features/acc/hooks/use-new-account";
import { AccountForm } from "./NewAccountForm";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useAccountCreate } from "@/features/acc/api/use-account-create";
import axios from "axios";
import { toast } from "sonner";

function NewAccountSheet() {
  const { isOpen, onClose, onOpen } = useNewAccount();

  const mutation = useAccountCreate();
  const formSchema = insertAccountSchema.pick({
    name: true,
  });

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
            <SheetTitle>New Account</SheetTitle>
            <SheetDescription>
              Create a new account to track your spendings.
            </SheetDescription>
          </SheetHeader>
          <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export { NewAccountSheet };
