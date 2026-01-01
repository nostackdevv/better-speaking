import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-full cursor-pointer inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 shadow-lg shadow-orange-500/20 focus-visible:ring-orange-500",
        secondary:
          "bg-slate-800 text-white hover:bg-slate-700 focus-visible:ring-slate-800",
        outline:
          "border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-slate-400",
        ghost:
          "text-slate-600 hover:bg-slate-100 shadow-none",
        accent:
          "bg-linear-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 shadow-lg shadow-teal-500/20 focus-visible:ring-teal-500",
      },
      size: {
        default: "py-3 px-5",
        sm: "py-2 px-3 text-sm",
        lg: "py-4 px-8 text-lg",
        icon: "p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
