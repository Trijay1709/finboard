import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

import { CategoryForm } from "./NewCategoryForm";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";

import { useCategoryEdit } from "@/features/categories/api/use-category-edit";
import axios from "axios";
import { toast } from "sonner";
import { useOpenAccount } from "@/features/acc/hooks/use-open-account";

import { useCategoryGetOne } from "@/features/categories/api/use-category-get-one";
import { Loader2 } from "lucide-react";
import { usecategoryDelete } from "@/features/categories/api/use-category-delete";
import { useConfirm } from "@/hooks/useConfirm";
import { useOpenCategory } from "../hooks/use-open-category";

function EditCategorySheet() {
  const { isOpen, onClose, id } = useOpenCategory();

  const editmutation = useCategoryEdit(id);
  const deletemutation = usecategoryDelete(id);
  const categoryQuery = useCategoryGetOne(id);
  const formSchema = insertCategorySchema.pick({
    name: true,
  });
  const [ConfirmationModal, confirm] = useConfirm(
    "Are You Sure?",
    "You are going to delete this query"
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

  const defaultValues = { name: categoryQuery.data?.name || "" };

  const isLoading = categoryQuery.isLoading;
  return (
    <>
      <ConfirmationModal />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
          </SheetHeader>
          {!isLoading ? (
            <CategoryForm
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

export { EditCategorySheet };
