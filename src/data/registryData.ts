import {
  ParadoxDefinition,
  MeshNode,
  VerifiedKnowledgeSource,
  ComplianceControl,
  ConflictCase,
  B2BProblemRequest
} from '../types';

/**
 * FULL 88 PARADOX REGISTRY FOR DAISY HAMINJA AI (UAREFAKE ARCHITECTURE)
 * Complete, un-truncated, 88-paradox dialectic dataset.
 */
export const PARADOX_REGISTRY_88: ParadoxDefinition[] = Array.from({ length: 88 }, (_, i) => {
  const id = i + 1;
  const categories: ParadoxDefinition['category'][] = [
    'Quantum & Physics',
    'Epistemological',
    'Economic & Market',
    'Geopolitical & Sovereignty',
    'Legal & Ethical',
    'Cybernetic & Logical',
    'Cognitive & Behavioral',
    'Socio-Technical'
  ];
  const category = categories[i % categories.length];
  const pairId = id <= 44 ? id + 44 : id - 44;

  const names = [
    "Schrödinger's Sovereignty Paradox", "Grandfather's Regulatory Dilemma", "Fermi's Economic Silence", 
    "Triffin's Monetary Dilemma", "Jevons' Compute Consumption Loop", "Information Security Anti-Entropy",
    "Gödel's Governance Incompleteness", "Ship of Theseus Enterprise Identity", "Liar's Truth Protocol",
    "Prisoner's Geopolitical Dilemma", "Braess' Network Efficiency Paradox", "Simpson's Macro-Statistical Anti-Pattern",
    "Sorites Threshold of Consensus", "Arrow's Impossible Electoral Vector", "Newcomb's Predictive Volatility",
    "Allais' Risk Rationality Void", "St. Petersburg infinite Yield Paradox", "Zeno's Inflationary Achilles",
    "Condorcet's Voting Loop", "Parondo's Winning Loss Synthesis", "Goodhart's Metric Degradation",
    "Campbell's Policy Decay", "Lucas' Predictive Critique Paradox", "Cobweb Market Oscillation",
    "Diamond-Water Utility Equivalence", "Bertrand's Price Competition Abyss", "Hotelling's Spatial Homogenization",
    "Giffen's Inferior Demand Surge", "Veblen's Conspicuous Price Attraction", "Kuznets' Inequality Inversion",
    "Solow's Productivity Metric Absurdity", "Rybczyński's Factor Bias Inversion", "Stolper-Samuelson Trade Distribution",
    "Leontief's Capital Export Reversal", "Gibson's Interest-Price Co-Movement", "Meese-Rogoff Exchange Rate Randomness",
    "Feldstein-Horioka Capital Retention", "Equity Premium Excess Volatility", "Backus-Kehoe International Consumption",
    "Home Bias Financial Paradox", "Size Effect Capital Asset Anomaly", "Value Premium Risk Disconnect", "Momentum Strategy Reversal Void", "Calendar Market Seasonal Drift",
    // 45 - 88 Paired Cross-Fires
    "Quantum Entanglement Contract Enforceability", "Temporal Arbitrage Legal Non-Linearity", "Cosmological Value Conservation",
    "Bifurcated Reserve Liquidity Tension", "Zero-Emission Compute Anti-Scaling", "Zero-Knowledge Transparency Dilemma",
    "Self-Referential Constitutional Patching", "Immutable Decentralized Re-Brand", "Cryptographic Truth Inversion",
    "Multi-Lateral Mutual Assured Cooperation", "Routing Topology Capacity Inversion", "Micro-Macro Divergent Synthesis",
    "Granular State Transition Boundary", "Multi-Agent Consensus Priority Void", "Deterministic Determinism Non-Duality",
    "Sovereign Risk-Yield Disconnect", "Infinite Dividend Value Horizon", "Infinite Hyper-Inflation Velocity Lock",
    "Cyclic Policy Preference Synthesis", "Asymmetric Strategic Re-Balancing", "KPI Invalidation Self-Correction",
    "Metric Neutralization Protocol", "Dynamic Expectations Calibration", "Damped Supply-Demand Equilibrium",
    "Essential Utility Invariant Value", "Collusive Equilibrium Stabilization", "Product Differentiation Vectoring",
    "Scarcity Demand Realignment", "Prestige Value Anchor Matrix", "Equitable Growth Equilibrium Curve",
    "Unmeasured Capital Efficiency Yield", "Resource Re-Allocation Equilibrium", "Universal Factor Neutralization",
    "Paradoxical Factor Endowment Export", "Real Rate Anchor Alignment", "Valuation Equilibrium Attractor",
    "Global Capital Mobility Lock", "Risk Neutral Value Realignment", "International Consumption Synchronization",
    "Cross-Border Sovereign Asset Neutrality", "Scale Invariant Capital Yield", "Inherent Asset Value Calibration", "Trend Reversal Dynamic Hedging", "Temporal Market Symmetry Lock"
  ];

  const sourceDomains = ["mit.edu", "harvard.edu", "gov.uk", "un.org", "wikipedia.org", "law.cornell.edu", "worldbank.org", "imf.org"];

  return {
    id,
    code: `PRX-${id.toString().padStart(3, '0')}`,
    name: names[i] || `UAREFAKE Dialectic Paradox ${id}`,
    category,
    description: `Formal UAREFAKE dialectic paradox #${id} evaluating contradiction between state vector ${id} and cross-fire anti-state ${pairId}. Requires dual-track cross-fire synthesis.`,
    crossFirePairId: pairId,
    crossFireConcept: `Cross-Fire Pairing PRX-${pairId.toString().padStart(3, '0')}`,
    dialecticWeight: parseFloat((0.45 + (id * 0.006) % 0.50).toFixed(3)),
    resolutionFormula: `S_${id}(t) = \\oint \\left( \\mathcal{A}_{${id}} \\oplus \\mathcal{B}_{${pairId}} \\right) e^{-\\lambda k} dk \\implies \\text{ZK-IP Lockbox}`,
    verifiedSourceDomain: sourceDomains[id % sourceDomains.length]
  };
});

/**
 * 54-NODE MESH TOPOLOGY FOR DAISY HAMINJA AI (TETHER BUBBLE & FAILOVER MESH)
 */
export const MESH_TOPOLOGY_54: MeshNode[] = Array.from({ length: 54 }, (_, i) => {
  const idNum = i + 1;
  const clusters: MeshNode['cluster'][] = ['Alpha Core', 'Beta Relay', 'Gamma Lockbox', 'Delta Crawler', 'Epsilon Edge'];
  const roles: MeshNode['role'][] = [
    'Alpha Core Node',
    'Tether Bubble Relay',
    'ZK Lockbox Vault',
    'Verified Crawler',
    'Cross-Fire Processor',
    'Edge Telemetry Gateway'
  ];

  const cluster = clusters[i % clusters.length];
  const role = roles[i % roles.length];
  const statusList: MeshNode['status'][] = ['OPTIMAL', 'OPTIMAL', 'OPTIMAL', 'ACTIVE', 'SYNCING', 'FAILOVER_STANDBY'];
  const status = statusList[(i * 3 + 1) % statusList.length];

  return {
    id: `NODE-${idNum.toString().padStart(2, '0')}`,
    name: `UAREFAKE Mesh Node ${idNum} [${role.split(' ')[0]}]`,
    role,
    cluster,
    ipAddress: `10.54.${Math.floor(i / 10) + 1}.${(i % 10) * 20 + 5}`,
    status,
    latencyMs: Math.floor(1.2 + (i % 7) * 0.8 + Math.random() * 0.5),
    tetherBubbleRadiusKm: Math.floor(250 + (i % 12) * 125),
    routingLoadPct: Math.floor(18 + (i * 7) % 65),
    memoryUsagePct: Math.floor(22 + (i * 5) % 55),
    uptimeSeconds: 1420000 + i * 86400,
    zkKeyHash: `0x${(idNum * 123456789).toString(16).padStart(16, '0')}...zkProof`
  };
});

/**
 * VERIFIED KNOWLEDGE SOURCES REGISTRY (.edu, .gov, wikipedia, law, human rights)
 */
export const VERIFIED_SOURCES: VerifiedKnowledgeSource[] = [
  {
    id: "SRC-EDU-MIT",
    title: "MIT Computer Science & Artificial Intelligence Laboratory (CSAIL)",
    domain: "edu",
    url: "https://csail.mit.edu/research",
    authorityScore: 99,
    lastCrawledISO: "2026-08-09T06:00:00Z",
    recordCount: 1425000,
    zkHashProof: "0x8f1a...mit_edu_verified",
    status: "VERIFIED"
  },
  {
    id: "SRC-EDU-STANFORD",
    title: "Stanford University Human-Centered AI Institute (HAI)",
    domain: "edu",
    url: "https://hai.stanford.edu/research",
    authorityScore: 98,
    lastCrawledISO: "2026-08-09T06:15:00Z",
    recordCount: 1180000,
    zkHashProof: "0x3b9e...stanford_edu_verified",
    status: "VERIFIED"
  },
  {
    id: "SRC-GOV-NIST",
    title: "NIST Information Technology Laboratory & AI Standards",
    domain: "gov",
    url: "https://www.nist.gov/ai",
    authorityScore: 100,
    lastCrawledISO: "2026-08-09T05:30:00Z",
    recordCount: 890000,
    zkHashProof: "0x7a2c...nist_gov_verified",
    status: "VERIFIED"
  },
  {
    id: "SRC-LAW-CORNELL",
    title: "Cornell Legal Information Institute (LII)",
    domain: "law",
    url: "https://www.law.cornell.edu",
    authorityScore: 97,
    lastCrawledISO: "2026-08-09T04:45:00Z",
    recordCount: 3400000,
    zkHashProof: "0x1d4f...cornell_law_verified",
    status: "VERIFIED"
  },
  {
    id: "SRC-HR-UN",
    title: "United Nations Office of the High Commissioner for Human Rights (OHCHR)",
    domain: "human_rights",
    url: "https://www.ohchr.org/en/instruments-and-mechanisms",
    authorityScore: 100,
    lastCrawledISO: "2026-08-09T03:20:00Z",
    recordCount: 620000,
    zkHashProof: "0x9c8a...un_ohchr_verified",
    status: "VERIFIED"
  },
  {
    id: "SRC-WIKI-EN",
    title: "Wikipedia English Corpus (Filtered & Fact-Checked snapshot)",
    domain: "wikipedia",
    url: "https://en.wikipedia.org/wiki/Main_Page",
    authorityScore: 92,
    lastCrawledISO: "2026-08-09T02:10:00Z",
    recordCount: 6800000,
    zkHashProof: "0x4e6b...wiki_en_verified",
    status: "VERIFIED"
  }
];

/**
 * COMPLIANCE & CONTROL AUDIT MATRIX
 */
export const COMPLIANCE_CONTROLS: ComplianceControl[] = [
  {
    id: "CMP-EAL6-01",
    standard: "EAL6+",
    code: "EAL6+-ADV_FSP.5",
    name: "Formal High-Level Security Architecture Verification",
    status: "ENFORCED",
    lastVerifiedISO: "2026-08-09T07:00:00Z",
    proofHash: "0xeal6_01_proof_verified_mesh"
  },
  {
    id: "CMP-NIST-02",
    standard: "NIST SP 800-53",
    code: "NIST-AC-3",
    name: "Access Enforcement & Zero-Trust Mesh Encryption",
    status: "COMPLIANT",
    lastVerifiedISO: "2026-08-09T06:50:00Z",
    proofHash: "0xnist_ac3_mesh_proof"
  },
  {
    id: "CMP-ISO-03",
    standard: "ISO 27001",
    code: "ISO-A.12.1.2",
    name: "Change Management & ZK Lockbox Persistence Audit",
    status: "AUDITED",
    lastVerifiedISO: "2026-08-09T06:40:00Z",
    proofHash: "0xiso_27001_proof_audit"
  },
  {
    id: "CMP-SOC2-04",
    standard: "SOC2 Type II",
    code: "SOC2-CC6.1",
    name: "Logical Access Controls & Autonomous Semantic Filter Isolation",
    status: "ENFORCED",
    lastVerifiedISO: "2026-08-09T06:30:00Z",
    proofHash: "0xsoc2_cc61_isolation_proof"
  },
  {
    id: "CMP-ZK-05",
    standard: "ZK Cryptography",
    code: "ZK-SNARK-PLONK",
    name: "Non-Interactive Zero-Knowledge IP Lockbox Proof Verification",
    status: "ENFORCED",
    lastVerifiedISO: "2026-08-09T07:10:00Z",
    proofHash: "0xzk_plonk_snark_proof_valid"
  }
];

/**
 * INITIAL B2B SCENARIOS
 */
export const SAMPLE_B2B_PROBLEMS: B2BProblemRequest[] = [
  {
    id: "B2B-001",
    category: "Supply Chain Paradox",
    title: "Global Semiconductor Supply Bottleneck vs Zero-Inventory Mandate",
    description: "Enterprise electronics conglomerate faces lead-time volatility (36 weeks) while mandated under JIT zero-inventory balance sheet constraints. Dual track solution required.",
    financialImpactEstimate: "$450M Annual Exposure",
    constraints: ["Zero Balance Sheet Debt Increase", "ISO 9001 Compliance", "Multi-Sourced Supplier Resilience"]
  },
  {
    id: "B2B-002",
    category: "Macroeconomic Hedging",
    title: "Cross-Border Currency Volatility & Energy Cost Spikes",
    description: "Multinational manufacturing network operating in 14 countries experiencing currency fluctuations and unpredictable green energy compliance taxes.",
    financialImpactEstimate: "€120M Unhedged Operational Risk",
    constraints: ["EU Corporate Sustainability Due Diligence Directive", "Real-Time Treasury Liquidity", "ESG Sovereign Mandates"]
  }
];

/**
 * INITIAL CONFLICT CASES
 */
export const SAMPLE_CONFLICT_CASES: ConflictCase[] = [
  {
    id: "CFL-2026-01",
    region: "Strait of Hormuz & Maritime Shipping Channels",
    title: "Maritime Bottleneck Escalation & Energy Route Security",
    actors: ["Regional Maritime Coalition", "International Shipping Union", "Sovereign Coastal Guards"],
    escalationLevel: 4,
    rootCauses: ["Navigational Right Disputes", "Insurance Risk Premium Surcharges", "Proxy Coastal Drone Interventions"],
    gameTheoryMatrix: {
      zeroSumOutcome: "Blockade leading to global energy price spikes +180% and naval confrontation.",
      winWinSynthesis: "Multi-Lateral Autonomous Escort Buffer + ZK Insured Open Transit Channel under UN Convention on the Law of the Sea (UNCLOS)."
    },
    deEscalationSteps: [
      "De-militarize 12-nautical-mile buffer zone",
      "Deploy ZK-encrypted transponder tracking for transparent non-belligerent cargo verification",
      "Establish joint UN maritime mediation center with real-time telemetric monitoring"
    ],
    humanRightsStandardsApplied: [
      "UN Declaration of Human Rights - Article 13 (Freedom of Movement)",
      "UNCLOS Article 87 (Freedom of the High Seas)",
      "Geneva Convention Protocol I (Protection of Civilian Life)"
    ]
  },
  {
    id: "CFL-2026-02",
    region: "Sub-Saharan Rare Earth Mining Corridor",
    title: "Resource Sovereign Rights vs Foreign Extraction Monopolies",
    actors: ["Local Sovereign Mining Authorities", "Global EV Battery Consortium", "Community Rights Coalitions"],
    escalationLevel: 3,
    rootCauses: ["Unequal Revenue Distribution", "Environmental Water Table Contamination", "Labor Standard Violations"],
    gameTheoryMatrix: {
      zeroSumOutcome: "Nationalization followed by international sanctions and supply blackouts.",
      winWinSynthesis: "Co-Owned Sovereign Wealth Refinery Fund + 40% Local Value Addition Requirement with ISO-Audited Clean Extraction."
    },
    deEscalationSteps: [
      "Re-negotiate extraction royalty share to 35% sovereign baseline",
      "Fund closed-loop water treatment plants backed by international development bank guarantees",
      "Enforce ILO Labor Standards with ZK-Audited payroll verification"
    ],
    humanRightsStandardsApplied: [
      "International Covenant on Economic, Social and Cultural Rights (ICESCR)",
      "UN Guiding Principles on Business and Human Rights (UNGP)",
      "ILO Declaration on Fundamental Principles and Rights at Work"
    ]
  }
];
