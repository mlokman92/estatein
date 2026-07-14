import { iconByName } from "@/lib/icons";

export type Service = {
  icon: string | null;
  title: string;
  description: string | null;
};

/** Service card: circular icon badge + title on one row, description below. */
export function ServiceCard({ icon, title, description }: Service) {
  const Icon = iconByName(icon);
  return (
    <article className="rounded-2xl border border-line bg-surface p-6 lg:p-7 3xl:p-8">
      <div className="flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong 3xl:size-16">
          <Icon className="size-6 text-purple 3xl:size-7" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-semibold leading-tight text-white lg:text-2xl">
          {title}
        </h3>
      </div>
      <p className="mt-5 text-base leading-relaxed text-muted">{description}</p>
    </article>
  );
}
