import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FadeIn } from "@/components/ui/fade-in";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="panel grid grid-cols-2 divide-y-2 divide-ink sm:grid-cols-4 sm:divide-y-0 sm:divide-x-2">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1} className="px-6 py-10 text-center">
              <p className="neon-text text-4xl font-extrabold text-red sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-ink-soft">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
