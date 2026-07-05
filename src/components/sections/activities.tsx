import { MapPin, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Panel } from "@/components/ui/panel";
import { activities } from "@/lib/data";

export function Activities() {
  return (
    <section id="activities" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Activities & Leadership"
          index="N° 04"
          title="Outside the classroom"
          description="As a student, this is where I've put in the work — a hackathon win and a debate podium, not job titles."
        />

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-ink sm:left-1/2" />

          <div className="space-y-12">
            {activities.map((activity, index) => (
              <FadeIn
                key={activity.organization}
                direction={index % 2 === 0 ? "right" : "left"}
                className={`relative flex flex-col sm:flex-row ${
                  index % 2 === 0 ? "" : "sm:flex-row-reverse"
                }`}
              >
                <div className="absolute left-6 top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center border-2 border-ink bg-red sm:left-1/2">
                  <Trophy size={12} className="text-white" />
                </div>

                <div className="w-full pl-14 sm:w-1/2 sm:px-10">
                  <Panel hover className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-extrabold uppercase tracking-tight">
                        {activity.role}
                      </h3>
                      <span className="stamp px-3 py-1 text-xs font-bold uppercase tracking-wide text-red">
                        {activity.period}
                      </span>
                    </div>
                    <p className="mt-1 font-bold text-ink-soft">{activity.organization}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                      <MapPin size={12} /> {activity.location}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {activity.points.map((point) => (
                        <li key={point} className="flex gap-2 text-sm text-ink-soft">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-red" />
                          <span className="text-pretty">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
