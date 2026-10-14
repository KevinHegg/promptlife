export type SourceType =
  | 'official framework'
  | 'official law/regulation'
  | 'official religious/ethical document'
  | 'peer-reviewed paper'
  | 'reputable news report'
  | 'internal source-needed placeholder'

export type SourceReviewStatus = 'reviewed' | 'needs source' | 'intentionally cautious'

export type SourceRegistryEntry = {
  id: string
  title: string
  organization: string
  date: string
  sourceType: SourceType
  relevance: string[]
  caveat: string
  url: string
}

export type LessonSourceReview = {
  status: SourceReviewStatus
  sourceIds: string[]
  caveat: string
}

export const sourceRegistry: SourceRegistryEntry[] = [
  {
    id: 'nist-ai-rmf-1-0',
    title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
    organization: 'National Institute of Standards and Technology',
    date: '2023-01-26',
    sourceType: 'official framework',
    relevance: ['governance', 'AI risks', 'accountability', 'human review'],
    caveat: 'Voluntary risk-management framework, not a law or classroom-specific policy.',
    url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10'
  },
  {
    id: 'nist-genai-profile',
    title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile',
    organization: 'National Institute of Standards and Technology',
    date: '2024-07-26',
    sourceType: 'official framework',
    relevance: ['governance', 'AI risks', 'content provenance', 'incident disclosure'],
    caveat: 'Cross-sector profile for generative AI risk management; implementation still depends on context.',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf'
  },
  {
    id: 'unesco-ai-ethics',
    title: 'Recommendation on the Ethics of Artificial Intelligence',
    organization: 'UNESCO',
    date: '2021-11-23',
    sourceType: 'official framework',
    relevance: ['ethics', 'human dignity', 'governance', 'human rights'],
    caveat: 'Global normative recommendation; local implementation varies by country and institution.',
    url: 'https://www.unesco.org/en/legal-affairs/recommendation-ethics-artificial-intelligence'
  },
  {
    id: 'oecd-ai-principles',
    title: 'OECD AI Principles',
    organization: 'Organisation for Economic Co-operation and Development',
    date: '2019-05',
    sourceType: 'official framework',
    relevance: ['governance', 'AI benefits', 'AI risks', 'human rights'],
    caveat: 'Principles-based guidance; not a source for precise environmental, labor, or copyright statistics.',
    url: 'https://www.oecd.org/en/topics/ai-principles.html'
  },
  {
    id: 'eu-ai-act',
    title: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act)',
    organization: 'European Union',
    date: '2024-06-13',
    sourceType: 'official law/regulation',
    relevance: ['governance', 'AI risks', 'transparency', 'accountability'],
    caveat: 'EU regulation; applicability depends on role, jurisdiction, timing, and system category.',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj'
  },
  {
    id: 'coe-ai-framework-convention',
    title: 'Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law',
    organization: 'Council of Europe',
    date: '2024-05-17',
    sourceType: 'official law/regulation',
    relevance: ['governance', 'human rights', 'democracy', 'rule of law'],
    caveat: 'International treaty framework; obligations depend on ratification and domestic implementation.',
    url: 'https://www.coe.int/en/web/artificial-intelligence/cai'
  },
  {
    id: 'laudato-si',
    title: "Laudato Si': On Care for Our Common Home",
    organization: 'Holy See / Pope Francis',
    date: '2015-05-24',
    sourceType: 'official religious/ethical document',
    relevance: ['environmental footprint', 'human dignity', 'common good', 'technocratic paradigm'],
    caveat: 'Religious and ethical source, not an AI-specific technical report.',
    url: 'https://www.vatican.va/content/francesco/en/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si.html'
  },
  {
    id: 'dignitas-infinita',
    title: 'Dignitas Infinita on Human Dignity',
    organization: 'Dicastery for the Doctrine of the Faith',
    date: '2024-04-02',
    sourceType: 'official religious/ethical document',
    relevance: ['human dignity', 'ethics', 'human-centered AI'],
    caveat: 'Broad dignity document; use for human-dignity framing, not AI mechanism claims.',
    url: 'https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_ddf_doc_20240402_dignitas-infinita_en.html'
  },
  {
    id: 'antiqua-et-nova',
    title: 'Antiqua et nova: Note on the Relationship Between Artificial Intelligence and Human Intelligence',
    organization: 'Dicastery for the Doctrine of the Faith and Dicastery for Culture and Education',
    date: '2025-01-28',
    sourceType: 'official religious/ethical document',
    relevance: ['human dignity', 'human intelligence', 'education', 'AI risks', 'AI benefits'],
    caveat: 'Official Vatican note on AI and human intelligence; not an encyclical.',
    url: 'https://press.vatican.va/content/salastampa/en/bollettino/pubblico/2025/01/28/250128b.html'
  },
  {
    id: 'rome-call-ai-ethics',
    title: 'Rome Call for AI Ethics',
    organization: 'Pontifical Academy for Life',
    date: '2020-02-28',
    sourceType: 'official religious/ethical document',
    relevance: ['ethics', 'education', 'human dignity', 'AI benefits', 'AI risks'],
    caveat: 'Ethics framework and call to commitment; not a source for empirical impact numbers.',
    url: 'https://www.vatican.va/roman_curia/pontifical_academies/acdlife/documents/rc_pont-acd_life_doc_20202228_rome-call-for-ai-ethics_en.pdf'
  },
  {
    id: 'magnifica-humanitas',
    title: 'Magnifica Humanitas on Safeguarding the Human Person in the Time of Artificial Intelligence',
    organization: 'Holy See / Pope Leo XIV',
    date: '2026-05-25',
    sourceType: 'official religious/ethical document',
    relevance: ['human dignity', 'human-centered AI', 'AI risks', 'governance'],
    caveat: 'Officially verified in the Holy See Press Office; keep learner-facing use minimal until curriculum review decides whether to include it.',
    url: 'https://press.vatican.va/content/salastampa/en/bollettino/pubblico/2026/05/25/260525e.html'
  },
  {
    id: 'iea-energy-and-ai',
    title: 'Energy and AI',
    organization: 'International Energy Agency',
    date: '2025-04-10',
    sourceType: 'official framework',
    relevance: ['environmental footprint', 'energy use', 'data center', 'AI benefits'],
    caveat: 'Energy modeling and projections vary by assumptions; avoid universal per-prompt claims.',
    url: 'https://www.iea.org/reports/energy-and-ai/'
  },
  {
    id: 'unu-ai-environmental-cost',
    title: "Environmental Cost of AI's Energy Use: Carbon, Water and Land Footprints",
    organization: 'United Nations University Institute for Water, Environment and Health',
    date: '2026-06-03',
    sourceType: 'official framework',
    relevance: ['environmental footprint', 'energy use', 'water use', 'carbon emissions', 'land use', 'e-waste'],
    caveat: 'New global modeling report; useful for source review, but learner-facing copy should avoid precise numbers unless scoped carefully.',
    url: 'https://unu.edu/inweh/collection/environmental-cost-of-AIs-Enrgy-Use-Carbon-water-and-land-footprints'
  },
  {
    id: 'ap-unu-environment-report',
    title: 'Energy, water use and pollution of AI and data centers rival most countries',
    organization: 'Associated Press',
    date: '2026-06-03',
    sourceType: 'reputable news report',
    relevance: ['environmental footprint', 'energy use', 'water use', 'carbon emissions'],
    caveat: 'Secondary reporting on the UNU-INWEH report; use only to orient, not as the primary source.',
    url: 'https://apnews.com/article/a792f184a9f2833b5388dbae8b41ca95'
  },
  {
    id: 'usco-ai-copyright',
    title: 'Copyright and Artificial Intelligence Initiative',
    organization: 'United States Copyright Office',
    date: '2024-2025',
    sourceType: 'official law/regulation',
    relevance: ['data provenance', 'copyright', 'consent', 'compensation'],
    caveat: 'U.S. copyright policy review; legal conclusions remain jurisdiction- and case-specific.',
    url: 'https://www.copyright.gov/ai/'
  },
  {
    id: 'ilo-genai-jobs-2025',
    title: 'Generative AI and Jobs: A 2025 Update',
    organization: 'International Labour Organization',
    date: '2025-05-20',
    sourceType: 'official framework',
    relevance: ['labor', 'labor disruption', 'deskilling', 'AI benefits'],
    caveat: 'Occupational exposure analysis; does not prove exact outcomes for a particular campus, firm, or profession.',
    url: 'https://www.ilo.org/publications/generative-ai-and-jobs-2025-update'
  },
  {
    id: 'oecd-local-jobs-genai',
    title: 'Job Creation and Local Economic Development 2024: The Geography of Generative AI',
    organization: 'Organisation for Economic Co-operation and Development',
    date: '2024-11-28',
    sourceType: 'official framework',
    relevance: ['labor', 'AI benefits', 'labor disruption', 'governance'],
    caveat: 'Regional labor-market analysis; do not generalize one region or sector to all workers.',
    url: 'https://www.oecd.org/en/publications/job-creation-and-local-economic-development-2024_83325127-en/full-report.html'
  },
  {
    id: 'source-needed-data-provenance',
    title: 'SOURCE NEEDED: data provenance, consent, attribution, licensing, and compensation evidence',
    organization: 'Prompt Life internal review',
    date: '2026-06-05',
    sourceType: 'internal source-needed placeholder',
    relevance: ['data provenance', 'consent', 'compensation', 'copyright'],
    caveat: 'Need current, jurisdiction-aware sources before making stronger learner-facing claims.',
    url: ''
  },
  {
    id: 'source-needed-benefit-evidence',
    title: 'SOURCE NEEDED: task-specific AI benefit evidence',
    organization: 'Prompt Life internal review',
    date: '2026-06-05',
    sourceType: 'internal source-needed placeholder',
    relevance: ['AI benefits', 'accessibility', 'education', 'research support'],
    caveat: 'Need domain-specific evidence before presenting broad benefit claims as demonstrated.',
    url: ''
  },
  {
    id: 'source-needed-deskilling-education',
    title: 'SOURCE NEEDED: deskilling and authentic-learning evidence',
    organization: 'Prompt Life internal review',
    date: '2026-06-05',
    sourceType: 'internal source-needed placeholder',
    relevance: ['deskilling', 'education', 'human-centered AI'],
    caveat: 'Need education and workplace studies before making stronger claims about skill loss.',
    url: ''
  }
]

export const lessonSourceReviews: Record<string, LessonSourceReview> = {
  'collective-intelligence': {
    status: 'intentionally cautious',
    sourceIds: ['usco-ai-copyright', 'source-needed-data-provenance'],
    caveat: 'Keep provenance, consent, transparency, attribution, and compensation language contested rather than legally settled.'
  },
  'costs-we-must-count': {
    status: 'reviewed',
    sourceIds: ['iea-energy-and-ai', 'unu-ai-environmental-cost', 'ap-unu-environment-report'],
    caveat: 'No universal per-prompt statistics; impacts vary by workload, hardware, region, cooling, electricity source, and reporting boundary.'
  },
  'risk-myth': {
    status: 'reviewed',
    sourceIds: ['nist-ai-rmf-1-0', 'nist-genai-profile', 'eu-ai-act'],
    caveat: 'Risk language should stay mechanism-based and avoid implying that model literacy alone solves governance, privacy, or security.'
  },
  'benefits-worth-taking-seriously': {
    status: 'intentionally cautious',
    sourceIds: ['oecd-ai-principles', 'rome-call-ai-ethics', 'source-needed-benefit-evidence'],
    caveat: 'Use evidence tiers; avoid broad utopian claims without task-specific evidence.'
  },
  'human-centered-ai': {
    status: 'reviewed',
    sourceIds: ['unesco-ai-ethics', 'nist-ai-rmf-1-0', 'laudato-si', 'dignitas-infinita', 'antiqua-et-nova', 'rome-call-ai-ethics', 'magnifica-humanitas'],
    caveat: 'Keep the learner-facing card broadly human-centered, not Catholic-only; do not imply models have moral understanding.'
  },
  'better-ai-choice': {
    status: 'intentionally cautious',
    sourceIds: ['nist-genai-profile', 'iea-energy-and-ai', 'eu-ai-act', 'coe-ai-framework-convention', 'ilo-genai-jobs-2025'],
    caveat: 'Mitigations reduce or manage some risks; they do not solve every tradeoff automatically.'
  },
  'effective-prompting-literacy': {
    status: 'reviewed',
    sourceIds: ['nist-genai-profile'],
    caveat: 'Prompting shapes current context; do not present it as durable training or a truth guarantee.'
  },
  'model-literate-synthesis': {
    status: 'intentionally cautious',
    sourceIds: ['nist-ai-rmf-1-0', 'unesco-ai-ethics', 'iea-energy-and-ai', 'ilo-genai-jobs-2025'],
    caveat: 'Synthesis should stay a mental-model summary, not a complete policy framework.'
  }
}

export function getLessonSourceReview(lessonId: string): LessonSourceReview {
  return lessonSourceReviews[lessonId] ?? {
    status: 'intentionally cautious',
    sourceIds: [],
    caveat: 'No v0.16 late-day source review record; use existing mechanics review notes.'
  }
}
