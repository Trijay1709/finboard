"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
};

export const DatePicker = ({ value, onChange, disabled }: Props) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalIcon className="size-4 mr-3" />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
