-- Authenticated upsert policy on site_content
CREATE POLICY "Authenticated upsert" ON public.site_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

GRANT INSERT, UPDATE ON public.site_content TO authenticated;

-- Storage bucket for headshot (public read)
INSERT INTO storage.buckets (id, name, public)
  VALUES ('site-assets', 'site-assets', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read site-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');

CREATE POLICY "Authenticated write site-assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-assets');

CREATE POLICY "Authenticated update site-assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'site-assets');

CREATE POLICY "Authenticated delete site-assets" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'site-assets');
