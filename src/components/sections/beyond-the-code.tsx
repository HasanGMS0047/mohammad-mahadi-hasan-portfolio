import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Panel } from "@/components/ui/panel";
import { beyondTheCode } from "@/lib/data";

const blockColors = ["bg-red text-white", "bg-ink text-paper", "bg-yellow text-ink", "bg-blue text-white"];

export function BeyondTheCode() {
  return (
    <section id="beyond" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Beyond the Code"
          index="N° 06"
          title="What I'm into outside of shipping code"
          description="No client testimonials yet — here's what actually fills the rest of my time."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {beyondTheCode.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <Panel className="h-full p-6">
                <span
                  className={`flex h-11 w-11 items-center justify-center border-2 border-ink ${blockColors[index % blockColors.length]}`}
                >
                  <item.icon size={20} />
                </span>
                <h3 className="mt-5 text-base font-extrabold uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft text-pretty">{item.description}</p>
              </Panel>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
