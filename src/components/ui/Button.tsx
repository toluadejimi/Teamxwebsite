"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_0_0_1px_rgba(37,99,235,0.2),0_1px_2px_rgba(0,0,0,0.12)] hover:shadow-[0_0_24px_rgba(37,99,235,0.25)]",
  secondary:
    "bg-surface text-foreground border border-border hover:bg-background hover:border-accent/30",
  ghost: "text-foreground hover:bg-surface hover:text-accent",
  outline:
    "border border-border text-foreground hover:border-accent/50 hover:text-accent bg-transparent",
} as const;

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2.5 rounded-lg",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
  external?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      asChild = false,
      children,
      className,
      external,
      ...props
    },
    ref
  ) => {
    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (external) {
        return (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {children}
          </motion.a>
        );
      }

      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="inline-flex"
        >
          <Link href={href} className={classes}>
            {children}
          </Link>
        </motion.div>
      );
    }

    if (asChild && children) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn("inline-flex", className)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
