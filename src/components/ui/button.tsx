import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink font-bold uppercase tracking-wider transition-colors duration-150 ease-linear focus-visible:outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper neon-glow hover:bg-red hover:border-red hover:text-white",
  secondary: "bg-transparent text-ink hover:bg-ink hover:text-paper",
  ghost: "border-transparent text-ink hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-xs",
  lg: "px-7 py-3.5 text-sm",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  target,
  rel,
  type = "button",
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
