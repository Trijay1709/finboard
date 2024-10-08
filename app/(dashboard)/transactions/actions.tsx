"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useConfirm } from "@/hooks/useConfirm";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useTransactionDelete } from "@/features/transactions/api/use-transactions-delete";
type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenTransaction();
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deletemutation.mutate(undefined);
    }
  };
  const deletemutation = useTransactionDelete(id);
  const [ConfirmationModal, confirm] = useConfirm(
    "Are You Sure?",
    "You are going to delete this category"
  );
  return (
    <>
      <ConfirmationModal />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex items-center p-2"
            disabled={false}
            onClick={() => {
              onOpen(id);
            }}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center p-2"
            disabled={false}
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
