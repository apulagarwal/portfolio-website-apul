// Static per-project link registry, keyed by project slug.
// The projects table has no github_url/demo_url columns, so links live here
// in code. A DB row's live_url, when present, takes precedence over `demo`.
export type ProjectLinks = {
  github?: string;
  demo?: string;
};

const LINKS: Record<string, ProjectLinks> = {
  familyboard: {
    github: "https://github.com/apulagarwal/boardbridge",
    demo: "https://boardbridge.bolt.host",
  },
  "resume-tailoring": {
    github: "https://github.com/apulagarwal/resume-ops",
  },
  "claude-skills": {
    github: "https://github.com/apulagarwal/resume-ops/tree/main/skills",
  },
  "this-site": {
    github: "https://github.com/apulagarwal/portfolio-website-apul",
  },
};

export function getProjectLinks(slug: string, liveUrl?: string | null): ProjectLinks {
  const base = LINKS[slug] ?? {};
  return { ...base, demo: liveUrl || base.demo };
}
