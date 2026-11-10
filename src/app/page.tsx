import { funFacts, projects, site, tools, uiu } from "@/lib/data";
import { RevealRoot } from "@/components/reveal-root";
import { ContactForm } from "@/components/contact-form";

/*
  Dark & cinematic: near-black ground, Forest47 red as the one
  signature colour, Syne display type, red duotone on photographs, smooth entrance and scroll reveals
  that never hijack scrolling.
*/

const live = projects.filter((p) => p.image);
const codeOnly = projects.filter((p) => !p.image);
const ticker = ["Next.js", "React", "TypeScript", "Node.js", "Python", "Java", "PHP", "PostgreSQL", "Supabase", "Prisma", "Tailwind CSS", "Git", "Hyperledger Fabric"];
const inverted = new Set(["nextjs.svg", "github.svg", "vercel.svg", "prisma.svg"]);

const Arrow = () => (
  <span className="btn__arrow" aria-hidden="true">
    →
  </span>
);

export default function Home() {
  return (
    <>
      <RevealRoot />
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="nav">
        <div className="wrap nav__bar">
          <a className="brand" href="#top" aria-label="Forest47, back to top">
            <img src="/assets/logo-96.png" alt="" width={36} height={36} />
            <span>Forest47</span>
          </a>
          <nav className="nav__links" aria-label="Main">
            <a href="#work">Work</a>
            <a href="#stack">Stack</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn btn--red btn--sm" href="#contact">
            Let&apos;s talk
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <p className="eyebrow hero__in" style={{ ["--d" as string]: "0ms" }}>
                <span className="dot" aria-hidden="true" /> CSE student · Dhaka
              </p>
              <h1 className="hero__title">
                <span className="line">
                  <span style={{ ["--d" as string]: "80ms" }}>Learning</span>
                </span>
                <span className="line">
                  <span style={{ ["--d" as string]: "180ms" }}>by building</span>
                </span>
                <span className="line">
                  <span style={{ ["--d" as string]: "280ms" }}>
                    real things<em>.</em>
                  </span>
                </span>
              </h1>
              <p className="hero__lead hero__in" style={{ ["--d" as string]: "420ms" }}>
                I&apos;m <strong>Mohammad Mahadi Hasan</strong>, a 3rd-year CSE student at United International University, currently
                learning to program by building: a hackathon waste tracker, an algorithm visualiser, a student housing idea, and a few more.
              </p>
              <div className="hero__cta hero__in" style={{ ["--d" as string]: "520ms" }}>
                <a className="btn btn--red" href="#work">
                  See my work <Arrow />
                </a>
                <a className="btn btn--ghost" href="#contact">
                  Get in touch
                </a>
              </div>
              <dl className="hero__facts hero__in" style={{ ["--d" as string]: "640ms" }}>
                <div>
                  <dt>Live projects</dt>
                  <dd>4</dd>
                </div>
                <div>
                  <dt>Algorithms on AlgoCanvas</dt>
                  <dd>27</dd>
                </div>
                <div>
                  <dt>CSE FEST 2025</dt>
                  <dd>Award</dd>
                </div>
              </dl>
            </div>

            <figure className="portrait hero__in" style={{ ["--d" as string]: "200ms" }}>
              <span className="portrait__num" aria-hidden="true">
                47
              </span>
              <div className="portrait__frame">
                <img
                  src="/images/work/portrait-1200.webp"
                  srcSet="/images/work/portrait-700.webp 700w, /images/work/portrait-1200.webp 1200w"
                  sizes="(max-width: 900px) 90vw, 40vw"
                  alt="Mohammad Mahadi Hasan in a navy blazer and glasses, leaning on a railing"
                  width={1200}
                  height={1234}
                  fetchPriority="high"
                />
              </div>
              <figcaption className="portrait__tag">
                <span className="dot" aria-hidden="true" /> Best Emerging Team · UIU CSE FEST 2025
              </figcaption>
            </figure>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-label="Technologies I use">
          <div className="ticker__track">
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1 ? "true" : undefined}>
                {ticker.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* WORK */}
        <section className="section" id="work" aria-labelledby="work-h">
          <div className="wrap">
            <header className="section__head" data-reveal="">
              <p className="eyebrow">(01) Projects</p>
              <h2 id="work-h">
                Built while <em>learning.</em>
              </h2>
            </header>

            <div className="projects">
              {live.map((p, i) => (
                <article className={`project ${i % 2 ? "project--flip" : ""}`} key={p.id} data-reveal="">
                  <a className="project__shot" href={p.demo} aria-label={`Open ${p.title}`}>
                    <span className="project__bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <span>{p.demo?.replace("https://", "")}</span>
                    </span>
                    <img
                      src={`${p.image}-1600.webp`}
                      srcSet={`${p.image}-m.webp 700w, ${p.image}-1600.webp 1600w`}
                      sizes="(max-width: 900px) 92vw, 58vw"
                      alt={p.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                    />
                  </a>
                  <div className="project__body">
                    <span className="project__num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{p.title}</h3>
                    <p className="project__line">{p.line}</p>
                    <p>{p.body}</p>
                    <ul className="tags">
                      {p.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <div className="project__links">
                      <a className="link" href={p.demo}>
                        Live site <Arrow />
                      </a>
                      <a className="link link--muted" href={p.github}>
                        Code on GitHub <Arrow />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {codeOnly.map((p) => (
              <a className="also" href={p.github} key={p.id} data-reveal="">
                <span className="eyebrow">Also built</span>
                <span className="also__title">{p.title}</span>
                <span className="also__line">{p.body}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        {/* AWARD BAND */}
        <section className="award" aria-labelledby="award-h">
          <img
            className="award__bg"
            src="/images/work/team-se7en-1600.webp"
            srcSet="/images/work/team-se7en-900.webp 900w, /images/work/team-se7en-1600.webp 1600w"
            sizes="100vw"
            alt="The five members of Team Se7en under the Wastopia logo"
            width={1600}
            height={900}
            loading="lazy"
          />
          <div className="wrap award__inner" data-reveal="">
            <p className="eyebrow">(02) Recognition</p>
            <h2 id="award-h">
              Best Emerging Team<em>.</em>
            </h2>
            <p>
              Blockchain category, UIU CSE FEST 2025. Won with my team, Team Se7en, for Wastopia, a waste-tracking idea
              using a blockchain and IoT smart bins.
            </p>
          </div>
        </section>

        {/* STACK */}
        <section className="section" id="stack" aria-labelledby="stack-h">
          <div className="wrap">
            <header className="section__head" data-reveal="">
              <p className="eyebrow">(03) Learning</p>
              <h2 id="stack-h">
                What I&apos;m <em>learning with.</em>
              </h2>
            </header>
            <ul className="stack">
              {tools.map((t, i) => (
                <li key={t.name} data-reveal="" style={{ ["--d" as string]: `${(i % 4) * 60}ms` }}>
                  <span className="stack__icon">
                    <img
                      className={inverted.has(t.icon) ? "invert" : undefined}
                      src={`/assets/icons/${t.icon}`}
                      alt=""
                      width={t.w}
                      height={t.h}
                      loading="lazy"
                    />
                  </span>
                  <span className="stack__name">{t.name}</span>
                  <span className="stack__use">{t.use}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section section--alt" id="about" aria-labelledby="about-h">
          <div className="wrap about">
            <div data-reveal="">
              <p className="eyebrow">(04) About</p>
              <h2 id="about-h">
                Student by day,
                <br />
                learning <em>always.</em>
              </h2>
              <p className="about__lead">{uiu.lead}</p>
              <ol className="timeline">
                {uiu.rows.map((r) => (
                  <li key={r.name}>
                    <span className="timeline__k">{r.name}</span>
                    <span className="timeline__v">{r.value}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div data-reveal="" style={{ ["--d" as string]: "120ms" }}>
              <figure className="about__photo">
                <img
                  src="/images/work/photo-f58915687-960.webp"
                  srcSet="/images/work/photo-f58915687-500.webp 500w, /images/work/photo-f58915687-960.webp 960w, /images/work/photo-f58915687.webp 1280w"
                  sizes="(max-width: 900px) 92vw, 40vw"
                  alt="Carved metal chess pieces lined up on a wooden board"
                  width={960}
                  height={640}
                  loading="lazy"
                />
              </figure>
              <h3 className="facts__head">Away from the keyboard</h3>
              <ul className="facts">
                {funFacts.map((f) => (
                  <li key={f.title}>
                    <strong>{f.title}</strong>
                    <span>{f.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact" aria-labelledby="contact-h">
          <div className="wrap contact__grid">
            <div data-reveal="">
              <p className="eyebrow">(05) Contact</p>
              <h2 id="contact-h" className="contact__title">
                Say<br />
                hello<em>.</em>
              </h2>
              <p className="contact__lead">Have an internship, a project or a question? Send a message, it lands in my inbox.</p>
              <a className="contact__mail" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <ul className="socials">
                <li>
                  <a href={site.github}>GitHub</a>
                </li>
                <li>
                  <a href={site.linkedin}>LinkedIn</a>
                </li>
              </ul>
            </div>
            <div data-reveal="" style={{ ["--d" as string]: "120ms" }}>
              <ContactForm email={site.email} />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__bar">
          <span>© 2026 {site.name}</span>
          <span className="footer__brand">
            <img src="/assets/logo-96.png" alt="" width={24} height={24} loading="lazy" /> Forest47
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
        <p className="wrap footer__credit">Chess photograph by Lou Levit (CC0) via Wikimedia Commons.</p>
      </footer>
    </>
  );
}
