import { createFileRoute, Link } from "@tanstack/react-router";
import { useProjectBySlug } from "@/hooks/useProjects";

export const Route = createFileRoute("/projects/$slug")({
  head: () => ({
    meta: [
      { title: "Project — Apul Agarwal" },
      { name: "description", content: "Project detail page." },
    ],
  }),
  component: ProjectDetail,
  errorComponent: ({ error }) => (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 2rem" }}>
      <p>Couldn't load this project: {error.message}</p>
      <Link to="/" style={{ color: "var(--purple)" }}>← Back</Link>
    </div>
  ),
  notFoundComponent: () => (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 2rem" }}>
      <p>Project not found.</p>
      <Link to="/" style={{ color: "var(--purple)" }}>← Back</Link>
    </div>
  ),
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { project, loading } = useProjectBySlug(slug);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 2rem 4rem" }}>
      <Link
        to="/"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.875rem",
          color: "var(--subtle)",
          display: "inline-block",
          marginBottom: "2rem",
        }}
      >
        ← Back
      </Link>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2.25rem",
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        {loading ? "Loading…" : project?.title ?? slug}
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.75 }}>
        Coming soon.
      </p>
    </div>
  );
}