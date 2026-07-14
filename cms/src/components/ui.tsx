import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const btnVariants = {
  primary: "bg-purple text-white hover:bg-purple-light",
  dark: "border border-line-strong bg-elevated text-fg hover:bg-line-strong",
  ghost: "text-muted hover:text-fg",
  danger: "bg-red-600/90 text-white hover:bg-red-600",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof btnVariants;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(btnBase, "px-4 py-2 text-sm", btnVariants[variant], className)}
      {...props}
    />
  );
}

/** Same look as <Button>, for use on <Link>/<a> elements. */
export function buttonClass(
  variant: keyof typeof btnVariants = "primary",
  className?: string,
): string {
  return cn(btnBase, "px-4 py-2 text-sm", btnVariants[variant], className);
}

export const fieldCls =
  "w-full rounded-[var(--radius-btn)] border border-line-strong bg-bg px-3 py-2 text-sm text-fg outline-none placeholder:text-muted/60 focus:border-purple";

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldCls, className)} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldCls, "min-h-24 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldCls, "appearance-none", className)} {...props}>
      {children}
    </select>
  );
}

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-fg">
        {label}
        {required && <span className="text-purple-light"> *</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3"
      aria-pressed={checked}
    >
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-purple" : "bg-line-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white transition-all",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </span>
      <span className="text-sm text-fg">{label}</span>
    </button>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-line-strong border-t-purple",
        className ?? "size-5",
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-line bg-surface p-5 lg:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
