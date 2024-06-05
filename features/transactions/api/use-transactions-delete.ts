import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono/client";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useTransactionDelete = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transaction Deleted");
      // queryClient.invalidateQueries({queryKey:["account",{id}]});
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      console.log(mutation.error);
      toast.error("Failed to Delete transaction");
    },
  });
  return mutation;
};
