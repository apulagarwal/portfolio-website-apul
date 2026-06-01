create table public.site_content (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text not null,
  updated_at timestamptz default now()
);

grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;

alter table public.site_content enable row level security;

create policy "Public read" on public.site_content
  for select using (true);

insert into public.site_content (key, value) values
  ('hero_hook', 'I build systems that work at scale.'),
  ('hero_subhead', 'Defense software TPM turned UW Foster MBA. 15+ years of hardware-software integration, now looking for the next hard problem.'),
  ('about_p1', 'I spent 15+ years at Bharat Electronics Limited, India''s leading government-owned defense electronics company, building and shipping software for systems where the stakes were real: perimeter surveillance networks deployed across multiple air force bases, naval airbase command systems across 6 airbases, and a railway collision-prevention platform that had to pass national safety certification before a single train ran on it.'),
  ('about_p2', 'The job was never just coordination. I negotiated system architecture and module design with engineering teams, acted as the voice of the customer when translating operator needs into technical requirements, and got hands-on when it mattered: writing deployment scripts, doing field configuration across bases, and working alongside resident engineers when systems needed to work under live conditions. That range, from architecture discussions to on-site deployment, across programs spanning $11M pilots to $147M national rollouts, under government program constraints with no margin for a bad release, is what shaped how I think about delivery. Along the way, the team also filed an Indian patent for an adaptive threat scoring method developed during the IPSS perimeter surveillance program.'),
  ('about_p3', 'Most TPMs in US tech have never deployed software to a field site, managed a vendor across 23 locations simultaneously, or owned a release where a failure had physical consequences. That gap is what I fill. I''m completing my Executive MBA at UW Foster School of Business (June 2026) and actively looking for senior TPM or PM (Technical) roles where engineering rigor and program-scale delivery both matter. If that describes a problem you''re working on, I''d like to hear about it.'),
  ('photo_url', ''),
  ('theme', 'light');