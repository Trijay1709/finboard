"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenAccount } from "@/features/acc/hooks/use-open-account";
import { useAccountDelete } from "@/features/acc/api/use-account-delete";
import { useConfirm } from "@/hooks/useConfirm";
type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAccount();
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deletemutation.mutate(undefined);
    }
  };
  const deletemutation = useAccountDelete(id);
  const [ConfirmationModal, confirm] = useConfirm(
    "Are You Sure?",
    "You are going to delete this account"
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
