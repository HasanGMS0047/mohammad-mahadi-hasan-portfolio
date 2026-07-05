import { cn } from "@/lib/utils";
import { FadeIn } from "./fade-in";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-left mx-0",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b-2 border-ink pb-3",
          align === "center" ? "justify-center" : "justify-between",
        )}
      >
        <span className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 shrink-0 bg-red" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">{eyebrow}</span>
        </span>
        {index ? (
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            {index}
          </span>
        ) : null}
      </div>
      <h2 className="mt-6 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base text-ink-soft sm:text-lg text-pretty">{description}</p>
      ) : null}
    </FadeIn>
  );
}
