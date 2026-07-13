import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-purple text-white hover:bg-[#8b5cf6]",
  outline:
    "border border-line text-white hover:bg-surface hover:border-line-strong",
  dark: "bg-surface border border-line text-white hover:bg-elevated hover:border-line-strong",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-4 text-base",
  lg: "px-6 py-[18px] text-lg",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = BaseProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;

type NativeButtonProps = BaseProps & { href?: undefined } & Omit<
    React.ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = AnchorProps | NativeButtonProps;

export function Button({
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    return (
      <Link className={classes} {...(rest as AnchorProps)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as NativeButtonProps)}>
      {children}
    </button>
  );
}
