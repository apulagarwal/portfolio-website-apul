CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  "order" integer NOT NULL DEFAULT 0,
  title text NOT NULL,
  outcome text NOT NULL,
  body text,
  tools text,
  live_url text,
  linkedin_url text,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Admin upsert projects" ON public.projects
  FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email') = 'apulagarwal@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'apulagarwal@gmail.com');