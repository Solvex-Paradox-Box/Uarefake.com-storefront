export interface InnovationPlatform {
  id: string;
  category: 'FEDERAL' | 'GLOBAL' | 'ENTERPRISE' | 'CYBERSECURITY' | 'GOVERNMENT';
  name: string;
  count: number;
  description: string;
  bestFor: string;
  status: 'MONITORING';
}

export interface InnovationChallenge {
  id: string;
  category: 'AI-GOVERNANCE' | 'SECURITY' | 'IDENTITY' | 'OPTIMIZATION' | 'REGULATORY';
  status: 'ANALYZING' | 'SIMULATING' | 'MATCHED' | 'EXECUTING';
  title: string;
  source: string;
  feasibilityScore: number;
  feasibilityLevel: 'HIGH FEASIBILITY' | 'FEASIBLE TARGET' | 'EXPLORATORY TARGET';
  description: string;
  prizeValue: string;
  prizeNumber: number;
  deadline: string;
  paradoxMatches: number;
  complianceTags: string[];
  scoringRationale: {
    keywordMatches: string;
    tetherBubbleTypes: string[];
    complianceFrameworks: string;
    brainDbMatches: string;
    finalSummary: string;
  };
}

export const MONITORED_PLATFORMS: InnovationPlatform[] = [
  {
    id: 'usa-gov',
    category: 'FEDERAL',
    name: 'USA.gov / Innovation.gov',
    count: 3,
    description: 'Public sector technological and scientific breakthroughs.',
    bestFor: 'High-impact, government-funded R&D projects',
    status: 'MONITORING'
  },
  {
    id: 'xprize',
    category: 'GLOBAL',
    name: 'XPRIZE',
    count: 2,
    description: 'Radical breakthroughs in health, environment, and tech.',
    bestFor: 'Large-scale, long-term incentive prizes (millions of dollars)',
    status: 'MONITORING'
  },
  {
    id: 'wazoku',
    category: 'ENTERPRISE',
    name: 'Wazoku (InnoCentive)',
    count: 2,
    description: 'Global open innovation for Fortune 500 companies.',
    bestFor: 'Specific industrial, chemical, and software engineering problems',
    status: 'MONITORING'
  },
  {
    id: 'brightidea',
    category: 'ENTERPRISE',
    name: 'Brightidea / IdeaScale',
    count: 1,
    description: 'Enterprise-level innovation management campaigns.',
    bestFor: 'Direct B2B innovation pipelines and partner-led challenges',
    status: 'MONITORING'
  },
  {
    id: 'hackerone',
    category: 'CYBERSECURITY',
    name: 'HackerOne / Bugcrowd',
    count: 2,
    description: 'Cybersecurity and software vulnerability remediation.',
    bestFor: 'Monetizing technical security solutions and system integrity tests',
    status: 'MONITORING'
  },
  {
    id: 'nasa-coeci',
    category: 'GOVERNMENT',
    name: 'NASA Tournament Lab (CoECI)',
    count: 2,
    description: 'Space exploration, robotics, and advanced computing.',
    bestFor: 'Hard-science and complex algorithmic optimization challenges',
    status: 'MONITORING'
  }
];

export const INNOVATION_CHALLENGES: InnovationChallenge[] = [
  {
    id: 'ch-01',
    category: 'AI-GOVERNANCE',
    status: 'ANALYZING',
    title: 'XPRIZE Autonomous AI Audit & Governance',
    source: 'XPRIZE',
    feasibilityScore: 72,
    feasibilityLevel: 'HIGH FEASIBILITY',
    description: 'Build an autonomous system that continuously audits AI model behavior in production financial systems, detects concept drift, bias emergence, and compliance violations in real time.',
    prizeValue: '$3,000,000',
    prizeNumber: 3000000,
    deadline: '2027-03-01',
    paradoxMatches: 8,
    complianceTags: ['NIST SP 800-53', 'ISO 27001', 'NIST AI RMF', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "AI-Governance" matched 8 of 10 paradox keywords (+25 pts).',
      tetherBubbleTypes: ['PREDICATE LOGIC', 'DYNAMIC ATTRIBUTION', 'ZK-AUDIT COHERENCE'],
      complianceFrameworks: 'NIST SP 800-53, ISO 27001 & NIST AI RMF verified (+20 pts).',
      brainDbMatches: '8 live paradoxes from brain DB cross-referenced (+27 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 72/100 -> HIGH FEASIBILITY TARGET'
    }
  },
  {
    id: 'ch-02',
    category: 'SECURITY',
    status: 'ANALYZING',
    title: 'Zero-Knowledge Proof Implementation Security Review',
    source: 'HackerOne / Bugcrowd',
    feasibilityScore: 68,
    feasibilityLevel: 'FEASIBLE TARGET',
    description: "Tier-1 bank's ZKP-based settlement system requires comprehensive security audit. Scope: groth16 circuit correctness, trusted setup security, proof verifier soundness...",
    prizeValue: '$250,000',
    prizeNumber: 250000,
    deadline: '2026-09-01',
    paradoxMatches: 6,
    complianceTags: ['NIST SP 800-53', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "security" matched 6 of 10 paradox keywords (+18 pts).',
      tetherBubbleTypes: ['ZK-GROTH16 VERIFIER', 'SOUNDNESS ATTESTATION'],
      complianceFrameworks: 'NIST SP 800-53 & IRS-First Rule detected (+15 pts).',
      brainDbMatches: '6 live paradoxes from brain DB cross-referenced (+35 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 68/100 -> FEASIBLE TARGET'
    }
  },
  {
    id: 'ch-03',
    category: 'IDENTITY',
    status: 'ANALYZING',
    title: 'Zero-Knowledge Identity Verification for Federal Systems',
    source: 'USA.gov / Innovation.gov',
    feasibilityScore: 68,
    feasibilityLevel: 'FEASIBLE TARGET',
    description: 'Design a privacy-preserving identity verification system for federal agency access control that satisfies NIST SP 800-63B requirements without centralizing biometric data. Must operat...',
    prizeValue: '$500,000',
    prizeNumber: 500000,
    deadline: '2026-09-30',
    paradoxMatches: 6,
    complianceTags: ['NIST SP 800-53', 'FIPS 140-3', 'NIST AI RMF', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "identity" matched 6 of 10 paradox keywords (+18 pts).',
      tetherBubbleTypes: ['FEDERATED ID SHARDING', 'ZK BIOMETRIC ENCLAVE'],
      complianceFrameworks: 'FIPS 140-3, NIST SP 800-53 & NIST AI RMF (+22 pts).',
      brainDbMatches: '6 live paradoxes from brain DB cross-referenced (+28 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 68/100 -> FEASIBLE TARGET'
    }
  },
  {
    id: 'ch-04',
    category: 'IDENTITY',
    status: 'ANALYZING',
    title: 'Zero-Trust IAM Architecture for Multi-Cloud Financial Workloads',
    source: 'Brightidea / IdeaScale',
    feasibilityScore: 61,
    feasibilityLevel: 'FEASIBLE TARGET',
    description: 'Enterprise innovation challenge: Design a zero-trust identity and access management architecture for financial institutions operating across AWS, Azure, and GCP that enforces least-...',
    prizeValue: '$95,000',
    prizeNumber: 95000,
    deadline: '2026-08-30',
    paradoxMatches: 5,
    complianceTags: ['NIST SP 800-53', 'SOC 2 TYPE II', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "identity" matched 5 of 10 paradox keywords (+15 pts).',
      tetherBubbleTypes: ['MULTI-CLOUD IAM FEDERATION', 'LEAST PRIVILEGE PROVER'],
      complianceFrameworks: 'SOC 2 Type II & NIST SP 800-53 (+16 pts).',
      brainDbMatches: '5 live paradoxes from brain DB cross-referenced (+30 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 61/100 -> FEASIBLE TARGET'
    }
  },
  {
    id: 'ch-05',
    category: 'AI-GOVERNANCE',
    status: 'ANALYZING',
    title: 'AI Safety Verification for Autonomous Space Systems',
    source: 'NASA Tournament Lab (CoECI)',
    feasibilityScore: 54,
    feasibilityLevel: 'FEASIBLE TARGET',
    description: 'Develop formal verification methods for neural networks controlling autonomous space systems that provide mathematical guarantees of safety bounds under adversarial inputs, sensor...',
    prizeValue: '$300,000',
    prizeNumber: 300000,
    deadline: '2026-10-01',
    paradoxMatches: 5,
    complianceTags: ['NIST SP 800-53', 'NIST AI RMF', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "AI-Governance" matched 5 of 10 paradox keywords (+15 pts).',
      tetherBubbleTypes: ['LYAPUNOV BOUND VERIFIER', 'ADVERSARIAL BOUND FORMALIZATION'],
      complianceFrameworks: 'NIST AI RMF & NIST SP 800-53 (+14 pts).',
      brainDbMatches: '5 live paradoxes from brain DB cross-referenced (+25 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 54/100 -> FEASIBLE TARGET'
    }
  },
  {
    id: 'ch-06',
    category: 'IDENTITY',
    status: 'ANALYZING',
    title: 'Frictionless KYC for High-Frequency B2B Transactions',
    source: 'Wazoku (InnoCentive)',
    feasibilityScore: 52,
    feasibilityLevel: 'FEASIBLE TARGET',
    description: 'Fortune 500 financial institution seeks a KYC verification solution for B2B counterparties that reduces onboarding time from 14 days to <4 hours while maintaining FATF, GDPR, and...',
    prizeValue: '$180,000',
    prizeNumber: 180000,
    deadline: '2026-07-31',
    paradoxMatches: 5,
    complianceTags: ['NIST SP 800-53', 'OSFI B-13', 'FATF REC. 16', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "identity" matched 5 of 10 paradox keywords (+15 pts).',
      tetherBubbleTypes: ['INSTANT B2B CREDENTIAL ATTESTATION'],
      complianceFrameworks: 'OSFI B-13, FATF Rec. 16 & NIST SP 800-53 (+18 pts).',
      brainDbMatches: '5 live paradoxes from brain DB cross-referenced (+19 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 52/100 -> FEASIBLE TARGET'
    }
  },
  {
    id: 'ch-07',
    category: 'OPTIMIZATION',
    status: 'ANALYZING',
    title: 'Autonomous Financial Reconciliation for Multi-Agency Space Programs',
    source: 'NASA Tournament Lab (CoECI)',
    feasibilityScore: 51,
    feasibilityLevel: 'FEASIBLE TARGET',
    description: 'NASA seeks an algorithm to autonomously reconcile financial transactions across 12 federal agencies participating in Artemis program procurement, handling temporal ordering...',
    prizeValue: '$400,000',
    prizeNumber: 400000,
    deadline: '2026-11-30',
    paradoxMatches: 4,
    complianceTags: ['NIST SP 800-53', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "optimization" matched 4 of 10 paradox keywords (+12 pts).',
      tetherBubbleTypes: ['LAMPORT TEMPORAL RECONCILIATION'],
      complianceFrameworks: 'NIST SP 800-53 & IRS-First Rule (+14 pts).',
      brainDbMatches: '4 live paradoxes from brain DB cross-referenced (+25 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 51/100 -> FEASIBLE TARGET'
    }
  },
  {
    id: 'ch-08',
    category: 'SECURITY',
    status: 'ANALYZING',
    title: 'Post-Quantum Cryptographic Migration Toolkit',
    source: 'USA.gov / Innovation.gov',
    feasibilityScore: 46,
    feasibilityLevel: 'EXPLORATORY TARGET',
    description: 'Develop a toolkit to help financial institutions migrate legacy RSA/ECC cryptographic infrastructure to NIST-approved post-quantum algorithms (CRYSTALS-Kyber, CRYSTALS-Dilithium)...',
    prizeValue: '$750,000',
    prizeNumber: 750000,
    deadline: '2026-12-01',
    paradoxMatches: 4,
    complianceTags: ['NIST SP 800-53', 'FIPS 140-3', 'NIST AI RMF', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "security" matched 4 of 10 paradox keywords (+12 pts).',
      tetherBubbleTypes: ['KYBER-768 HARDWARE WRAPPER'],
      complianceFrameworks: 'FIPS 140-3 & NIST SP 800-53 (+16 pts).',
      brainDbMatches: '4 live paradoxes from brain DB cross-referenced (+18 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 46/100 -> EXPLORATORY TARGET'
    }
  },
  {
    id: 'ch-09',
    category: 'SECURITY',
    status: 'ANALYZING',
    title: 'DeFi Smart Contract Audit – $50M TVL Protocol',
    source: 'HackerOne / Bugcrowd',
    feasibilityScore: 37,
    feasibilityLevel: 'EXPLORATORY TARGET',
    description: 'Bug bounty for smart contract vulnerabilities in a regulated DeFi lending protocol with $50M TVL. Critical: re-entrancy, oracle manipulation, flash loan attacks, governance exploits...',
    prizeValue: '$500,000',
    prizeNumber: 500000,
    deadline: '2026-07-15',
    paradoxMatches: 4,
    complianceTags: ['NIST SP 800-53', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "security" matched 1 of 10 paradox keywords (+5 pts). 1 TETHER-BUBBLE resolution types aligned: TETHER_BUBBLE_PREDICATE_LOGIC (+10 pts). 1 compliance frameworks detected in requirements (+7 pts). 4 live paradoxes from brain DB cross-referenced (+12 pts).',
      tetherBubbleTypes: ['PREDICATE LOGIC'],
      complianceFrameworks: 'NIST SP 800-53, IRS-FIRST RULE, U.A.R.E.F.A.K.E.',
      brainDbMatches: '4 live paradoxes matched in Chamber I & Chamber II',
      finalSummary: 'FINAL FEASIBILITY SCORE: 37/100 -> EXPLORATORY TARGET'
    }
  },
  {
    id: 'ch-10',
    category: 'AI-GOVERNANCE',
    status: 'ANALYZING',
    title: 'AI-Driven AML Transaction Monitoring at Scale',
    source: 'USA.gov / Innovation.gov',
    feasibilityScore: 35,
    feasibilityLevel: 'EXPLORATORY TARGET',
    description: 'Build an explainable AI system for anti-money-laundering transaction monitoring across 10M+ daily transactions that achieves <0.1% false positive rate and provides audit-ready...',
    prizeValue: '$250,000',
    prizeNumber: 250000,
    deadline: '2026-08-15',
    paradoxMatches: 3,
    complianceTags: ['NIST SP 800-53', 'SOC 2 TYPE II', 'FATF REC. 16', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "AI-Governance" matched 3 of 10 paradox keywords (+9 pts).',
      tetherBubbleTypes: ['EXPLAINABLE AML MATRIX'],
      complianceFrameworks: 'SOC 2 Type II & FATF Rec. 16 (+14 pts).',
      brainDbMatches: '3 live paradoxes from brain DB cross-referenced (+12 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 35/100 -> EXPLORATORY TARGET'
    }
  },
  {
    id: 'ch-11',
    category: 'REGULATORY',
    status: 'ANALYZING',
    title: 'Basel III Capital Stress Testing Automation',
    source: 'Wazoku (InnoCentive)',
    feasibilityScore: 30,
    feasibilityLevel: 'EXPLORATORY TARGET',
    description: 'Design an automated stress testing framework for Basel III capital adequacy requirements that can run thousands of parallel scenarios with cryptographically verifiable audit...',
    prizeValue: '$220,000',
    prizeNumber: 220000,
    deadline: '2026-10-15',
    paradoxMatches: 3,
    complianceTags: ['NIST SP 800-53', 'BCBS 239', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "regulatory" matched 3 of 10 paradox keywords (+9 pts).',
      tetherBubbleTypes: ['CRYPTOGRAPHIC SCENARIO GENERATOR'],
      complianceFrameworks: 'BCBS 239 & NIST SP 800-53 (+12 pts).',
      brainDbMatches: '3 live paradoxes from brain DB cross-referenced (+9 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 30/100 -> EXPLORATORY TARGET'
    }
  },
  {
    id: 'ch-12',
    category: 'OPTIMIZATION',
    status: 'ANALYZING',
    title: 'XPRIZE DeFi Systemic Risk Quantification',
    source: 'XPRIZE',
    feasibilityScore: 30,
    feasibilityLevel: 'EXPLORATORY TARGET',
    description: 'Create a real-time systemic risk quantification engine for decentralized finance protocols that can predict contagion cascades 48+ hours before market stress events with >85%...',
    prizeValue: '$5,000,000',
    prizeNumber: 5000000,
    deadline: '2027-06-30',
    paradoxMatches: 3,
    complianceTags: ['NIST SP 800-53', 'IRS-FIRST RULE', 'U.A.R.E.F.A.K.E.'],
    scoringRationale: {
      keywordMatches: 'Category "optimization" matched 3 of 10 paradox keywords (+9 pts).',
      tetherBubbleTypes: ['CONTAGION CASCADE SIMULATOR'],
      complianceFrameworks: 'NIST SP 800-53 & IRS-First Rule (+10 pts).',
      brainDbMatches: '3 live paradoxes from brain DB cross-referenced (+11 pts).',
      finalSummary: 'FINAL FEASIBILITY SCORE: 30/100 -> EXPLORATORY TARGET'
    }
  }
];
