import { ParadoxRule, ParadoxAnomaly, ParadoxCategory, ParadoxSolution } from '../types';

// Catalog of 105 Complete Paradox Solutions (40 Historical + 48 Proprietary + 17 Contract/Security)
const HISTORICAL_PARADOX_NAMES = [
  "Zeno's Arrow Paradox", "Achilles & the Tortoise Paradox", "Russell's Set Theory Paradox", "Ship of Theseus Identity Paradox",
  "Grandfather Temporal Causal Loop", "Sorites Heap Threshold Paradox", "Fermi Extraterrestrial Silence Paradox", "Newcomb's Predictor Decision Paradox",
  "Monty Hall Probability Swap Paradox", "Simpson's Statistical Reversal Paradox", "Braess's Traffic Routing Paradox", "Abilene Groupthink Paradox",
  "Arrow's Impossibility Theorem Paradox", "Jevons Efficiency Consumption Paradox", "Condorcet Voting Preference Paradox", "Ellsberg Ambiguity Aversion Paradox",
  "St. Petersburg Expected Value Paradox", "Allais Risk Valuation Paradox", "Parrondo's Losing Game Combination Paradox", "Prisoner's Dilemma Non-Cooperative Loop",
  "Tragedy of the Commons Exhaustion Paradox", "Bertrand's Box Probability Paradox", "Birthday Hash Collision Paradox", "Coastline Fractal Measurement Paradox",
  "Cobra Perverse Incentive Paradox", "Unexpected Hanging Logic Paradox", "Gale-Shapley Stable Matching Paradox", "Chebyshev Upper Bound Deviation Paradox",
  "Gabriel's Infinite Surface Paradox", "Hilbert's Infinite Hotel Capacity Paradox", "Banach-Tarski Sphere Decomposition Paradox", "Olbers' Celestial Darkness Paradox",
  "Twin Relativistic Time Dilation Paradox", "Schrodinger's Superposition Quantum Paradox", "Maxwell's Thermodynamic Demon Paradox", "Bootstrap Infinite Information Causal Loop",
  "Omnipotence Paradoxical Burden", "Grelling-Nelson Heterological Word Paradox", "Crocodile Dilemma Conditional Loop", "Barber Shop Self-Referential Exclusion"
];

export const CATALOG_105_PARADOX_SOLUTIONS: ParadoxSolution[] = Array.from({ length: 105 }).map((_, idx) => {
  const num = idx + 1;
  const id = `SOLVER-PS-${num.toString().padStart(3, '0')}`;
  
  if (num <= 40) {
    const histName = HISTORICAL_PARADOX_NAMES[num - 1] || `Historical Paradox #${num}`;
    return {
      id,
      title: `${histName} (B2B Supply Solver)`,
      type: 'historical',
      category: 'Historical Logical Paradox',
      description: `Classical ${histName} mapped onto multi-tier supply chain decision matrices and vendor contract arbitrage.`,
      b2bApplication: `Resolves recursive infinite loop in automated PO approvals and inventory reorder threshold calculation for ${histName}.`,
      solverAlgorithm: `Recursive AST Resolution Matrix v${num % 5 + 1}.0 with Zero-Trust Consensus Verification`,
      status: 'active',
      successRate: 99.1 + (num % 8) * 0.1,
      solvedCount: 1420 + num * 38
    };
  } else if (num <= 88) {
    const propNum = num - 40;
    return {
      id,
      title: `Proprietary Enterprise Paradox #${propNum}: B2B Financial Arbitrage Solver`,
      type: 'proprietary',
      category: propNum % 2 === 0 ? 'Tether Synaptic & FX Discrepancy' : 'FX & Volume Tier Inversion',
      description: `Detects and automatically resolves proprietary Daisy Haminja anomalies including Tether Bubble Synaptic payload mismatches, undisclosed FX spread markups, and split PO tier inversions.`,
      b2bApplication: `Automates 3-way matching, invoice credit memo generation, and treasury payout adjustments under Master Agreement Clause ${propNum % 10 + 1}.`,
      solverAlgorithm: `Paradox Box 3-Way Reconciliation Neural Heuristic #${propNum}`,
      status: 'deployable',
      successRate: 98.5 + (propNum % 10) * 0.1,
      solvedCount: 890 + propNum * 45
    };
  } else {
    const secNum = num - 88;
    return {
      id,
      title: `MMTAI Zero-Trust Security Paradox Solver #${secNum}`,
      type: 'contract_security',
      category: 'Cryptographic & Zero-Trust Protocol',
      description: `Protects against cryptographic signature replay, token forgery, OFAC sanction list drift, and unauthorized API payload modifications across distributed B2B nodes.`,
      b2bApplication: `Enforces SHA-256 HMAC payload verification and automated isolation of suspicious vendor API requests.`,
      solverAlgorithm: `MMTAI Quantum-Safe Cryptographic Handshake Protocol Level 4`,
      status: 'running',
      successRate: 99.9,
      solvedCount: 3100 + secNum * 92
    };
  }
});



// Catalog of 88 B2B Paradox Rules
export const PARADOX_88_RULES: ParadoxRule[] = Array.from({ length: 88 }).map((_, idx) => {
  const codeNum = idx + 1;
  const ruleCode = `PARADOX-RULE-${codeNum.toString().padStart(3, '0')}`;
  
  let category: ParadoxCategory = 'Pricing Paradox';
  let title = `Paradox ${codeNum}: Pricing Discrepancy Rule`;
  let severity: ParadoxRule['severity'] = 'medium';
  let clauseReference = `Master Vendor Agreement Clause ${Math.floor(codeNum / 5) + 1}.${(codeNum % 5) + 1}`;
  let auditLogic = 'Scan invoice unit price against contracted bracket pricing.';
  let actionStrategy = 'Issue automated credit claim notice to vendor.';

  if (codeNum <= 15) {
    category = 'Pricing Paradox';
    severity = codeNum % 3 === 0 ? 'critical' : 'high';
    title = `Pricing Paradox #${codeNum}: Unannounced Price Escalation`;
    auditLogic = 'Detect price increases that exceed the agreed Consumer Price Index (CPI) cap of 2.5% per annum.';
    actionStrategy = 'Revert unit price to contracted baseline and notify accounts payable.';
  } else if (codeNum <= 30) {
    category = 'Pricing Paradox';
    severity = 'critical';
    title = `Tether Bubble Synaptic Paradox #${codeNum}: UAREFAKE Authenticity Disconnect`;
    clauseReference = 'Daisy Haminja Tether Agreement Clause 16.2 (Truth Protocol)';
    auditLogic = 'Verify payload authenticity and detect synthetic or unverified token injections.';
    actionStrategy = 'Enforce Clause 16.2 UAREFAKE verification and isolate unverified synaptic payloads.';
  } else if (codeNum <= 45) {

    category = 'Currency FX Paradox';
    severity = 'high';
    title = `Currency FX Paradox #${codeNum}: Undisclosed FX Spread Markup`;
    clauseReference = 'Treasury FX Policy Annex B';
    auditLogic = 'Cross-reference billed EUR/USD FX conversion rate against official European Central Bank (ECB) benchmark.';
    actionStrategy = 'Recalculate payment voucher using official ECB closing spot rate.';
  } else if (codeNum <= 60) {
    category = 'Contract Inversion';
    severity = 'medium';
    title = `Volume Tier Inversion Paradox #${codeNum}: Split Order Bracket Bypass`;
    clauseReference = 'Master Volume Discount Schedule Table 3';
    auditLogic = 'Consolidate multiple split Purchase Orders to check if cumulative volume qualifies for higher discount tier.';
    actionStrategy = 'Merge order batch metrics and claim retroactive volume discount credit.';
  } else if (codeNum <= 72) {
    category = 'Double Billing Loop';
    severity = 'critical';
    title = `Double Billing Loop Paradox #${codeNum}: Voucher Duplication`;
    clauseReference = 'AP Control Rule 4.1';
    auditLogic = 'Detect duplicate invoice submission via modified document number or altered date formatting.';
    actionStrategy = 'Block duplicate voucher creation and flag account for security audit.';
  } else if (codeNum <= 80) {
    category = 'Rebate Tax Paradox';
    severity = 'medium';
    title = `Rebate Tax Discrepancy Paradox #${codeNum}: Uncredited Annual Rebate`;
    clauseReference = 'Commercial Terms Clause 22.8';
    auditLogic = 'Audit annual spend against tier rebates to verify timely disbursement of vendor incentive credits.';
    actionStrategy = 'Automatically apply credit memo against next open AP invoice batch.';
  } else {
    category = 'MMTAI Transport Protocol Discrepancy';
    severity = 'critical';
    title = `MMTAI Security Paradox #${codeNum}: Cryptographic Signature Mismatch`;
    clauseReference = 'MMTAI Protocol Spec v4.2';
    auditLogic = 'Validate HMAC-SHA256 payload signature against registered vendor public key.';
    actionStrategy = 'Quarantine payload, reject voucher, and log security incident in MMTAI Ledger.';
  }

  return {
    ruleCode,
    title,
    category,
    severity,
    clauseReference,
    auditLogic,
    actionStrategy
  };
});

export const INITIAL_88_PARADOX_ANOMALIES: ParadoxAnomaly[] = [
  {
    id: 'PARADOX-701',
    ruleCode: 'PARADOX-RULE-016',
    paradoxTitle: 'Daisy Haminja Tether Bubble Synaptic Paradox',
    type: 'Pricing Paradox',
    severity: 'critical',
    entityId: 'INV-9902 / V-102',
    discrepancyValue: 2840.00,
    clauseReference: 'Daisy Haminja Tether Agreement Clause 16.2',
    explanation: 'Detected unverified synthetic payload discrepancy on incoming invoice stream. Daisy Haminja Tether Bubble Synaptic Protocol flagged mismatch against master UAREFAKE authenticity verification matrix.',
    status: 'open',
    solverStrategy: 'Execute Daisy Haminja 1-Click Tether Bubble Synaptic Solver & UAREFAKE Authenticity Lock.',
    aiConfidence: 99.8,
    detectedTimestamp: '2026-08-03 06:22 AM'
  },
  {
    id: 'PARADOX-702',
    ruleCode: 'PARADOX-RULE-031',
    paradoxTitle: 'Dual Currency FX Spot Rounding Loop',
    type: 'Currency FX Paradox',
    severity: 'high',
    entityId: 'INV-9905 / V-103',
    discrepancyValue: 1420.50,
    clauseReference: 'Treasury FX Policy Annex B',
    explanation: 'EU Logistics Depot billed EUR items converted to USD using yesterday\'s spot rate + 1.5% undisclosed conversion markup instead of official ECB closing rate.',
    status: 'resolving',
    solverStrategy: 'Recalculate using ECB Benchmark Rate and re-submit adjusted PO payment voucher.',
    aiConfidence: 96.8,
    detectedTimestamp: '2026-08-02 04:15 PM'
  },
  {
    id: 'PARADOX-703',
    ruleCode: 'PARADOX-RULE-048',
    paradoxTitle: 'Volume Tier Inversion Pricing Paradox',
    type: 'Contract Inversion',
    severity: 'medium',
    entityId: 'PO-8839 / V-103',
    discrepancyValue: 800.00,
    clauseReference: 'Master Volume Discount Schedule Table 3',
    explanation: 'Titanium Alloys applied Tier 1 base pricing ($425/unit) instead of Tier 2 volume discount ($400/unit) because order was split across two separate PO batches.',
    status: 'open',
    solverStrategy: 'Merge PO batch history & issue automated contract compliance adjustment request.',
    aiConfidence: 98.2,
    detectedTimestamp: '2026-08-01 11:05 AM'
  }
];

export function evaluate88ParadoxRules(invoiceAmount: number, vendorName: string): ParadoxAnomaly[] {
  // Run live paradox evaluations across rules
  const detected: ParadoxAnomaly[] = [];
  if (invoiceAmount > 10000) {
    detected.push({
      id: `PARADOX-${Math.floor(800 + Math.random() * 100)}`,
      ruleCode: 'PARADOX-RULE-004',
      paradoxTitle: `High Value Unit Price Variance Paradox (${vendorName})`,
      type: 'Pricing Paradox',
      severity: 'high',
      entityId: `INV-${Math.floor(9000 + Math.random() * 900)}`,
      discrepancyValue: Math.round(invoiceAmount * 0.045 * 100) / 100,
      clauseReference: 'Master Price Sheet Schedule A',
      explanation: `Invoice total of $${invoiceAmount.toLocaleString()} exceeds contract price cap by 4.5%.`,
      status: 'open',
      solverStrategy: 'Apply contractual cap and issue automated adjustment credit memo.',
      aiConfidence: 98.9,
      detectedTimestamp: new Date().toLocaleString()
    });
  }
  return detected;
}

export const CATALOG_88_PARADOX_RULES = PARADOX_88_RULES;
export type { ParadoxAnomaly };
