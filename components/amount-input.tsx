import CurrencyInput from "react-currency-input-field";
import { MinusCircle, PlusCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const AmountInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: Props) => {
  const ParsedValue = parseFloat(value);
  const isIncome = ParsedValue > 0;
  const isExpense = ParsedValue < 0;

  const onReverseValue = () => {
    if (!value) {
      return;
    }
    onChange((parseFloat(value) * -1).toString());
  };
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "hover:bg-zinc-400 bg-zinc-500 absolute top-1 left-1.5 rounded-md p-2 flex items-center justify-center transition",
                isIncome && "hover:bg-emerald-400 bg-emerald-500",
                isExpense && "hover:bg-rose-400 bg-rose-500"
              )}
            >
              {!ParsedValue && <Info className="size-4 text-white" />}
              {isIncome && <PlusCircle className="size-4 text-white" />}
              {isExpense && <MinusCircle className="size-4 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] for income and [-] for expenses
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        className="pl-12 flex h-10 w-full rounded-md border border-input bg-background px-3 py-5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        prefix="₹"
        placeholder={placeholder}
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
