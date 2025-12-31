import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-full cursor-pointer inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900",
        secondary:
          "bg-indigo-500 text-white hover:bg-indigo-600 focus-visible:ring-indigo-500",
        outline:
          "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-400",
      },
      size: {
        default: "py-3.5 px-4",
        sm: "py-2 px-3 text-sm",
        lg: "py-4 px-6 text-base",
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
