import { createFileRoute, Link } from "@tanstack/react-router";
import { useProjectBySlug } from "@/hooks/useProjects";
import { FamilyBoard } from "@/components/projects/FamilyBoard";
import { Quiver } from "@/components/projects/Quiver";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    if (params?.slug === "familyboard") {
      return {
        meta: [
          { title: "FamilyBoard — Real-Time Multiplayer Game · Apul Agarwal" },
          { name: "description", content: "Built in 2 days with zero React experience. Live cross-continent multiplayer between Seattle and India. 170 automated tests." },
        ],
      };
    }
    if (params?.slug === "quiver") {
      return {
        meta: [
          { title: "Quiver — Automated Job Search Pipeline · Apul Agarwal" },
          { name: "description", content: "103 TPM/PM jobs scraped in 4.1 minutes on first run. 32 with fewer than 50 applicants. Runs every morning at 7am." },
        ],
      };
    }
    return {
      meta: [
        { title: "Project — Apul Agarwal" },
        { name: "description", content: "Project detail page." },
      ],
    };
  },
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

  if (slug === "familyboard") {
    return <FamilyBoard />;
  }
  if (slug === "quiver") {
    return <Quiver />;
  }

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