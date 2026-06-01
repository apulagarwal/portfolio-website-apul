import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Phase 1 hardcoded copy. The hook returns this synchronously on first render
// (via TanStack Query `initialData`) and silently keeps it on any fetch error,
// so the public site never shows a loading flash or a broken state.
export const FALLBACK = {
  hero_hook: "I build systems that work at scale.",
  hero_subhead:
    "Defense software TPM turned UW Foster MBA. 15+ years of hardware-software integration, now looking for the next hard problem.",
  about_p1:
    "I spent 15+ years at Bharat Electronics Limited, India's leading government-owned defense electronics company, building and shipping software for systems where the stakes were real: perimeter surveillance networks deployed across multiple air force bases, naval airbase command systems across 6 airbases, and a railway collision-prevention platform that had to pass national safety certification before a single train ran on it.",
  about_p2:
    "The job was never just coordination. I negotiated system architecture and module design with engineering teams, acted as the voice of the customer when translating operator needs into technical requirements, and got hands-on when it mattered: writing deployment scripts, doing field configuration across bases, and working alongside resident engineers when systems needed to work under live conditions. That range, from architecture discussions to on-site deployment, across programs spanning $11M pilots to $147M national rollouts, under government program constraints with no margin for a bad release, is what shaped how I think about delivery. Along the way, the team also filed an Indian patent for an adaptive threat scoring method developed during the IPSS perimeter surveillance program.",
  about_p3:
    "Most TPMs in US tech have never deployed software to a field site, managed a vendor across 23 locations simultaneously, or owned a release where a failure had physical consequences. That gap is what I fill. I'm completing my Executive MBA at UW Foster School of Business (June 2026) and actively looking for senior TPM or PM (Technical) roles where engineering rigor and program-scale delivery both matter. If that describes a problem you're working on, I'd like to hear about it.",
  work_p1:
    "I managed software program delivery for the $75M NAISS program, coordinating across 10 cross-functional teams and 10 or more vendor partners as the team delivered across 6 naval airbases. I also led the QA effort for KAVACH, a railway protection system that was a new vertical for BEL with no prior operational model. Working with the team, we restructured the validation process from a 2-month cycle into a 15-day continuous feedback loop, achieving certification readiness 40% faster than the industry benchmark.",
  work_p2:
    "I managed software program delivery for the $147M IPSS program, a 5-sensor-layer autonomous intrusion detection platform the team deployed across 23 Indian Air Force bases. My role was coordinating 12 cross-functional teams and 6 to 7 vendor partners, managing stage-gate milestones, and working with the field teams to establish the reference configurations and deployment playbooks that made it possible to run 5 sites in parallel.",
  work_p3:
    "Earlier in my career I was part of small engineering teams building software across four programs: the Integrated Coastal Surveillance System for the Indian Coast Guard and three export countries, the Battlefield Surveillance System for the Indian Army, Combat Management Systems for Indian Navy warships, and the National Maritime Domain Awareness system spanning 50 or more coastal radar stations. Small teams, complex integrations: it's where I learned what good software delivery actually requires before I moved into managing it.",
  photo_url: "",
  theme: "light",
};

export type SiteContent = typeof FALLBACK;

async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");
    if (error || !data) return FALLBACK;
    const rows = data.reduce<Record<string, string>>((acc, row) => {
      if (row.key && typeof row.value === "string") acc[row.key] = row.value;
      return acc;
    }, {});
    // Per-field fallback: any missing key falls back to the Phase 1 copy.
    return { ...FALLBACK, ...rows };
  } catch {
    return FALLBACK;
  }
}

export function useSiteContent() {
  const { data: content } = useQuery({
    queryKey: ["site_content"],
    queryFn: fetchSiteContent,
    initialData: FALLBACK,
    staleTime: 60_000,
  });
  return { content };
}