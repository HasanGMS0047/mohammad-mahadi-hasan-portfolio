import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Panel } from "@/components/ui/panel";
import { siteConfig, timeline } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Me"
          index="N° 01"
          title="The person behind the code"
          description="A quick introduction to who I am, what I build, and what I do when I'm not at the keyboard."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="right">
            <h3 className="text-2xl font-extrabold uppercase tracking-tight">
              CSE student, building real things.
            </h3>
            <p className="mt-5 text-ink-soft leading-relaxed text-pretty">{siteConfig.shortBio}</p>
          </FadeIn>

          <FadeIn direction="left">
            <Panel className="p-8">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                My Journey
              </h4>
              <ol className="relative mt-6 space-y-8 border-l-2 border-ink pl-6">
                {timeline.map((entry) => (
                  <li key={entry.title} className="relative">
                    <span className="absolute -left-[1.9rem] top-1 h-3.5 w-3.5 bg-red" />
                    <span className="text-xs font-bold uppercase tracking-widest text-red">
                      {entry.year}
                    </span>
                    <p className="mt-1 font-bold">{entry.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">{entry.description}</p>
                  </li>
                ))}
              </ol>
            </Panel>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
