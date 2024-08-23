import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { eachDayOfInterval, isSameDay } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToBigUnits(amount: number) {
  return amount / 100;
}
export function convertAmountToSmallUnits(amount: number) {
  return Math.round(amount) * 100;
}
export function formatCurrency(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}
export function calculatePercentChange(current: number, previous: number) {
  if (!previous) {
    return previous === current ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}
export function fillMissingDays(
  activeDays: {
    date: Date;
    income: number;
    expense: number;
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));
    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expense: 0,
      };
    }
  });
  return transactionsByDay;
}
