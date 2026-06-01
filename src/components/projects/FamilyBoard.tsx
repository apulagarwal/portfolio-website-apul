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

const sectionStyle: React.CSSProperties = {
  marginTop: "4rem",
};

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

const PLAY_URL = "https://indo-american-family-buio.bolt.host";
const LINKEDIN_URL = "https://www.linkedin.com/feed/update/urn:li:activity:7451900707311472640/";

function HeaderLinks() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
      <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" style={headerLinkStyle} className="fb-link">
        ↗ Play the game
      </a>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={headerLinkStyle} className="fb-link">
        ↗ Build story on LinkedIn
      </a>
    </div>
  );
}

export function FamilyBoard() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "2.5rem 2rem 4rem" }}>
      <style>{`
        .fb-link:hover { text-decoration: underline; }
      `}</style>

      <Link to="/" style={headerLinkStyle} className="fb-link">
        ← Back
      </Link>

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
        FamilyBoard — Real-Time Multiplayer Game
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
        Built in 2 days with zero React experience. Live cross-continent multiplayer between Seattle and India. 170 automated tests.
      </p>

      <HeaderLinks />

      <hr style={{ border: "none", borderTop: "1px solid #4b2e83", marginTop: "2rem" }} />

      {/* Section 1 */}
      <section style={{ marginTop: "3rem" }}>
        <SectionLabel>Why I built it</SectionLabel>
        <p style={prose}>
          I wanted to play Monopoly with my son across continents: he is in India, I am in Seattle. No existing app supported the experience I wanted: board on a laptop, controller on a phone, both updating in real time. So I built one. The Indo-American theme was deliberate. Properties are Mumbai, Delhi, Manhattan, Silicon Valley. Railroads are Indian Railways and Amtrak. The board literally represents the distance between us.
        </p>
      </section>

      {/* Stats SVG */}
      <div style={{ marginTop: "2.5rem" }}>
        <svg viewBox="0 0 740 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="100" fill="#ffffff"/>
          <line x1="185" y1="20" x2="185" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="370" y1="20" x2="370" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="555" y1="20" x2="555" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <text x="92" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">170</text>
          <text x="92" y="72" textAnchor="middle" fontSize="11" fill="#888888">automated tests</text>
          <text x="277" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">83+</text>
          <text x="277" y="72" textAnchor="middle" fontSize="11" fill="#888888">build iterations</text>
          <text x="462" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">2</text>
          <text x="462" y="72" textAnchor="middle" fontSize="11" fill="#888888">days to ship</text>
          <text x="647" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">&lt;1s</text>
          <text x="647" y="72" textAnchor="middle" fontSize="11" fill="#888888">sync latency</text>
        </svg>
      </div>

      {/* Section 2 */}
      <section style={sectionStyle}>
        <SectionLabel>What I built</SectionLabel>
        <p style={prose}>
          A fully playable Monopoly-inspired board game with real-time multiplayer sync via Supabase Realtime WebSockets. Jackbox-style architecture: the board displays on a TV or laptop (read-only), players control the game from their phones. Tested simultaneously across 3 devices: MacBook, iPad, Android, and cross-continent between Seattle WiFi and India 4G.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <svg viewBox="0 0 740 320" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
            <rect width="740" height="320" fill="#ffffff"/>
            <text x="370" y="28" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">MULTI-DEVICE ARCHITECTURE</text>
            <rect x="40" y="55" width="150" height="90" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="115" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Board Screen</text>
            <text x="115" y="100" textAnchor="middle" fontSize="10" fill="#555555">TV / Laptop</text>
            <text x="115" y="116" textAnchor="middle" fontSize="9" fill="#888888">Read-only view</text>
            <text x="115" y="132" textAnchor="middle" fontSize="9" fill="#888888">/game/:code</text>
            <rect x="40" y="175" width="150" height="90" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="115" y="202" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Phone Controller</text>
            <text x="115" y="220" textAnchor="middle" fontSize="10" fill="#555555">India · 4G</text>
            <text x="115" y="236" textAnchor="middle" fontSize="9" fill="#888888">Roll dice · Buy · Pay</text>
            <text x="115" y="252" textAnchor="middle" fontSize="9" fill="#888888">/game/:code/play/:id</text>
            <line x1="192" y1="100" x2="278" y2="148" stroke="#4b2e83" strokeWidth="1.5" strokeDasharray="4,3"/>
            <line x1="192" y1="220" x2="278" y2="182" stroke="#4b2e83" strokeWidth="1.5" strokeDasharray="4,3"/>
            <rect x="278" y="120" width="184" height="80" rx="8" fill="#f0ecfa" stroke="#4b2e83" strokeWidth="1.5"/>
            <text x="370" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4b2e83">Supabase Realtime</text>
            <text x="370" y="166" textAnchor="middle" fontSize="10" fill="#4b2e83">WebSocket channel</text>
            <text x="370" y="182" textAnchor="middle" fontSize="9" fill="#4b2e83">game:{"{roomCode}"}</text>
            <line x1="462" y1="160" x2="538" y2="160" stroke="#b7a57a" strokeWidth="1.5"/>
            <polygon points="535,155 545,160 535,165" fill="#b7a57a"/>
            <rect x="545" y="120" width="155" height="80" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="622" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">PostgreSQL</text>
            <text x="622" y="166" textAnchor="middle" fontSize="10" fill="#555555">game_state (JSONB)</text>
            <text x="622" y="182" textAnchor="middle" fontSize="9" fill="#888888">Single source of truth</text>
            <text x="497" y="148" textAnchor="middle" fontSize="9" fill="#888888">persists</text>
            <path d="M370 120 C370 80 115 80 115 55" fill="none" stroke="#4b2e83" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
            <path d="M370 200 C370 270 115 270 115 265" fill="none" stroke="#4b2e83" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
            <text x="220" y="72" textAnchor="middle" fontSize="9" fill="#4b2e83">broadcasts</text>
            <text x="220" y="280" textAnchor="middle" fontSize="9" fill="#4b2e83">broadcasts</text>
            <text x="370" y="308" textAnchor="middle" fontSize="10" fill="#888888">Sub-1-second sync · Seattle WiFi to India 4G</text>
          </svg>
        </div>
      </section>

      {/* Section 3 */}
      <section style={sectionStyle}>
        <SectionLabel>Key engineering decisions</SectionLabel>
        <div style={{ marginTop: "1rem", borderTop: "1px solid #e5e2dc" }}>
          <Collapsible title="Pure functional game engine">
            All Monopoly rules live in gameEngine.ts as pure functions: input in, new state out, no side effects. This made testing trivial (no mocking required), debugging straightforward, and multiplayer sync simple. The UI is a thin layer that calls engine functions and renders state.
          </Collapsible>
          <Collapsible title="Local overlay detection">
            Game event animations needed to show exactly once per event across all devices. Storing overlay state in Supabase caused 20+ replays on WebSocket reconnect. The fix: remove overlay state from Supabase entirely. Each device detects events locally by comparing previous and current GameState using a useRef. One line of fix after 6 hours debugging the wrong layer.
          </Collapsible>
          <Collapsible title="Pending player decisions in Supabase">
            When a player lands on a property, the "Buy or Auction?" modal needs to appear on their phone, not just in local state. All pending decisions are stored in game_state in Supabase. Each device reads its own player ID, detects whether a pending decision belongs to it, and shows the modal only on the right screen.
          </Collapsible>
        </div>
      </section>

      {/* What I learned visual */}
      <div style={{ marginTop: "3rem" }}>
        <svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="260" fill="#ffffff"/>
          <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">WHAT I LEARNED THE HARD WAY</text>
          <rect x="40" y="40" width="310" height="200" rx="8" fill="#fff8f8" stroke="#f0d0d0" strokeWidth="1.5"/>
          <text x="70" y="68" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#cc4444">DIDN'T WORK</text>
          <circle cx="62" cy="96" r="7" fill="#f0d0d0"/><text x="62" y="100" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="94" fontSize="11" fontWeight="600" fill="#333333">Vague AI prompts</text>
          <text x="78" y="110" fontSize="10" fill="#888888">Got spaghetti code fast</text>
          <circle cx="62" cy="136" r="7" fill="#f0d0d0"/><text x="62" y="140" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="134" fontSize="11" fontWeight="600" fill="#333333">Local-first architecture</text>
          <text x="78" y="150" fontSize="10" fill="#888888">Required full multiplayer refactor later</text>
          <circle cx="62" cy="176" r="7" fill="#f0d0d0"/><text x="62" y="180" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="174" fontSize="11" fontWeight="600" fill="#333333">Overlay state in Supabase</text>
          <text x="78" y="190" fontSize="10" fill="#888888">Replayed 20+ times on reconnect</text>
          <circle cx="62" cy="216" r="7" fill="#f0d0d0"/><text x="62" y="220" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="214" fontSize="11" fontWeight="600" fill="#333333">Polish before function</text>
          <text x="78" y="230" fontSize="10" fill="#888888">Hours on UI before multiplayer worked</text>
          <rect x="390" y="40" width="310" height="200" rx="8" fill="#f4faf5" stroke="#c8e6c9" strokeWidth="1.5"/>
          <text x="420" y="68" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#2e7d32">WHAT WORKED</text>
          <circle cx="412" cy="96" r="7" fill="#c8e6c9"/><text x="412" y="100" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="94" fontSize="11" fontWeight="600" fill="#333333">Phase-gated build</text>
          <text x="428" y="110" fontSize="10" fill="#888888">Engine first, UI second, multiplayer third</text>
          <circle cx="412" cy="136" r="7" fill="#c8e6c9"/><text x="412" y="140" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="134" fontSize="11" fontWeight="600" fill="#333333">Tests as specification</text>
          <text x="428" y="150" fontSize="10" fill="#888888">170 tests before writing React UI</text>
          <circle cx="412" cy="176" r="7" fill="#c8e6c9"/><text x="412" y="180" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="174" fontSize="11" fontWeight="600" fill="#333333">Local overlay detection</text>
          <text x="428" y="190" fontSize="10" fill="#888888">Each device detects events independently</text>
          <circle cx="412" cy="216" r="7" fill="#c8e6c9"/><text x="412" y="220" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="214" fontSize="11" fontWeight="600" fill="#333333">Constrained AI prompts</text>
          <text x="428" y="230" fontSize="10" fill="#888888">"Do not touch gameEngine.ts" in every prompt</text>
        </svg>
      </div>

      {/* Section 4 */}
      <section style={sectionStyle}>
        <SectionLabel>What I learned</SectionLabel>
        <p style={prose}>
          Three things that changed how I think about building software. First: pure functions are worth the discipline. Forcing all game logic into functions with no side effects felt restrictive. In practice it made every bug easier to isolate and every feature easier to test. Second: state sync is the hardest problem in multiplayer. The evolution from local state to Supabase polling to Realtime to local overlay detection consumed more time than everything else combined. Third: real devices always surprise you. Testing in browser tabs hid entire classes of bugs: WebSocket reconnection on mobile, touch targets, Safari's WebSocket behavior. Real device testing is not optional.
        </p>
      </section>

      {/* Footer */}
      <div style={{ marginTop: "4rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#888888" }}>
          Tools: React · TypeScript · Supabase Realtime · Tailwind · Vite · Vitest · Framer Motion · Bolt.new
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #e5e2dc", marginTop: "1.5rem" }} />
        <HeaderLinks />
      </div>
    </div>
  );
}