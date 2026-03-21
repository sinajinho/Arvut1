"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

const SelectContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  labelMap: React.MutableRefObject<Map<string, string>>;
  registerLabel: (value: string, label: string) => void;
}>({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
  labelMap: { current: new Map() },
  registerLabel: () => {},
});

function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const labelMap = React.useRef<Map<string, string>>(new Map());
  const [, forceUpdate] = React.useState(0);

  const registerLabel = React.useCallback(
    (itemValue: string, label: string) => {
      if (labelMap.current.get(itemValue) !== label) {
        labelMap.current.set(itemValue, label);
        forceUpdate((n) => n + 1);
      }
    },
    []
  );

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, labelMap, registerLabel }}
    >
      <div className="relative inline-block">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open, setOpen } = React.useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
    >
      {children}
      <ChevronDownIcon className="shrink-0 text-black" style={{ width: '0.6em', height: '0.6em' }} strokeWidth={1.5} />
    </button>
  );
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value, labelMap } = React.useContext(SelectContext);
  const label = value ? labelMap.current.get(value) : null;

  return <span>{label || placeholder}</span>;
}

function SelectContent({
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open, setOpen } = React.useContext(SelectContext);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.closest(".relative")?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 z-50 mt-1 w-max overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
    >
      {children}
    </div>
  );
}

function SelectItem({
  value: itemValue,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { value, onValueChange, setOpen, registerLabel } =
    React.useContext(SelectContext);
  const isSelected = value === itemValue;
  const label = typeof children === "string" ? children : "";

  React.useEffect(() => {
    registerLabel(itemValue, label);
  }, [itemValue, label, registerLabel]);

  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent",
        className
      )}
      onClick={() => {
        onValueChange(itemValue);
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
