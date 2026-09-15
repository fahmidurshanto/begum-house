export interface Division {
  id: string;
  title: string;
  tagline: string;
  floor: "upper" | "ground";
  position: "upper-1" | "upper-2" | "upper-3" | "upper-4" | "ground-left" | "ground-right";
  iconName: string;
  description: string;
  highlights: string[];
  keyStats: { label: string; value: string }[];
  leadContact: string;
}

export const DIVISIONS: Division[] = [
  {
    id: "shared-services",
    title: "Shared Services & Global Delivery",
    tagline: "A Brighter Tomorrow. Built Together.",
    floor: "ground",
    position: "ground-left",
    iconName: "Globe",
    description:
      "Centralized operational glass pod delivering streamlined enterprise processes, cross-border workforce scaling, and global delivery platforms.",
    highlights: [
      "Global Business Services (GBS) Integration",
      "Process Automation & Standardization",
      "Cross-Border Delivery Pods",
      "Multi-Center Operations Scaling",
    ],
    keyStats: [
      { label: "Cost Reduction", value: "35% Avg" },
      { label: "Global Hubs", value: "6 Locations" },
    ],
    leadContact: "delivery@begumhouse.co.uk",
  },
  {
    id: "finance-operations",
    title: "Finance Operations & Transformation",
    tagline: "Fiscal Precision, Asset Management & Wealth Advisory",
    floor: "upper",
    position: "upper-1",
    iconName: "TrendingUp",
    description:
      "Tailored private wealth architecture, institutional capital advisory, and cross-border M&A strategy.",
    highlights: [
      "Institutional Capital Advisory",
      "Private Family Office Structuring",
      "Cross-Border Liquidity Risk",
      "Sustainable ESG Investment",
    ],
    keyStats: [
      { label: "Capital Deployed", value: "£2.4B+" },
      { label: "Jurisdictions", value: "18+" },
    ],
    leadContact: "finance@begumhouse.co.uk",
  },
  {
    id: "technology-ai",
    title: "Technology, AI & Web Development",
    tagline: "Next-Gen AI Systems, Custom Software & Cloud Engineering",
    floor: "upper",
    position: "upper-2",
    iconName: "Compass",
    description:
      "Engineering cutting-edge AI enterprise systems, custom web applications, cloud infrastructure, and automated intelligence feeds.",
    highlights: [
      "Enterprise AI & LLM Integration",
      "Custom Full-Stack Web Apps",
      "Cybersecurity & Cloud Systems",
      "Automated Workflow Architecture",
    ],
    keyStats: [
      { label: "Systems Deployed", value: "140+" },
      { label: "Uptime Guarantee", value: "99.99%" },
    ],
    leadContact: "tech@begumhouse.co.uk",
  },
  {
    id: "architecture-design",
    title: "Architecture & Design",
    tagline: "Neoclassical Reverence Meets Contemporary Engineering",
    floor: "ground",
    position: "ground-right",
    iconName: "Compass",
    description:
      "Synthesizing architectural heritage with modern bioclimatic engineering to design iconic private estates and headquarters.",
    highlights: [
      "Historic Heritage Restoration",
      "Smart-Building Net-Zero Design",
      "Masterplanning & Mixed-Use Enclaves",
      "Classical Interior Craftsmanship",
    ],
    keyStats: [
      { label: "Architectural Awards", value: "32" },
      { label: "LEED Platinum Projects", value: "14" },
    ],
    leadContact: "architecture@begumhouse.co.uk",
  },
  {
    id: "mental-health",
    title: "Mental Health & Counselling",
    tagline: "Executive Wellbeing, Resilience & Psychological Health",
    floor: "upper",
    position: "upper-3",
    iconName: "HeartHandshake",
    description:
      "Empowering executives, founders, and families with bespoke mental health guidance, clinical confidentiality, and cognitive resilience.",
    highlights: [
      "C-Suite Stress & Resilience Coaching",
      "Family Enterprise Mediation",
      "Confidential Clinical Therapy",
      "Holistic Wellbeing Frameworks",
    ],
    keyStats: [
      { label: "Leaders Supported", value: "850+" },
      { label: "Satisfaction Rate", value: "99.4%" },
    ],
    leadContact: "wellbeing@begumhouse.co.uk",
  },
  {
    id: "business-advisory",
    title: "Business Advisory & Support",
    tagline: "Strategic Growth, Turnaround Strategy & Governance",
    floor: "upper",
    position: "upper-4",
    iconName: "Handshake",
    description:
      "Guiding enterprises through complex market entries, structural reorganizations, sovereign compliance, and board advisory.",
    highlights: [
      "Corporate Restructuring & Governance",
      "Market Expansion Strategy",
      "Regulatory & Sovereign Compliance",
      "Executive Board Advisory",
    ],
    keyStats: [
      { label: "Enterprises Advised", value: "320+" },
      { label: "Success Rate", value: "98%" },
    ],
    leadContact: "advisory@begumhouse.co.uk",
  },
  {
    id: "education-training",
    title: "Education & Training",
    tagline: "Executive Leadership Academies & Capability Building",
    floor: "ground",
    position: "ground-right",
    iconName: "Shield",
    description:
      "Designing elite leadership programs, vocational training academies, and specialized corporate upskilling frameworks.",
    highlights: [
      "C-Suite Leadership Academies",
      "Specialized Industry Upskilling",
      "Global Institutional Partnerships",
      "Digital Learning Ecosystems",
    ],
    keyStats: [
      { label: "Professionals Trained", value: "25,000+" },
      { label: "Global Academies", value: "12" },
    ],
    leadContact: "education@begumhouse.co.uk",
  },
];

export interface ValuePillar {
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
}

export const VALUE_PILLARS: ValuePillar[] = [
  {
    title: "PEOPLE",
    subtitle: "Expertise & Experience",
    iconName: "Users",
    description: "Industry veterans, world-class specialists, and dedicated sector leaders driving superior outcomes.",
  },
  {
    title: "PROCESS",
    subtitle: "Efficiency & Structure",
    iconName: "Cog",
    description: "Battle-tested governance models, seamless delivery cycles, and rigorous compliance standards.",
  },
  {
    title: "TECHNOLOGY",
    subtitle: "Innovation & Automation",
    iconName: "Cpu",
    description: "AI-augmented operations, real-time intelligence feeds, and enterprise-grade operational security.",
  },
  {
    title: "OPPORTUNITY",
    subtitle: "Growth & Global Reach",
    iconName: "Navigation",
    description: "Unlocking non-linear growth pathways across key global financial centers and burgeoning corridors.",
  },
];
