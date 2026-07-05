import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Panel } from "@/components/ui/panel";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Education"
          index="N° 05"
          title="Academic background"
          description="Where I'm studying, and what I'm focused on while I'm there."
        />

        <div className="mt-16">
          {education.map((item) => (
            <FadeIn key={item.school}>
              <Panel className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-ink bg-blue text-white">
                    <GraduationCap size={20} />
                  </span>
                  <span className="stamp px-3 py-1 text-xs font-bold uppercase tracking-wide text-red">
                    {item.period}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold uppercase tracking-tight">
                  {item.degree}
                </h3>
                <p className="mt-1 font-bold text-ink-soft">{item.school}</p>
                <p className="mt-3 text-sm text-ink-soft text-pretty">{item.description}</p>
              </Panel>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
