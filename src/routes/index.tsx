import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { useSiteContent, type SiteContent } from "@/hooks/useSiteContent";
import { useProjects } from "@/hooks/useProjects";
import { getProjectLinks } from "@/lib/projectLinks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apul Agarwal" },
      {
        name: "description",
        content:
          "15+ years building defense and homeland security software at scale. UW Foster MBA 2026. Based in Seattle, WA.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Apul Agarwal | Technical Program Manager" },
      {
        property: "og:description",
        content:
          "15+ years building defense and homeland security software at scale. UW Foster MBA 2026. Based in Seattle, WA.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const container: React.CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "0 2rem",
};

const sectionStyle: React.CSSProperties = {
  borderTop: "1px solid var(--purple)",
  paddingTop: "64px",
  paddingBottom: "64px",
};

const proseStyle: React.CSSProperties = {
  color: "var(--muted)",
  maxWidth: 640,
  fontSize: "1rem",
  lineHeight: 1.75,
};

function Header() {
  return (
    <header style={{ ...container, paddingTop: "2.5rem", paddingBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text)",
          }}
        >
          Apul Agarwal
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="top" style={{ ...container, padding: "1rem 2rem 3.5rem" }}>
      <div className="hero-grid">
        {/* PHOTO SLOT — renders the uploaded headshot if `photo_url` is set,
            otherwise the #f0eeeb placeholder box. Wired to admin in Phase 3. */}
        {content.photo_url ? (
          <img
            src={content.photo_url}
            alt=""
            width={220}
            height={260}
            style={{
              width: 220,
              height: 260,
              borderRadius: 8,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: 220,
              height: 260,
              borderRadius: 8,
              backgroundColor: "var(--photo-bg)",
              flexShrink: 0,
            }}
          />
        )}
        <div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "3.2rem",
              fontWeight: 700,
              color: "var(--gold)",
              marginBottom: "1.25rem",
              lineHeight: 1.1,
            }}
          >
            Apul Agarwal
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 1.25,
              marginBottom: "1.25rem",
            }}
          >
            {content.hero_hook}
          </p>
          <p style={{ ...proseStyle, marginBottom: "1.5rem" }}>
            {content.hero_subhead}
          </p>
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                fontSize: "0.75rem",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                fontWeight: 600,
                color: "#4b2e83",
                backgroundColor: "#f0ecfa",
                border: "1px solid #4b2e83",
                borderRadius: "12px",
                letterSpacing: "0.04em",
                marginBottom: "1.25rem",
              }}
            >
              UW Foster MBA '26
            </span>
          </div>
          <p style={{ color: "var(--text)", fontSize: "0.95rem" }}>
            <a className="hero-link" href="mailto:apulagarwal@gmail.com">
              Email
            </a>
            <span aria-hidden="true" style={{ color: "var(--subtle)" }}>
              {" · "}
            </span>
            <a
              className="hero-link"
              href="https://linkedin.com/in/apulagarwal"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <span aria-hidden="true" style={{ color: "var(--subtle)" }}>
              {" · "}
            </span>
            <a
              className="hero-link"
              href="https://github.com/apulagarwal"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <span aria-hidden="true" style={{ color: "var(--subtle)" }}>
              {" · "}
            </span>
            <a
              className="hero-link"
              href="mailto:apulagarwal@gmail.com?subject=Resume%20request"
            >
              Request Resume
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

const PURPLE_INLINE = { fontWeight: 600 as const, color: "#4b2e83" };

// Render a paragraph string, wrapping the literal "UW Foster School of Business"
// substring in the purple inline span used in Phase 1. Falls back to plain text
// if the substring is absent.
function renderWithFosterHighlight(text: string) {
  const needle = "UW Foster School of Business";
  const idx = text.indexOf(needle);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={PURPLE_INLINE}>{needle}</span>
      {text.slice(idx + needle.length)}
    </>
  );
}

function About({ content }: { content: SiteContent }) {
  return (
    <section id="about" style={{ ...container, ...sectionStyle }}>
      <SectionLabel>About</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        <p style={proseStyle}>{content.about_p1}</p>
        <p style={proseStyle}>{content.about_p2}</p>
        <p style={proseStyle}>{renderWithFosterHighlight(content.about_p3)}</p>
      </div>
    </section>
  );
}

type WorkBlock = {
  role: string;
  company: string;
  period: string;
  body: string;
};

const workBlocks: WorkBlock[] = [
  {
    role: "Senior Research Staff — Technical Program Manager",
    company: "Bharat Electronics Limited, Central Research Lab",
    period: "2021 – 2025",
    body:
      "I managed software program delivery for the $75M NAISS program, coordinating across 10 cross-functional teams and 10 or more vendor partners as the team delivered across 6 naval airbases. I also led the QA effort for KAVACH, a railway protection system that was a new vertical for BEL with no prior operational model. Working with the team, we restructured the validation process from a 2-month cycle into a 15-day continuous feedback loop, achieving certification readiness 40% faster than the industry benchmark.",
  },
  {
    role: "Research Staff — Technical Program Manager",
    company: "Bharat Electronics Limited, Central Research Lab",
    period: "2015 – 2020",
    body:
      "I managed software program delivery for the $147M IPSS program, a 5-sensor-layer autonomous intrusion detection platform the team deployed across 23 Indian Air Force bases. My role was coordinating 12 cross-functional teams and 6 to 7 vendor partners, managing stage-gate milestones, and working with the field teams to establish the reference configurations and deployment playbooks that made it possible to run 5 sites in parallel.",
  },
  {
    role: "Research Staff — Software Engineer and Tech Lead",
    company: "Bharat Electronics Limited, Central Research Lab",
    period: "2008 – 2015",
    body:
      "Earlier in my career I was part of small engineering teams building software across four programs: the Integrated Coastal Surveillance System for the Indian Coast Guard and three export countries, the Battlefield Surveillance System for the Indian Army, Combat Management Systems for Indian Navy warships, and the National Maritime Domain Awareness system spanning 50 or more coastal radar stations. Small teams, complex integrations: it's where I learned what good software delivery actually requires before I moved into managing it.",
  },
];

function Work({ content }: { content: SiteContent }) {
  const bodies = [content.work_p1, content.work_p2, content.work_p3];
  return (
    <section id="work" style={{ ...container, ...sectionStyle }}>
      <SectionLabel>Work</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {workBlocks.map((w, i) => (
          <article key={w.role + w.period}>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "0.2rem",
              }}
            >
              {w.role}
            </h3>
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--purple)",
                marginBottom: "0.15rem",
              }}
            >
              {w.company}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--subtle)",
                marginBottom: "0.65rem",
              }}
            >
              {w.period}
            </div>
            <p style={{ ...proseStyle, fontSize: "0.95rem" }}>{bodies[i] ?? w.body}</p>
          </article>
        ))}
      </div>

      {/*
        PROJECTS SECTION — deferred. Uncomment when AI Builder Series or ClimeCo
        has a live link or write-up. Each entry needs: name, one-line outcome
        with a number/result, URL, 2-3 sentences of prose. No bullets.

        <section id="projects" style={{ ...container, ...sectionStyle }}>
          <SectionLabel>Projects</SectionLabel>
          ...
        </section>
      */}
    </section>
  );
}

function Projects() {
  const { projects } = useProjects();
  if (projects.length === 0) return null;
  return (
    <section id="projects" style={{ ...container, ...sectionStyle }}>
      <SectionLabel>Projects</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {projects.map((p) => (
          <article key={p.id}>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "0.4rem",
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#555555",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "0.6rem",
              }}
            >
              {p.outcome}
            </p>
            <p style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="project-readmore"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "#555555",
                }}
              >
                Read more →
              </Link>
              {(() => {
                const links = getProjectLinks(p.slug, p.live_url);
                return (
                  <>
                    {links.github && (
                      <a
                        href={links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-readmore"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.8rem",
                          color: "var(--purple)",
                          border: "1px solid var(--purple)",
                          borderRadius: "10px",
                          padding: "0.1rem 0.6rem",
                        }}
                      >
                        GitHub
                      </a>
                    )}
                    {links.demo && (
                      <a
                        href={links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="project-readmore"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.8rem",
                          color: "var(--purple)",
                          border: "1px solid var(--purple)",
                          borderRadius: "10px",
                          padding: "0.1rem 0.6rem",
                        }}
                      >
                        Live demo
                      </a>
                    )}
                  </>
                );
              })()}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={{ ...container, ...sectionStyle }}>
      <SectionLabel>Education</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        <div style={{ borderLeft: "3px solid #4b2e83", paddingLeft: "1rem", marginBottom: "1.5rem" }}>
        <article>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: "0.2rem",
            }}
          >
            MBA (STEM-designated), 1-year full-time
          </h3>
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--purple)",
              marginBottom: "0.65rem",
            }}
          >
            UW Foster School of Business
          </div>
          <p style={{ ...proseStyle, fontSize: "0.95rem" }}>
            Management Science. Graduated June 2026. GPA 3.70.
            Consulting engagement: customer discovery and GTM strategy for
            low-carbon cement (ClimeCo).
          </p>
        </article>
        </div>
        <article>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: "0.2rem",
            }}
          >
            B.E. Computer Science Engineering
          </h3>
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--purple)",
              marginBottom: "0.65rem",
            }}
          >
            HNB Garhwal University, GB Pant Engineering College
          </div>
          <p style={{ ...proseStyle, fontSize: "0.95rem" }}>First Division.</p>
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ ...container, ...sectionStyle }}>
      <SectionLabel>Contact</SectionLabel>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: "1rem",
        }}
      >
        Let's Connect
      </h3>
      <p style={{ ...proseStyle, marginBottom: "1.5rem" }}>
        I'm actively exploring senior TPM and PM (Technical) roles in the US.
        If you're building something that demands both engineering rigor and
        program-scale delivery, let's connect.
      </p>
      <a className="cta-email" href="mailto:apulagarwal@gmail.com">
        apulagarwal@gmail.com
      </a>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        <a
          className="hero-link"
          href="https://linkedin.com/in/apulagarwal"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <span aria-hidden="true" style={{ color: "var(--subtle)" }}>
          {" · "}
        </span>
        <a
          className="hero-link"
          href="https://github.com/apulagarwal"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        ...container,
        borderTop: "1px solid var(--divider)",
        padding: "2rem 2rem 3rem",
        color: "var(--subtle)",
        fontSize: "0.85rem",
      }}
    >
      Apul Agarwal · Seattle, WA ·{" "}
      <a
        href="https://linkedin.com/in/apulagarwal"
        target="_blank"
        rel="noreferrer"
        style={{ color: "var(--subtle)" }}
        className="footer-link"
      >
        linkedin.com/in/apulagarwal
      </a>{" · "}
      <a
        href="https://github.com/apulagarwal"
        target="_blank"
        rel="noreferrer"
        style={{ color: "var(--subtle)" }}
        className="footer-link"
      >
        github.com/apulagarwal
      </a>
    </footer>
  );
}

function Index() {
  const { content } = useSiteContent();
  return (
    <>
      <style>{`
        .site-nav { display: flex; gap: 1.5rem; }
        .site-nav a {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          color: var(--subtle);
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .site-nav a:hover { color: var(--text); }
        .hero-grid {
          display: flex;
          gap: 3rem;
          align-items: flex-start;
        }
        .hero-link {
          color: var(--text);
          font-weight: 600;
        }
        .hero-link:hover { color: var(--purple); }
        .cta-email {
          font-family: var(--font-sans);
          font-weight: 700;
          color: var(--text);
          border-bottom: 2px solid var(--gold);
          padding-bottom: 2px;
          font-size: 1.05rem;
        }
        .cta-email:hover { color: var(--purple); }
        .footer-link:hover { color: var(--text); }
        .project-readmore:hover { text-decoration: underline; }
        @media (max-width: 600px) {
          .site-nav { display: none; }
          .hero-grid {
            flex-direction: column;
            align-items: center;
            text-align: left;
            gap: 1.5rem;
          }
        }
        @media (max-width: 480px) {
          .container-pad { padding: 0 1.25rem !important; }
        }
      `}</style>
      <Header />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Work content={content} />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
