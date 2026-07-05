import { About } from "@/components/sections/about";
import { Activities } from "@/components/sections/activities";
import { BeyondTheCode } from "@/components/sections/beyond-the-code";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Activities />
      <Education />
      <BeyondTheCode />
      <Stats />
      <Contact />
    </>
  );
}
