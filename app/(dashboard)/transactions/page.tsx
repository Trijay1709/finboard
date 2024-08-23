"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { ResponseType, columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useTransactionGet } from "@/features/transactions/api/use-transactions-get";
import { useTransactionBulkDelete } from "@/features/transactions/api/use-transactions-bulk-delete";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const page = () => {
  const transactionQuery = useTransactionGet();
  const transactionsData = transactionQuery.data || [];
  const deleteTransactions = useTransactionBulkDelete();

  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;
  const { isOpen, onOpen } = useNewTransaction();

  if (transactionQuery.isLoading) {
    return (
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
      </div>
    );
  }
  return (
    <div className=" max-w-screen-2xl mx-auto  w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className=" gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className=" line-clamp-1 text-xl">
            Tranasactions history
          </CardTitle>
          <Button onClick={onOpen} size="sm">
            Add New
            <Plus className="size-4 text-secondary ml-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            columns={columns}
            filterKey="payee"
            disabled={isDisabled}
            data={transactionsData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
