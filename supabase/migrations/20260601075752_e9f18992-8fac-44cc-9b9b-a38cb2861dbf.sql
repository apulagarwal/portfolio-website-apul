-- Replace permissive policies with email-scoped ones
DROP POLICY IF EXISTS "Authenticated upsert" ON public.site_content;
CREATE POLICY "Admin upsert site_content" ON public.site_content
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'apulagarwal@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'apulagarwal@gmail.com');

DROP POLICY IF EXISTS "Authenticated write site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete site-assets" ON storage.objects;

CREATE POLICY "Admin write site-assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND (auth.jwt() ->> 'email') = 'apulagarwal@gmail.com');

CREATE POLICY "Admin update site-assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'site-assets' AND (auth.jwt() ->> 'email') = 'apulagarwal@gmail.com');

CREATE POLICY "Admin delete site-assets" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'site-assets' AND (auth.jwt() ->> 'email') = 'apulagarwal@gmail.com');
