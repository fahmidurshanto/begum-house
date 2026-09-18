export interface ServiceRoom {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  badgeIcon: string;
  color: string;
  xPct: number;
  yPct: number;
  zDepth: number;
  keyMetrics: { label: string; value: string }[];
  services: string[];
}

export interface GlobalOpportunity {
  id: string;
  country: string;
  tagline: string;
  description: string;
  highlights: string[];
  flag: string;
}

export const SERVICE_ROOMS: ServiceRoom[] = [
  // LEFT SIDE (3 Doors)
  {
    id: "shared-services",
    title: "Shared Services & Global Delivery",
    shortDesc: "Scalable back-office operations and cross-border delivery hubs.",
    fullDesc: "Engineered shared service centers providing seamless operational support across multi-national entities, reducing overheads while maximizing productivity.",
    category: "Operations",
    badgeIcon: "Layers",
    color: "#C9A84C",
    xPct: 16,
    yPct: 62,
    zDepth: -50,
    keyMetrics: [
      { label: "Cost Reduction", value: "38%" },
      { label: "SLA Efficiency", value: "99.4%" },
      { label: "Active Hubs", value: "14 Countries" }
    ],
    services: ["Cross-border BPO", "24/7 Support Desk", "Process Standardization", "Quality Assurance"]
  },
  {
    id: "finance-ops",
    title: "Finance Operations & Transformation",
    shortDesc: "Corporate financial architecture, auditing, and ledger automation.",
    fullDesc: "Strategic financial advisory, automated ledger compliance, tax optimization, and enterprise treasury transformation tailored for high-growth firms.",
    category: "Finance",
    badgeIcon: "TrendingUp",
    color: "#00D4FF",
    xPct: 27,
    yPct: 36,
    zDepth: -100,
    keyMetrics: [
      { label: "Audit Accuracy", value: "99.9%" },
      { label: "Tax Savings", value: "Up to 24%" },
      { label: "Reporting Speed", value: "5x Faster" }
    ],
    services: ["Corporate Restructuring", "Tax Optimization", "Automated Accounting", "Risk & Governance"]
  },
  {
    id: "business-advisory",
    title: "Business Advisory & Support",
    shortDesc: "Strategic corporate growth, M&A guidance & market expansion.",
    fullDesc: "C-suite strategic intelligence, cross-border corporate setup, merger & acquisition consulting, and scalable operational frameworks.",
    category: "Strategy",
    badgeIcon: "Briefcase",
    color: "#F59E0B",
    xPct: 37,
    yPct: 76,
    zDepth: 0,
    keyMetrics: [
      { label: "M&A Volume", value: "£450M+" },
      { label: "Growth Acceleration", value: "3.2x Average" },
      { label: "Advisory Team", value: "Senior Partners" }
    ],
    services: ["M&A Advisory", "Market Entry UK & Global", "Corporate Governance", "Funding Strategy"]
  },

  // RIGHT SIDE (4 Doors)
  {
    id: "tech-ai",
    title: "Technology, AI & Web Development",
    shortDesc: "Next-gen WebGL, custom AI integrations, and enterprise software.",
    fullDesc: "Bespoke digital engineering delivering interactive WebGL web experiences, machine learning workflows, and automated enterprise software solutions.",
    category: "Technology",
    badgeIcon: "Cpu",
    color: "#38BDF8",
    xPct: 63,
    yPct: 76,
    zDepth: 0,
    keyMetrics: [
      { label: "Speed Rating", value: "100/100" },
      { label: "AI Workflows", value: "50+ Deployed" },
      { label: "Uptime SLA", value: "99.99%" }
    ],
    services: ["Interactive WebGL Sites", "Custom AI Models", "Cloud Architecture", "Mobile & Web Apps"]
  },
  {
    id: "architecture-design",
    title: "Architecture & Design",
    shortDesc: "Spatial interior layout, luxury brand aesthetics & spatial design.",
    fullDesc: "Creating timeless spatial environments, interior luxury corporate designs, and visual identities that reflect prestige and institutional power.",
    category: "Design",
    badgeIcon: "Compass",
    color: "#E2E8F0",
    xPct: 73,
    yPct: 36,
    zDepth: -100,
    keyMetrics: [
      { label: "Projects Built", value: "120+" },
      { label: "Client Rating", value: "4.95/5" },
      { label: "Awards Won", value: "18 International" }
    ],
    services: ["Commercial Interiors", "Spatial Masterplanning", "Brand Spatial Identity", "3D Visualization"]
  },
  {
    id: "mental-health",
    title: "Mental Health & Counselling",
    shortDesc: "Executive mental wellness programs & corporate resilience support.",
    fullDesc: "Confidential executive therapy, workplace mental resilience frameworks, and dedicated employee wellness strategies led by licensed UK specialists.",
    category: "Wellness",
    badgeIcon: "HeartPulse",
    color: "#EC4899",
    xPct: 84,
    yPct: 62,
    zDepth: -50,
    keyMetrics: [
      { label: "Satisfaction", value: "98%" },
      { label: "Burnout Reduction", value: "64%" },
      { label: "Executive Care", value: "1-on-1 Dedicated" }
    ],
    services: ["Executive Coaching", "Burnout Prevention", "Corporate Wellness Workshops", "1-on-1 Therapy"]
  },
  {
    id: "education-training",
    title: "Education & Training",
    shortDesc: "Corporate leadership academies & specialized skill development.",
    fullDesc: "Custom corporate training academies, AI & technical upskilling programs, and leadership development workshops for modern enterprises.",
    category: "Education",
    badgeIcon: "GraduationCap",
    color: "#10B981",
    xPct: 91,
    yPct: 40,
    zDepth: -50,
    keyMetrics: [
      { label: "Professionals Trained", value: "15,000+" },
      { label: "Course Completion", value: "96%" },
      { label: "Certifications", value: "UK Accredited" }
    ],
    services: ["Leadership Bootcamp", "AI Upskilling", "Corporate Academy Setup", "Executive Certification"]
  }
];

export const GLOBAL_OPPORTUNITIES: GlobalOpportunity[] = [
  {
    id: "turkiye",
    country: "Türkiye",
    tagline: "Gateway between Europe and Asia",
    description: "Prime commercial real estate investments, strategic supply chain hubs, and citizenship-by-investment opportunities.",
    highlights: ["Citizenship via Investment", "Luxury Istanbul Developments", "Tax Exemption Zones"],
    flag: "🇹🇷"
  },
  {
    id: "uae-dubai",
    country: "UAE / Dubai",
    tagline: "The World's Premier Financial Hub",
    description: "Zero-tax corporate setup, Golden Visa acquisition, high-yield luxury property portfolios, and freezone company incorporation.",
    highlights: ["10-Year Golden Visa", "0% Corporate Tax Options", "DIFC & DMCC Freezone Setup"],
    flag: "🇦🇪"
  },
  {
    id: "property-investment",
    country: "Property Investment",
    tagline: "High-Yield Global Real Estate",
    description: "Curated portfolio of prime commercial and residential properties across London, Dubai, and Istanbul with guaranteed rental yields.",
    highlights: ["Yields up to 9.2% p.a.", "Full Asset Management", "Capital Appreciation Protection"],
    flag: "🏢"
  },
  {
    id: "residency",
    country: "Residency & Citizenship",
    tagline: "Global Mobility for High Net Worth Individuals",
    description: "Tailored residency programs enabling seamless international mobility, asset security, and family security.",
    highlights: ["Visa-Free Access to 140+ Countries", "Family Inclusion", "Fast-Track Processing"],
    flag: "🌐"
  },
  {
    id: "partnerships",
    country: "International Partnerships",
    tagline: "Cross-Border Joint Ventures",
    description: "Direct co-investment networks pairing UK enterprises with international funds and strategic family offices.",
    highlights: ["Institutional Co-Investing", "Joint Venture Structuring", "Government Alignment"],
    flag: "🤝"
  }
];
