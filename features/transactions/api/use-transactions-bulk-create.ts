import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono/client";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>;

export const useTransactionBulkCreate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log("hello");
      const response = await client.api.transactions["bulk-create"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transaction(s) created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      console.log(mutation.error);
      toast.error("Failed to Created Transactions");
    },
  });
  return mutation;
};
