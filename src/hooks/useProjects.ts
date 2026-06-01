import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Project = {
  id: string;
  slug: string;
  order: number;
  title: string;
  outcome: string;
  body: string | null;
  tools: string | null;
  live_url: string | null;
  linkedin_url: string | null;
  visible: boolean;
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("visible", true)
        .order("order", { ascending: true });
      if (!cancelled) {
        setProjects((data as Project[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading };
}

export function useProjectBySlug(slug: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (!cancelled) {
        setProject((data as Project) ?? null);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { project, loading };
}