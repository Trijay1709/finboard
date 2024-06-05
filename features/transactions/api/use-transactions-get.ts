import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";

export const useTransactionGet = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("account_id") || "";

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
