import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Panel } from "@/components/ui/panel";
import { skillCategories } from "@/lib/data";

const blockColors = ["bg-red text-white", "bg-ink text-paper", "bg-yellow text-ink", "bg-blue text-white"];

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          index="N° 02"
          title="What I build with"
          description="The languages, frameworks, and tools behind the projects below — no inflated mastery claims, just what I actually use."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <FadeIn key={category.title} delay={(index % 3) * 0.08}>
              <Panel className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center border-2 border-ink ${blockColors[index % blockColors.length]}`}
                  >
                    <category.icon size={20} />
                  </span>
                  <h3 className="text-lg font-extrabold uppercase tracking-tight">
                    {category.title}
                  </h3>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="stamp px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Panel>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
