import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountToBigUnits } from "@/lib/utils";
import { daysToWeeks } from "date-fns";

export const useSummaryGet = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("account_id") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }
      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: convertAmountToBigUnits(data.incomeAmount),
        expenseAmount: convertAmountToBigUnits(data.expenseAmount),
        remainingAmount: convertAmountToBigUnits(data.remainingAmount),
        categories: data.categories.map((category) => ({
          name: category.name,
          value: convertAmountToBigUnits(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountToBigUnits(day.income),
          expense: convertAmountToBigUnits(day.expense),
        })),
      };
    },
  });
  return query;
};
