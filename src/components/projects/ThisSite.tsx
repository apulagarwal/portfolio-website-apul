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
        Designed and shipped in one day. Admin panel with Google SSO, per-field database saves, and photo upload to cloud storage.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
        <a
          href="https://apulagarwal.info"
          target="_blank"
          rel="noopener noreferrer"
          style={headerLinkStyle}
          className="ts-link"
        >
          ↗ Live at apulagarwal.info
        </a>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #4b2e83", marginTop: "2rem" }} />

      {/* Section 1 */}
      <section style={{ marginTop: "3rem" }}>
        <SectionLabel>The problem</SectionLabel>
        <p style={prose}>
          A resume PDF and a LinkedIn profile do not show how I actually work. They flatten projects into one-line bullets and lose the trade-offs, the reasoning, and the things that did not work. I wanted a place where the writing, the structure, and the build itself were all part of the story, and where updating it later would not feel like opening a Webflow file every time.
        </p>
      </section>

      {/* Stats SVG */}
      <div style={{ marginTop: "2.5rem" }}>
        <svg viewBox="0 0 740 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="100" fill="#ffffff"/>
          <line x1="185" y1="20" x2="185" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="370" y1="20" x2="370" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="555" y1="20" x2="555" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <text x="92" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">1</text>
          <text x="92" y="72" textAnchor="middle" fontSize="11" fill="#888888">day to ship</text>
          <text x="277" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">4</text>
          <text x="277" y="72" textAnchor="middle" fontSize="11" fill="#888888">case studies</text>
          <text x="462" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">0</text>
          <text x="462" y="72" textAnchor="middle" fontSize="11" fill="#888888">redeploys to edit copy</text>
          <text x="647" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">1</text>
          <text x="647" y="72" textAnchor="middle" fontSize="11" fill="#888888">authorized admin</text>
        </svg>
      </div>

      {/* Section 2 */}
      <section style={sectionStyle}>
        <SectionLabel>What I built</SectionLabel>
        <p style={prose}>
          A static portfolio with a live editing layer behind it. The public site is a TanStack Start React app styled with Tailwind and rendered from a Supabase Postgres database. The admin panel at /admin uses Google SSO scoped to one allowed email, then exposes per-field inline editing for every project: change a title, save. Change an outcome, save. Upload a new photo, it goes straight to Supabase Storage and the public page picks it up on next render. No CMS, no build step to update copy, no separate writing tool. The site and its editor are one app.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <svg viewBox="0 0 740 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
            <rect width="740" height="240" fill="#ffffff"/>
            <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">SITE + EDITOR AS ONE APP</text>

            <rect x="40" y="50" width="180" height="70" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="130" y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Public site</text>
            <text x="130" y="94" textAnchor="middle" fontSize="9" fill="#555555">React · TanStack Start</text>
            <text x="130" y="108" textAnchor="middle" fontSize="9" fill="#888888">apulagarwal.info</text>

            <rect x="280" y="50" width="180" height="70" rx="8" fill="#f0ecfa" stroke="#4b2e83" strokeWidth="1.5"/>
            <text x="370" y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4b2e83">Supabase</text>
            <text x="370" y="94" textAnchor="middle" fontSize="9" fill="#4b2e83">Postgres + Storage</text>
            <text x="370" y="108" textAnchor="middle" fontSize="9" fill="#4b2e83">projects · photos · RLS</text>

            <rect x="520" y="50" width="180" height="70" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="610" y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Admin panel</text>
            <text x="610" y="94" textAnchor="middle" fontSize="9" fill="#555555">Google SSO · /admin</text>
            <text x="610" y="108" textAnchor="middle" fontSize="9" fill="#888888">Inline per-field saves</text>

            <line x1="220" y1="85" x2="275" y2="85" stroke="#4b2e83" strokeWidth="1.5"/>
            <text x="247" y="80" textAnchor="middle" fontSize="9" fill="#4b2e83">reads</text>
            <line x1="520" y1="85" x2="465" y2="85" stroke="#4b2e83" strokeWidth="1.5"/>
            <text x="492" y="80" textAnchor="middle" fontSize="9" fill="#4b2e83">writes</text>

            <rect x="40" y="160" width="660" height="56" rx="8" fill="#f4faf5" stroke="#c8e6c9" strokeWidth="1.5"/>
            <text x="60" y="184" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#2e7d32">EDITING LOOP</text>
            <text x="60" y="204" fontSize="10" fill="#333333">Sign in with Google → edit a field on /admin → Supabase update → public page reflects it on next visit. No redeploy.</text>
          </svg>
        </div>
      </section>

      {/* Section 3 */}
      <section style={sectionStyle}>
        <SectionLabel>Key engineering decisions</SectionLabel>
        <div style={{ marginTop: "1rem", borderTop: "1px solid #e5e2dc" }}>
          <Collapsible title="Per-field saves, not a form submit">
            Every editable field in /admin saves independently on blur. No "Save changes" button, no dirty-state tracking, no risk of losing a paragraph because the page crashed. The trade-off is more network calls, but each one is a tiny Supabase update and the UX is the same as writing in a document.
          </Collapsible>
          <Collapsible title="Email allowlist instead of a roles table">
            Only one person edits this site. A full user_roles table with RLS policies referencing it would be the right call for a real app, but for a single admin a hardcoded allowed email plus Supabase Auth's Google provider is honest about the scope. RLS on the projects table still requires the authenticated user, so the allowlist is a UX gate, not the security boundary.
          </Collapsible>
          <Collapsible title="Database-driven content, static-feeling site">
            Project copy lives in Postgres, not in MDX files in the repo. That means editing the site does not require a commit or a redeploy, but it also means the public route fetches from Supabase on render. The hit is small (one query per project page) and the win is that I can fix a typo from my phone.
          </Collapsible>
        </div>
      </section>

      {/* Section 4 */}
      <section style={sectionStyle}>
        <SectionLabel>What I learned</SectionLabel>
        <p style={prose}>
          The interesting decision was not which framework to use. It was whether the site should be content-in-code or content-in-database. Content-in-code is faster to ship and version-controlled by default, but every typo becomes a pull request. Content-in-database adds a small fetch on every page but turns editing into something I will actually do. For a portfolio that needs to stay current, the second one wins. The admin panel is not a feature for users. It is a feature for the one person who has to keep this thing alive.
        </p>
      </section>

      {/* Footer */}
      <div style={{ marginTop: "4rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#888888" }}>
          Tools: React · Supabase · Lovable · Tailwind · Google SSO · Namecheap · Claude
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #e5e2dc", marginTop: "1.5rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
          <a
            href="https://apulagarwal.info"
            target="_blank"
            rel="noopener noreferrer"
            style={headerLinkStyle}
            className="ts-link"
          >
            ↗ Visit apulagarwal.info
          </a>
        </div>
      </div>
    </div>
  );
}