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
import { useCategoryCreate } from "@/features/categories/api/use-category-create";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";

function NewCategorySheet() {
  const { isOpen, onClose, onOpen } = useNewCategory();

  const mutation = useCategoryCreate();
  const formSchema = insertCategorySchema.pick({
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
            <SheetTitle>Add New Category</SheetTitle>
            <SheetDescription>
              Create a new category to split your spendings.
            </SheetDescription>
          </SheetHeader>
          <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export { NewCategorySheet };
