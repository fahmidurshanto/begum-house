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
    id: "financial-services",
    title: "FINANCIAL SERVICES",
    tagline: "Sovereign Wealth, Asset Management & Cross-Border Advisory",
    floor: "upper",
    position: "upper-1",
    iconName: "TrendingUp",
    description:
      "Delivering tailored private wealth architecture, institutional capital advisory, and cross-border M&A strategy with discretion and precision.",
    highlights: [
      "Institutional Capital Advisory & M&A",
      "Private Family Office Structuring",
      "Cross-Border Liquidity & Currency Risk",
      "Sustainable ESG Investment Vehicles",
    ],
    keyStats: [
      { label: "Capital Deployed", value: "£2.4B+" },
      { label: "Global Jurisdictions", value: "18+" },
    ],
    leadContact: "wealth@begumhouse.co.uk",
  },
  {
    id: "real-estate",
    title: "REAL ESTATE",
    tagline: "Prime UK & International Property Portfolio Management",
    floor: "upper",
    position: "upper-2",
    iconName: "Home",
    description:
      "Acquiring, developing, and curating premier residential and commercial estates across Mayfair, Kensington, London Docklands, and prime global cities.",
    highlights: [
      "Off-Market Prime Central London Acquisitions",
      "Commercial Asset Repositioning & Yield Optimization",
      "Ultra-Luxury Residential Development",
      "Bespoke Tenancy & Estate Management",
    ],
    keyStats: [
      { label: "Square Footage Managed", value: "4.8M sq ft" },
      { label: "Portfolio Value", value: "£1.8B" },
    ],
    leadContact: "estates@begumhouse.co.uk",
  },
  {
    id: "mental-counseling",
    title: "MENTAL COUNSELING",
    tagline: "Executive Wellbeing, Resilience & Holistic Psychological Health",
    floor: "upper",
    position: "upper-3",
    iconName: "HeartHandshake",
    description:
      "Empowering high-performing executives, founders, and families with bespoke mental health guidance, clinical confidentiality, and cognitive optimization.",
    highlights: [
      "C-Suite Executive Stress & Resilience Coaching",
      "Family Enterprise Succession Mediation",
      "Confidential Clinical Therapy & Assessment",
      "Corporate Holistic Wellbeing Frameworks",
    ],
    keyStats: [
      { label: "Boardroom Leaders Supported", value: "850+" },
      { label: "Satisfaction & Impact Rate", value: "99.4%" },
    ],
    leadContact: "wellbeing@begumhouse.co.uk",
  },
  {
    id: "architecture-solutions",
    title: "ARCHITECTURE SOLUTIONS",
    tagline: "Timeless Neoclassical Craft Meets Contemporary Smart Engineering",
    floor: "upper",
    position: "upper-4",
    iconName: "Compass",
    description:
      "Synthesizing historic architectural reverence with modern bioclimatic engineering to design iconic private estates, heritage landmarks, and sustainable headquarters.",
    highlights: [
      "Historic Heritage Restoration & Conservation",
      "Smart-Building Automation & Net-Zero Design",
      "Masterplanning & Mixed-Use Urban Enclaves",
      "Bespoke Classical Facades & Interior Craftsmanship",
    ],
    keyStats: [
      { label: "Architectural Awards", value: "32" },
      { label: "LEED Platinum Projects", value: "14" },
    ],
    leadContact: "architecture@begumhouse.co.uk",
  },
  {
    id: "global-opportunities",
    title: "GLOBAL OPPORTUNITIES",
    tagline: "Connecting UK Innovation with Fast-Growing Emerging Markets",
    floor: "ground",
    position: "ground-left",
    iconName: "Globe",
    description:
      "Unlocking high-yield bilateral trade corridors, tech venture syndicates, and sovereign joint ventures spanning the UK, Middle East, and Asia Pacific.",
    highlights: [
      "UK-GCC Strategic Trade Corridors",
      "Cross-Border Joint Ventures & Consortiums",
      "Government Relations & Sovereign Advisory",
      "Technology Transfer & Market Entry",
    ],
    keyStats: [
      { label: "Active Bilateral Corridors", value: "12" },
      { label: "Consortium Value", value: "£950M+" },
    ],
    leadContact: "global@begumhouse.co.uk",
  },
  {
    id: "partner-with-us",
    title: "PARTNER WITH US",
    tagline: "Strategic Alliances, Institutional Joint Ventures & Co-Investment",
    floor: "ground",
    position: "ground-right",
    iconName: "Handshake",
    description:
      "Collaborate with Begum House to co-invest, scale strategic operational assets, and tap into an unparalleled network of sovereign and private enterprise leaders.",
    highlights: [
      "Co-Investment Syndication",
      "Strategic Equity Partnerships",
      "Institutional Advisory Councils",
      "Global Delivery Shared Platforms",
    ],
    keyStats: [
      { label: "Allied Institutions", value: "140+" },
      { label: "Average Partnership Tenure", value: "7+ Yrs" },
    ],
    leadContact: "partners@begumhouse.co.uk",
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
