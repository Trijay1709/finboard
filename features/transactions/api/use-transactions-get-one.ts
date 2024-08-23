import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import {
  convertAmountToBigUnits,
  convertAmountToSmallUnits,
} from "@/lib/utils";

export const useTransactionGetOne = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const { data } = await response.json();
      const newData = {
        ...data,
        amount: convertAmountToBigUnits(data.amount),
      };
      return newData;
    },
  });
  return query;
};
