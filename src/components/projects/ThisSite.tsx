import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";

const headerLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.875rem",
  color: "#555555",
  textDecoration: "none",
};

const prose: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  lineHeight: 1.75,
  color: "#333333",
  marginTop: "1rem",
};

const sectionStyle: React.CSSProperties = { marginTop: "4rem" };

const SITE_URL = "https://apulagarwal.info";

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e2dc" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
          border: "none",
          padding: "1rem 0",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#111111",
          textAlign: "left",
        }}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span style={{ color: "#888888", fontWeight: 400, fontSize: "1.25rem", lineHeight: 1 }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "#555555",
            paddingTop: "0.25rem",
            paddingBottom: "1.25rem",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function SiteLink({ label }: { label: string }) {
  return (
    <a
      href={SITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={headerLinkStyle}
      className="ts-link"
    >
      {label}
    </a>
  );
}

export function ThisSite() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "2.5rem 2rem 4rem" }}>
      <style>{`.ts-link:hover { text-decoration: underline; }`}</style>

      <Link to="/" style={headerLinkStyle} className="ts-link">← Back</Link>

      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2rem",
          fontWeight: 700,
          color: "#111111",
          lineHeight: 1.2,
          marginTop: "1.5rem",
        }}
      >
        apulagarwal.info — This Site
      </h1>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9rem",
          color: "#555555",
          fontStyle: "italic",
          marginTop: "0.75rem",
          lineHeight: 1.6,
        }}
      >
        Designed and shipped in one day. Admin panel with Google SSO, per-field Supabase saves, and photo upload to cloud storage.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
        <SiteLink label="↗ View the site" />
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #4b2e83", marginTop: "2rem" }} />

      {/* Section 1 */}
      <section style={{ marginTop: "3rem" }}>
        <SectionLabel>Why I built it</SectionLabel>
        <p style={prose}>
          A job search portfolio site has one job: make a recruiter spending 30 seconds feel that this person has done serious work at serious scale. Most portfolio sites fail this because they lead with a job title or a skills list. This one leads with an outcome, "I build systems that work at scale," and backs it up with specific programs, dollar amounts, and team sizes in the prose below. The design is deliberately calm: white background, Georgia serif headlines, UW brand colors used structurally, zero animations. The goal was a site that feels like a well-set faculty page, not a startup landing page.
        </p>
      </section>

      {/* Stats Strip */}
      <div style={{ marginTop: "2.5rem" }}>
        <svg viewBox="0 0 740 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="100" fill="#ffffff"/>
          <line x1="185" y1="20" x2="185" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="370" y1="20" x2="370" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="555" y1="20" x2="555" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <text x="92" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">1</text>
          <text x="92" y="72" textAnchor="middle" fontSize="11" fill="#888888">day to ship</text>
          <text x="277" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">3</text>
          <text x="277" y="72" textAnchor="middle" fontSize="11" fill="#888888">build phases</text>
          <text x="462" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">0</text>
          <text x="462" y="72" textAnchor="middle" fontSize="11" fill="#888888">external fonts loaded</text>
          <text x="647" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">∞</text>
          <text x="647" y="72" textAnchor="middle" fontSize="11" fill="#888888">edits without redeploying</text>
        </svg>
      </div>

      {/* Section 2 */}
      <section style={sectionStyle}>
        <SectionLabel>What I built</SectionLabel>
        <p style={prose}>
          A three-phase build. Phase 1: the full public site, Hero, About, Work, Projects, Education, Contact, built in Lovable (React + Tailwind) from a detailed design spec covering every color value, typography rule, and layout constraint. Phase 2: Supabase backend, all editable content (bio paragraphs, work blocks, project data, headshot URL) moved into a Supabase database with public read access and hardcoded fallbacks. The site reads from the database on load; if the database is unreachable, it falls back gracefully. Phase 3: protected admin panel at /admin, Google SSO locked to a single Gmail account, per-field saves, and photo upload to Supabase Storage. Content changes go live on the next page reload with no redeployment.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <svg viewBox="0 0 740 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
            <rect width="740" height="280" fill="#ffffff"/>
            <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">SITE ARCHITECTURE</text>
            <rect x="40" y="40" width="200" height="180" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="140" y="64" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#888888">PUBLIC SITE</text>
            <text x="140" y="86" textAnchor="middle" fontSize="10" fill="#111111" fontWeight="600">apulagarwal.info</text>
            <line x1="60" y1="94" x2="220" y2="94" stroke="#e5e2dc" strokeWidth="1"/>
            <text x="140" y="112" textAnchor="middle" fontSize="9" fill="#555555">Hero · About · Work</text>
            <text x="140" y="128" textAnchor="middle" fontSize="9" fill="#555555">Projects · Education · Contact</text>
            <text x="140" y="148" textAnchor="middle" fontSize="9" fill="#888888">React · Tailwind · Georgia serif</text>
            <text x="140" y="164" textAnchor="middle" fontSize="9" fill="#888888">Zero animations · No dark bg</text>
            <text x="140" y="184" textAnchor="middle" fontSize="9" fill="#888888">System fonts only</text>
            <text x="140" y="200" textAnchor="middle" fontSize="9" fill="#888888">Mobile responsive</text>
            <line x1="240" y1="130" x2="288" y2="130" stroke="#4b2e83" strokeWidth="1.5" strokeDasharray="4,3"/>
            <text x="264" y="122" textAnchor="middle" fontSize="8" fill="#4b2e83">reads</text>
            <rect x="290" y="80" width="160" height="120" rx="8" fill="#f0ecfa" stroke="#4b2e83" strokeWidth="1.5"/>
            <text x="370" y="104" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#4b2e83">SUPABASE</text>
            <line x1="305" y1="112" x2="435" y2="112" stroke="#4b2e83" strokeWidth="0.5" opacity="0.4"/>
            <text x="370" y="128" textAnchor="middle" fontSize="9" fill="#4b2e83">site_content table</text>
            <text x="370" y="144" textAnchor="middle" fontSize="9" fill="#4b2e83">projects table</text>
            <text x="370" y="160" textAnchor="middle" fontSize="9" fill="#4b2e83">Storage (headshot)</text>
            <text x="370" y="176" textAnchor="middle" fontSize="9" fill="#4b2e83">Auth (Google SSO)</text>
            <line x1="450" y1="130" x2="498" y2="130" stroke="#b7a57a" strokeWidth="1.5" strokeDasharray="4,3"/>
            <text x="474" y="122" textAnchor="middle" fontSize="8" fill="#b7a57a">writes</text>
            <rect x="500" y="80" width="200" height="120" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="600" y="104" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#888888">ADMIN PANEL</text>
            <line x1="515" y1="112" x2="685" y2="112" stroke="#e5e2dc" strokeWidth="1"/>
            <text x="600" y="128" textAnchor="middle" fontSize="9" fill="#555555">apulagarwal.info/admin</text>
            <text x="600" y="144" textAnchor="middle" fontSize="9" fill="#888888">Google SSO · locked to</text>
            <text x="600" y="158" textAnchor="middle" fontSize="9" fill="#888888">apulagarwal@gmail.com</text>
            <text x="600" y="174" textAnchor="middle" fontSize="9" fill="#888888">Per-field saves · photo upload</text>
            <rect x="200" y="248" width="340" height="24" rx="6" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1"/>
            <text x="370" y="264" textAnchor="middle" fontSize="9" fill="#555555">Namecheap DNS → GitHub Pages hosting · Built in one day</text>
          </svg>
        </div>
      </section>

      {/* Section 3 */}
      <section style={sectionStyle}>
        <SectionLabel>Why phases</SectionLabel>
        <p style={prose}>
          Lovable runs on a credit system: one large vague prompt burns credits and produces worse results than several focused ones. More importantly, each phase had a clear gate before the next began. The static site had to look right before touching Supabase. Supabase fallbacks had to work before building the admin panel. The admin panel had to be secure before pointing the live domain at it. If any phase failed, the previous working state was the fallback. Nothing cascades. It is the same instinct as building a game engine before writing any UI: prove the foundation before building on it.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <svg viewBox="0 0 740 320" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
            <rect width="740" height="320" fill="#ffffff"/>
            <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">PHASED BUILD — EACH LAYER DEPENDS ON THE PREVIOUS</text>
            <rect x="40" y="40" width="660" height="52" rx="8" fill="#f0ecfa" stroke="#4b2e83" strokeWidth="1.5"/>
            <text x="80" y="62" fontSize="10" fontWeight="700" letterSpacing="1" fill="#4b2e83">PHASE 0 — SPEC FIRST</text>
            <text x="80" y="80" fontSize="9" fill="#4b2e83">DEFINE.prompt.md · DESIGN.md · CONTENT.md — every decision written down before Lovable opened</text>
            <text x="670" y="71" textAnchor="middle" fontSize="9" fill="#4b2e83">0 credits</text>
            <line x1="370" y1="92" x2="370" y2="108" stroke="#e5e2dc" strokeWidth="1.5"/>
            <polygon points="365,106 375,106 370,112" fill="#e5e2dc"/>
            <rect x="40" y="112" width="660" height="52" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="80" y="134" fontSize="10" fontWeight="700" letterSpacing="1" fill="#111111">PHASE 1 — STATIC SITE</text>
            <text x="80" y="152" fontSize="9" fill="#555555">Full public site from CONTENT.md · No backend · Mobile responsive · OG tags · Verify looks right</text>
            <rect x="620" y="122" width="68" height="22" rx="4" fill="#f0ecfa"/>
            <text x="654" y="137" textAnchor="middle" fontSize="9" fill="#4b2e83">Gate: live ✓</text>
            <line x1="370" y1="164" x2="370" y2="180" stroke="#e5e2dc" strokeWidth="1.5"/>
            <polygon points="365,178 375,178 370,184" fill="#e5e2dc"/>
            <rect x="40" y="184" width="660" height="52" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="80" y="206" fontSize="10" fontWeight="700" letterSpacing="1" fill="#111111">PHASE 2 — SUPABASE BACKEND</text>
            <text x="80" y="224" fontSize="9" fill="#555555">site_content table · public SELECT · hardcoded fallbacks · site reads from DB on load</text>
            <rect x="600" y="194" width="88" height="22" rx="4" fill="#f0ecfa"/>
            <text x="644" y="209" textAnchor="middle" fontSize="9" fill="#4b2e83">Gate: fallback ✓</text>
            <line x1="370" y1="236" x2="370" y2="252" stroke="#e5e2dc" strokeWidth="1.5"/>
            <polygon points="365,250 375,250 370,256" fill="#e5e2dc"/>
            <rect x="40" y="256" width="660" height="52" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="80" y="278" fontSize="10" fontWeight="700" letterSpacing="1" fill="#111111">PHASE 3 — ADMIN PANEL + DEPLOY</text>
            <text x="80" y="296" fontSize="9" fill="#555555">/admin · Google SSO + password fallback · per-field saves · photo upload · Namecheap DNS → live</text>
            <rect x="604" y="266" width="84" height="22" rx="4" fill="#f4faf5" stroke="#c8e6c9" strokeWidth="1"/>
            <text x="646" y="281" textAnchor="middle" fontSize="9" fill="#2e7d32">Shipped ✓</text>
          </svg>
        </div>
      </section>

      {/* Section 4 — Key Engineering Decisions */}
      <section style={sectionStyle}>
        <SectionLabel>Key engineering decisions</SectionLabel>
        <div style={{ marginTop: "1rem", borderTop: "1px solid #e5e2dc" }}>
          <Collapsible title="Content in Supabase, not in code">
            Every piece of editable text, hero hook, about paragraphs, work blocks, project data, lives in Supabase, not hardcoded in React components. This means copy changes go live on the next page reload with no Git commit and no redeployment. The site also ships with hardcoded fallbacks for every field, so a Supabase outage never takes the site down.
          </Collapsible>
          <Collapsible title="Design tokens locked before building">
            Before writing a line of code, every visual decision was committed to a DESIGN.md file: exact hex values, font stacks, size scales, spacing rules, what gold is allowed on, what purple is allowed on, what is forbidden entirely. This file was passed to Lovable as project knowledge. Every session started from that baseline. The result: no visual drift across build sessions, no re-debating color decisions.
          </Collapsible>
          <Collapsible title="Admin auth: Google SSO + password fallback">
            The admin panel uses Supabase Auth with Google SSO locked to a single Gmail account. A username/password fallback was added from day one, not deferred, because Google OAuth occasionally has outages. Both methods were required to be working before the admin panel was considered done. Unauthenticated requests to /admin return 401, never a blank page.
          </Collapsible>
        </div>
      </section>

      {/* Design Decisions Visual */}
      <div style={{ marginTop: "3rem" }}>
        <svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="260" fill="#ffffff"/>
          <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">KEY DESIGN DECISIONS</text>
          <rect x="40" y="40" width="310" height="200" rx="8" fill="#f0ecfa" stroke="#4b2e83" strokeWidth="1.5"/>
          <text x="70" y="68" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#4b2e83">WHAT WE CHOSE</text>
          <circle cx="62" cy="96" r="7" fill="#4b2e83"/><text x="62" y="100" textAnchor="middle" fontSize="9" fill="#ffffff">✓</text>
          <text x="78" y="94" fontSize="11" fontWeight="600" fill="#333333">Georgia serif, no web fonts</text>
          <text x="78" y="110" fontSize="10" fill="#888888">Zero load cost, academic credibility</text>
          <circle cx="62" cy="136" r="7" fill="#4b2e83"/><text x="62" y="140" textAnchor="middle" fontSize="9" fill="#ffffff">✓</text>
          <text x="78" y="134" fontSize="11" fontWeight="600" fill="#333333">Supabase for all editable content</text>
          <text x="78" y="150" fontSize="10" fill="#888888">Update copy without redeploying</text>
          <circle cx="62" cy="176" r="7" fill="#4b2e83"/><text x="62" y="180" textAnchor="middle" fontSize="9" fill="#ffffff">✓</text>
          <text x="78" y="174" fontSize="11" fontWeight="600" fill="#333333">UW gold on name only</text>
          <text x="78" y="190" fontSize="10" fill="#888888">Color used structurally, never decoratively</text>
          <circle cx="62" cy="216" r="7" fill="#4b2e83"/><text x="62" y="220" textAnchor="middle" fontSize="9" fill="#ffffff">✓</text>
          <text x="78" y="214" fontSize="11" fontWeight="600" fill="#333333">Zero animations</text>
          <text x="78" y="230" fontSize="10" fill="#888888">Content does the work, not motion</text>
          <rect x="390" y="40" width="310" height="200" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
          <text x="420" y="68" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#888888">WHAT WE REJECTED</text>
          <circle cx="412" cy="96" r="7" fill="#e5e2dc"/><text x="412" y="100" textAnchor="middle" fontSize="10" fill="#888888">✕</text>
          <text x="428" y="94" fontSize="11" fontWeight="600" fill="#333333">Dark navy/cyan palette</text>
          <text x="428" y="110" fontSize="10" fill="#888888">That's Website, opposite aesthetic</text>
          <circle cx="412" cy="136" r="7" fill="#e5e2dc"/><text x="412" y="140" textAnchor="middle" fontSize="10" fill="#888888">✕</text>
          <text x="428" y="134" fontSize="11" fontWeight="600" fill="#333333">Scroll animations</text>
          <text x="428" y="150" fontSize="10" fill="#888888">Calm and credible, not startup landing page</text>
          <circle cx="412" cy="176" r="7" fill="#e5e2dc"/><text x="412" y="180" textAnchor="middle" fontSize="10" fill="#888888">✕</text>
          <text x="428" y="174" fontSize="11" fontWeight="600" fill="#333333">Skills bars and percentage meters</text>
          <text x="428" y="190" fontSize="10" fill="#888888">Meaningless on a senior TPM resume</text>
          <circle cx="412" cy="216" r="7" fill="#e5e2dc"/><text x="412" y="220" textAnchor="middle" fontSize="10" fill="#888888">✕</text>
          <text x="428" y="214" fontSize="11" fontWeight="600" fill="#333333">ClimeCo in Projects</text>
          <text x="428" y="230" fontSize="10" fill="#888888">NDA-signed work, removed entirely</text>
        </svg>
      </div>

      {/* Section 4 */}
      <section style={sectionStyle}>
        <SectionLabel>What I learned</SectionLabel>
        <p style={prose}>
          Three things. First: a design spec written before building is worth more than any amount of post-hoc cleanup. Locking every color value, font size, and spacing rule into DESIGN.md before touching Lovable meant every session started from the same baseline. No visual drift, no re-debating decisions. Second: content in a database, not in code, changes how fast you can iterate. Updating the About section or adding a project takes 30 seconds from the admin panel. Without Supabase it would require a Git commit, a deploy, and a 2-minute wait. Third: auth fallbacks are not optional. Google OAuth has outages. Building the password fallback on day one, not deferring it, meant the admin panel was always accessible regardless of Google's status.
        </p>
      </section>

      {/* Section 5 */}
      <section style={sectionStyle}>
        <SectionLabel>Postscript: surviving a hosting outage</SectionLabel>
        <p style={prose}>
          In July 2026 the original hosting pipeline failed: every publish reported success while the edge kept serving a broken build, and the site went down. Because the architecture kept content in Supabase and the code in Git, recovery did not require rebuilding anything. The site was rebuilt as a static bundle straight from the repository, deployed to GitHub Pages through a GitHub Actions workflow, and the Namecheap DNS was repointed. Total downtime was a few hours; the admin panel and all content came back untouched. The lesson matched the build philosophy: owning the code, the content, and the domain separately means no single vendor failure can take the site down for long.
        </p>
      </section>

      {/* Footer */}
      <div style={{ marginTop: "4rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#888888" }}>
          Tools: React · Supabase · Lovable · Tailwind · Google SSO · GitHub Pages · GitHub Actions · Namecheap
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #e5e2dc", marginTop: "1.5rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
          <SiteLink label="↗ View the site" />
        </div>
      </div>
    </div>
  );
}