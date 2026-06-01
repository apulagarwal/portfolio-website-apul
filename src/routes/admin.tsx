import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const ALLOWED_EMAIL = "apulagarwal@gmail.com";
const PURPLE = "#4b2e83";

const pageStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "3rem 1.5rem 5rem",
  fontFamily: "var(--font-sans)",
  color: "var(--text)",
};

const h1Style: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: "0.5rem",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.78rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: PURPLE,
  marginBottom: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  border: "1px solid var(--divider)",
  borderRadius: 4,
  background: "#fff",
  color: "var(--text)",
  lineHeight: 1.5,
};

const buttonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.85rem",
  fontWeight: 600,
  background: PURPLE,
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const ghostBtnStyle: React.CSSProperties = {
  ...buttonStyle,
  background: "transparent",
  color: PURPLE,
  border: `1px solid ${PURPLE}`,
};

function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      void handleSession(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      void handleSession(s);
    });
    async function handleSession(s: Session | null) {
      if (s && s.user.email !== ALLOWED_EMAIL) {
        setDenied(true);
        await supabase.auth.signOut();
        setSession(null);
        return;
      }
      setDenied(false);
      setSession(s);
    }
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (session === undefined) {
    return <div style={pageStyle}>Loading…</div>;
  }

  if (!session) {
    return <LoginView denied={denied} />;
  }

  return <Editor session={session} />;
}

function LoginView({ denied }: { denied: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function signInGoogle() {
    setErr(null);
    setBusy(true);
    try {
      const res = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/admin",
      });
      if (res.error) {
        setErr(res.error.message ?? "Google sign-in failed.");
        setBusy(false);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Google sign-in failed.");
      setBusy(false);
    }
  }

  async function signInPassword(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErr(error.message);
    setBusy(false);
  }

  return (
    <div style={pageStyle}>
      <h1 style={h1Style}>Admin</h1>
      <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
        Sign in to edit site content.
      </p>
      {denied && (
        <div
          style={{
            padding: "0.75rem 1rem",
            background: "#fdecec",
            border: "1px solid #d97070",
            color: "#a02020",
            borderRadius: 4,
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Access denied. This account is not authorized.
        </div>
      )}
      <button onClick={signInGoogle} disabled={busy} style={buttonStyle}>
        Sign in with Google
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          margin: "1.75rem 0",
          color: "var(--subtle)",
          fontSize: "0.8rem",
        }}
      >
        <div style={{ flex: 1, borderTop: "1px solid var(--divider)" }} />
        <span>or</span>
        <div style={{ flex: 1, borderTop: "1px solid var(--divider)" }} />
      </div>
      <form onSubmit={signInPassword} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" disabled={busy} style={buttonStyle}>
          Sign in
        </button>
        {err && (
          <div style={{ color: "#a02020", fontSize: "0.85rem" }}>{err}</div>
        )}
      </form>
      <p style={{ color: "var(--subtle)", fontSize: "0.8rem", marginTop: "2rem" }}>
        Only <code>{ALLOWED_EMAIL}</code> may sign in.
      </p>
    </div>
  );
}

type FieldKey =
  | "hero_hook"
  | "hero_subhead"
  | "about_p1"
  | "about_p2"
  | "about_p3"
  | "work_p1"
  | "work_p2"
  | "work_p3"
  | "theme";

function Editor({ session }: { session: Session }) {
  const { content } = useSiteContent();
  const queryClient = useQueryClient();

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div style={pageStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.5rem",
        }}
      >
        <h1 style={h1Style}>Admin</h1>
        <button onClick={signOut} style={ghostBtnStyle}>
          Sign out
        </button>
      </div>
      <p style={{ color: "var(--muted)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
        Signed in as {session.user.email}
      </p>

      <Section title="Hero hook" hint="Single line under your name.">
        <FieldEditor fieldKey="hero_hook" initial={content.hero_hook} type="input" onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>

      <Section title="Hero subhead" hint="2–3 lines under the hero hook.">
        <FieldEditor fieldKey="hero_subhead" initial={content.hero_subhead} type="textarea" rows={3} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>

      <Section title="About — paragraph 1">
        <FieldEditor fieldKey="about_p1" initial={content.about_p1} type="textarea" rows={6} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>
      <Section title="About — paragraph 2">
        <FieldEditor fieldKey="about_p2" initial={content.about_p2} type="textarea" rows={6} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>
      <Section title="About — paragraph 3">
        <FieldEditor fieldKey="about_p3" initial={content.about_p3} type="textarea" rows={6} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>

      <Section title="Work — Block 1 (Senior Research Staff, 2021–2025)">
        <FieldEditor fieldKey="work_p1" initial={content.work_p1} type="textarea" rows={6} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>
      <Section title="Work — Block 2 (Research Staff TPM, 2015–2020)">
        <FieldEditor fieldKey="work_p2" initial={content.work_p2} type="textarea" rows={6} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>
      <Section title="Work — Block 3 (Research Staff SE/Tech Lead, 2008–2015)">
        <FieldEditor fieldKey="work_p3" initial={content.work_p3} type="textarea" rows={6} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>

      <Section title="Photo" hint="JPG, PNG, or WebP. Max 5 MB.">
        <PhotoEditor currentUrl={content.photo_url} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>

      <Section title="Theme" hint="More options coming soon.">
        <ThemeEditor initial={content.theme} onSaved={() => queryClient.invalidateQueries({ queryKey: ["site_content"] })} />
      </Section>
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section
      style={{
        borderTop: "1px solid var(--divider)",
        padding: "1.75rem 0",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.15rem",
          fontWeight: 700,
          marginBottom: hint ? "0.25rem" : "0.75rem",
        }}
      >
        {title}
      </h2>
      {hint && (
        <p style={{ color: "var(--subtle)", fontSize: "0.82rem", marginBottom: "0.75rem" }}>
          {hint}
        </p>
      )}
      {children}
    </section>
  );
}

async function saveField(key: FieldKey | "photo_url", value: string) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
}

function FieldEditor({
  fieldKey,
  initial,
  type,
  rows,
  onSaved,
}: {
  fieldKey: FieldKey;
  initial: string;
  type: "input" | "textarea";
  rows?: number;
  onSaved: () => void;
}) {
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    if (status !== "saved") return;
    const t = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(t);
  }, [status]);

  async function onSave() {
    setStatus("saving");
    setErr(null);
    try {
      await saveField(fieldKey, value);
      setStatus("saved");
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed.");
      setStatus("error");
    }
  }

  return (
    <div>
      {type === "input" ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={inputStyle}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={rows ?? 4}
          style={{ ...inputStyle, fontFamily: "var(--font-sans)", resize: "vertical" }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
        <button
          onClick={onSave}
          disabled={status === "saving" || value === initial}
          style={{ ...buttonStyle, opacity: status === "saving" || value === initial ? 0.5 : 1 }}
        >
          {status === "saving" ? "Saving…" : "Save"}
        </button>
        {status === "saved" && (
          <span style={{ color: PURPLE, fontSize: "0.85rem" }}>Saved.</span>
        )}
        {status === "error" && err && (
          <span style={{ color: "#a02020", fontSize: "0.85rem" }}>{err}</span>
        )}
      </div>
    </div>
  );
}

function PhotoEditor({ currentUrl, onSaved }: { currentUrl: string; onSaved: () => void }) {
  const [status, setStatus] = useState<"idle" | "uploading" | "saved" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status !== "saved") return;
    const t = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(t);
  }, [status]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr(null);
    const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
    if (!ALLOWED.includes(file.type)) {
      setErr("File type must be JPG, PNG, or WebP.");
      setStatus("error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErr("File must be 5 MB or smaller.");
      setStatus("error");
      return;
    }
    setStatus("uploading");
    const ext = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
    const path = `headshot-${Date.now()}.${ext}`;
    const up = await supabase.storage.from("site-assets").upload(path, file, {
      contentType: file.type,
      upsert: true,
    });
    if (up.error) {
      setErr(up.error.message);
      setStatus("error");
      return;
    }
    const { data: pub } = supabase.storage.from("site-assets").getPublicUrl(path);
    try {
      await saveField("photo_url", pub.publicUrl);
      setStatus("saved");
      onSaved();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Save failed.");
      setStatus("error");
    }
    e.target.value = "";
  }

  async function onClear() {
    setStatus("uploading");
    setErr(null);
    try {
      await saveField("photo_url", "");
      setStatus("saved");
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed.");
      setStatus("error");
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "0.75rem" }}>
        {currentUrl ? (
          <img
            src={currentUrl}
            alt="Current headshot"
            style={{ width: 160, height: 200, objectFit: "cover", borderRadius: 6, border: "1px solid var(--divider)" }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: 160,
              height: 200,
              background: "var(--photo-bg)",
              borderRadius: 6,
              border: "1px solid var(--divider)",
            }}
          />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onFile}
        disabled={status === "uploading"}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={status === "uploading"}
          style={buttonStyle}
        >
          {currentUrl ? "Replace photo" : "Upload photo"}
        </button>
        {currentUrl && (
          <button type="button" onClick={onClear} disabled={status === "uploading"} style={ghostBtnStyle}>
            Remove
          </button>
        )}
      </div>
      <div style={{ marginTop: "0.5rem", minHeight: "1.2em" }}>
        {status === "uploading" && <span style={{ color: "var(--subtle)", fontSize: "0.85rem" }}>Uploading…</span>}
        {status === "saved" && <span style={{ color: PURPLE, fontSize: "0.85rem" }}>Saved.</span>}
        {status === "error" && err && <span style={{ color: "#a02020", fontSize: "0.85rem" }}>{err}</span>}
      </div>
    </div>
  );
}

function ThemeEditor({ initial, onSaved }: { initial: string; onSaved: () => void }) {
  const [value, setValue] = useState(initial || "light");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "saved") return;
    const t = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(t);
  }, [status]);

  async function onSave() {
    setStatus("saving");
    setErr(null);
    try {
      await saveField("theme", value);
      setStatus("saved");
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed.");
      setStatus("error");
    }
  }

  return (
    <div>
      <select value={value} onChange={(e) => setValue(e.target.value)} style={inputStyle}>
        <option value="light">Light</option>
      </select>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
        <button
          onClick={onSave}
          disabled={status === "saving" || value === initial}
          style={{ ...buttonStyle, opacity: status === "saving" || value === initial ? 0.5 : 1 }}
        >
          {status === "saving" ? "Saving…" : "Save"}
        </button>
        {status === "saved" && <span style={{ color: PURPLE, fontSize: "0.85rem" }}>Saved.</span>}
        {status === "error" && err && <span style={{ color: "#a02020", fontSize: "0.85rem" }}>{err}</span>}
      </div>
    </div>
  );
}
