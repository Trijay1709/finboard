"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/acc/hooks/use-new-account";
import { Loader2, Plus } from "lucide-react";
import { ResponseType, columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { useAccountsGet } from "@/features/acc/api/use-account-get";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccountBulkDelete } from "@/features/acc/api/use-account-bulk-delete";

const page = () => {
  const accountsQuery = useAccountsGet();
  const accountsData = accountsQuery.data || [];
  const deleteAccounts = useAccountBulkDelete();

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;
  const { isOpen, onOpen } = useNewAccount();

  if (accountsQuery.isLoading) {
    return;
    <div className=" max-w-screen-2xl mx-auto  w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex w-full items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>;
  }
  return (
    <div className=" max-w-screen-2xl mx-auto  w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className=" gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className=" line-clamp-1 text-xl">Accounts page</CardTitle>
          <Button onClick={onOpen} size="sm">
            Add New
            <Plus className="size-4 text-secondary ml-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id);
              deleteAccounts.mutate({ ids });
            }}
            columns={columns}
            filterKey="name"
            disabled={isDisabled}
            data={accountsData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
