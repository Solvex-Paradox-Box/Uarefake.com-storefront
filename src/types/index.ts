import type { JitSoftwareArtifact } from "../utils/jitCompiler";

// ==========================================
// CORE PLATFORM & B2B MARKETPLACE TYPES
// ==========================================

export interface SolutionItem {
  id: string;
  itemType: "Paradox Solution" | "Autonomous Business Template";
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  paradoxResolution?: string;
  price: number;
  pricingModel: "One-time" | "Monthly Subscription" | "Per-Transaction Fee" | "Annual Enterprise" | "Free";
  rating: number;
  reviewsCount: number;
  vendor: string;
  integrationPlatforms: string[];
  features: string[];
  badge?: string;
  iconName: string;
  imageUrl?: string;
  specs: Record<string, string>;
  // Autonomous Business Specific properties
  isAutonomousBusiness?: boolean;
  lotId?: string;
  lotNumber?: number;
  chamber?: string;
  wing?: string;
  outreachModel?: string;
  distributionModel?: string;
  grade?: string;
  priceEth?: number;
  priceUsdc?: number;
}

export interface SupplierBid {
  id: string;
  supplierName: string;
  rating: number;
  unitPrice: number;
  totalPrice: number;
  estimatedDays: number;
  shippingCarrier: string;
  complianceScore: number;
  aiRecommendationScore: number;
  notes: string;
}

export interface Shipment {
  id: string;
  poId: string;
  trackingNumber: string;
  carrier: string;
  origin: string;
  destination: string;
  currentLocation: string;
  eta: string;
  status: "In Transit" | "Dispatched" | "In Port" | "Customs Clearance" | "Out for Delivery" | "Delivered";
  transportMode: string;
  temperatureTelemetry?: string;
  gpsCoordinates: { lat: number; lng: number };
  milestones: { title: string; date: string; location: string; completed: boolean }[];
}

export interface ERPIntegration {
  id: string;
  name: string;
  category: string;
  status: "Connected" | "Syncing" | "Disconnected" | "Error";
  lastSync: string;
  totalEventsProcessed: number;
  icon: string;
}

export interface ProcurementAiRequest {
  prompt: string;
  targetBudget?: number;
  urgency: "Low" | "Medium" | "High" | "Critical";
  destination: string;
}

export interface ProcurementAiResponse {
  poTitle: string;
  summary: string;
  itemDescription: string;
  estimatedQuantity: number;
  estimatedUnitPrice: number;
  estimatedTotal: number;
  recommendedSuppliers: SupplierBid[];
  logisticsAdvice: string;
  riskAssessment: string;
}

export interface AppForgeConfig {
  id: string;
  appName: string;
  description: string;
  selectedCapabilities: string[];
  targetRuntime: "Node.js 20 ESM" | "Rust Core Engine" | "Python AI Container" | "Go Microservice";
  memoryAllocation: string;
  nodeCount: number;
  cryptographicHeader: string;
  createdAt: string;
  status: "Draft" | "Forged" | "Deployed" | "Active";
}

export interface BlackBoxAuditEvent {
  id: string;
  timestamp: string;
  eventType: "PO_FINALIZED" | "PAYMENT_CAPTURED" | "NODE_PROVISIONED" | "HEADER_VERIFIED" | "JIT_CODE_COMPILED" | "FORGE_APP_BUILT";
  nodeNumber: string;
  header380: string;
  hashSignature: string;
  status: "Verified" | "Tamper-Proof" | "Secured";
  details: string;
}

export interface RfqItem {
  id: string;
  rfqNumber: string;
  title: string;
  category: string;
  description: string;
  requiredNodeSpecs: string;
  targetBudget: number;
  bidsCount: number;
  status: "Open for Bids" | "Bids Received" | "Awarded" | "Closed";
  createdAt: string;
  bids: SupplierBid[];
}

export interface WorkflowRule {
  id: string;
  name: string;
  triggerEvent: string;
  action: string;
  status: "Active" | "Disabled";
  nodesCount: number;
  lastRun?: string;
}

export interface Paradox {
  id: number;
  name: string;
  description: string;
  chamber: 1 | 2 | 3 | 4 | 5;
  type?: "proprietary" | "historical";
  origin?: string;
  status?: string;
  successRate?: number;
}

export interface BrainProduct {
  id: string;
  name: string;
  description: string;
  category: string;
}

// ==========================================
// REPO-A TYPES (PARADOX OPERATOR & ENGINES)
// ==========================================

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId?: string;
  vendorName?: string;
  supplierName?: string;
  title?: string;
  itemDescription?: string;
  orderDate?: string;
  expectedDelivery?: string;
  totalAmount: number;
  unitPrice?: number;
  quantity?: number;
  currency?: string;
  shippingAddress?: string;
  destinationPort?: string;
  carrier?: string;
  trackingNumber?: string;
  createdAt?: string;
  paypalOrderId?: string;
  paypalPaymentStatus?: "APPROVED" | "COMPLETED" | "PENDING";
  paypalPayerEmail?: string;
  jitArtifact?: JitSoftwareArtifact;
  logs?: { timestamp: string; message: string; type: "info" | "success" | "warning" }[];
  status: "draft" | "pending_approval" | "submitted" | "fulfilled" | "cancelled" | "Draft" | "RFQ Sent" | "Bids Received" | "Approved" | "Payment Pending" | "Paid & Processing" | "In Transit" | "Completed" | "Cancelled";
  items?: {
    sku: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  contractClauseFreezeApplied?: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  poId: string;
  poNumber?: string;
  vendorId: string;
  vendorName?: string;
  issueDate?: string;
  dueDate?: string;
  amount: number;
  status: "pending_audit" | "approved" | "disputed" | "paid" | "flagged_anomaly";
  threeWayMatchStatus: "passed" | "quantity_mismatch" | "price_variance" | "missing_grn";
  riskScore: number;
  detectedAnomalies?: string[];
  currency?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  tier: "Strategic" | "Preferred" | "Standard" | "High Risk";
  country: string;
  complianceScore: number;
  rating: number;
  onboardingStatus: "Active" | "Pending KYC" | "Suspended" | "Audit Required";
  slaFulfillmentRate: number;
  activeContractsCount: number;
  contactEmail: string;
  verifiedSovereignStatus?: boolean;
}

export interface WarehouseItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  reorderPoint: number;
  unitCost: number;
  location: string;
  lastAudited: string;
  leadTimeDays: number;
  status: "In Stock" | "Low Stock" | "Reorder Triggered" | "Out of Stock";
  demandForecast30d: number;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  agentName?: string;
  actionType?: string;
  details?: string;
  status?: "success" | "warning" | "error" | "in_progress" | string;
  entityId?: string;
  entityType?: "PO" | "Invoice" | "Inventory" | "Vendor" | "Workflow" | "DaisyChain" | "ParadoxBox" | "Marketplace" | "MMTAI" | string;
  sourceModule?: string;
  level?: "info" | "success" | "warn" | "error" | "security_alert" | string;
  message?: string;
  metadata?: Record<string, any>;
}

export type DaisyNodeTypeCategory = 
  | "Ingestion & OCR" 
  | "Reconciliation & Match" 
  | "Paradox & Audit" 
  | "Risk & Compliance" 
  | "ERP & Ledger" 
  | "Payment & Treasury" 
  | "Logistics & IoT" 
  | "MMTAI & Security" 
  | "Marketplace Exchange";

export interface DaisyNode {
  id: string;
  nodeIndex: number;
  name: string;
  category: DaisyNodeTypeCategory;
  type: string;
  config: string;
  status: "idle" | "running" | "completed" | "error";
  latencyMs: number;
  dependencies: string[];
  inputs: Record<string, any>;
  outputs: Record<string, any>;
}

export interface DaisyChain {
  id: string;
  chainName: string;
  description: string;
  trigger: string;
  status: "active" | "paused" | "executing";
  nodes: DaisyNode[];
  executionsToday: number;
  lastSuccess: string;
  errorRatePct: number;
}

export type ParadoxCategory = 
  | "Pricing Paradox" 
  | "Phantom Inventory Paradox" 
  | "Double Billing Loop" 
  | "Currency FX Paradox" 
  | "Contract Inversion" 
  | "Tether Synaptic Discrepancy" 
  | "Rebate Tax Paradox" 
  | "MMTAI Transport Protocol Discrepancy"
  | "Quantum & Physics" 
  | "Epistemological" 
  | "Economic & Market" 
  | "Geopolitical & Sovereignty" 
  | "Legal & Ethical" 
  | "Cybernetic & Logical" 
  | "Cognitive & Behavioral" 
  | "Socio-Technical"
  | string;

export interface ParadoxRule {
  ruleCode: string;
  title: string;
  category: ParadoxCategory;
  severity: "critical" | "high" | "medium" | "low";
  clauseReference: string;
  auditLogic: string;
  actionStrategy: string;
}

export interface ParadoxAnomaly {
  id: string;
  ruleCode: string;
  paradoxTitle: string;
  type: ParadoxCategory;
  severity: "critical" | "high" | "medium" | "low";
  entityId: string;
  discrepancyValue: number;
  explanation: string;
  status: "open" | "resolving" | "resolved";
  solverStrategy: string;
  aiConfidence: number;
  detectedTimestamp: string;
  clauseReference: string;
}

export interface ParadoxSolverReport {
  paradoxId: string;
  rootCause: string;
  resolutionSteps: string[];
  financialImpactPrevented: number;
  suggestedVendorNotice: string;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  sku: string;
  category: string;
  supplierName: string;
  supplierId: string;
  quantityAvailable: number;
  minOrderQty: number;
  unitPrice: number;
  bulkDiscountPrice: number;
  leadTimeDays: number;
  location: string;
  complianceRating: number;
  status: "active" | "sold_out" | "bidding_open";
}

export interface MarketplaceBid {
  id: string;
  listingId: string;
  buyerName: string;
  quantity: number;
  offeredUnitPrice: number;
  totalOffer: number;
  bidTimestamp: string;
  status: "pending" | "accepted" | "countered" | "rejected";
}

export interface MMTAIPeer {
  peerId: string;
  nodeName: string;
  endpoint: string;
  protocolVersion: string;
  securityTier: "Level 4 Cryptographic" | "Level 3 Zero-Trust" | "Level 2 Standard";
  status: "online" | "syncing" | "offline";
  latencyMs: number;
}

export interface MMTAISecurityAudit {
  auditId: string;
  timestamp: string;
  eventType: "PAYLOAD_SIGNATURE_CHECK" | "ZERO_TRUST_TOKEN_VALIDATION" | "OFAC_SANCTIONS_SWEEP" | "RBAC_ACCESS_ATTEMPT" | "ENCRYPTION_KEY_ROTATION";
  actor: string;
  ipAddress: string;
  payloadHash: string;
  status: "PASSED" | "FAILED" | "FLAGGED";
  details: string;
}

export interface ParadoxSolution {
  id: string;
  title: string;
  type: "historical" | "proprietary" | "contract_security";
  category: string;
  description: string;
  b2bApplication: string;
  solverAlgorithm: string;
  status: "active" | "deployable" | "running";
  successRate: number;
  solvedCount: number;
}

export interface BusinessTemplate {
  id: string;
  templateName: string;
  category: "Procurement" | "Supply Chain" | "Finance & AP" | "Vendor Risk" | "ESG & Compliance" | "AI & JIT Engine" | "Operations" | "Security" | string;
  description: string;
  nodeCount: number;
  estimatedRoiMultiplier: string;
  deploymentsCount: number;
  difficulty: "Turnkey" | "Advanced" | "Enterprise Custom";
  status: "featured" | "popular" | "standard";
  tags: string[];
}

export interface JitBuildTask {
  id: string;
  targetModule: string;
  sourceCode: string;
  compiledAst: string;
  status: "queued" | "synthesizing" | "compiling" | "deployed" | "error";
  buildTimeMs: number;
  dependencies: string[];
  outputBundleHash: string;
  generatedTimestamp: string;
}

export interface AgenticGoalNode {
  id: string;
  goalTitle: string;
  subGoals: string[];
  currentThought: string;
  recursionDepth: number;
  maxDepth: number;
  confidenceScore: number;
  executionStatus: "planning" | "evaluating" | "executing" | "solved";
  decisionPath: string[];
}

export interface AgentBrainState {
  brainId: string;
  cognitiveLoadPct: number;
  activeAgentsCount: number;
  activeGoals: AgenticGoalNode[];
  memoryBufferLength: number;
  lastReflection: string;
}

export type DaisySandboxCategory =
  | "Infrastructure Growth"
  | "Knowledge Expansion"
  | "Technological and Coding Development"
  | "Application and Software Hyper Acceleration"
  | "Logic Stress Testing"
  | "Compliance Immutability"
  | "Concept Ideating"
  | "Concept Development"
  | "Development Production"
  | "Production Refinement"
  | "Architecture Hierarchy and Dominance Assessment"
  | "Skills"
  | "Achieving the Impossible the Proprietary Way";

export interface SolutionPricingResearch {
  estimatedMarketValuation: number;
  suggestedMonthlySaaSPrice: number;
  suggestedPerTxnFee: number;
  devHoursSavedPerYear: number;
  estimatedRoiMultiplier: string;
  competitiveBenchmark: string;
  pricingRationale: string;
}

export interface StagedMarketplaceSolution {
  solutionId: string;
  problemStatement: string;
  sandboxCategory: DaisySandboxCategory;
  groundingCategory: string;
  generatedAstPatchCode: string;
  actionableSteps: string[];
  pricingResearch: SolutionPricingResearch;
  approvalStatus: "staged_pending_owner_approval" | "approved_public_marketplace" | "rejected_sandbox_retained";
  stagedTimestamp: string;
  approvedTimestamp?: string;
  proofHash: string;
}

export interface TrueThoughtLogicBubble {
  bubbleId: string;
  discoverySource: string;
  paradoxRuleId: number;
  proprietaryParadoxId: number;
  connectedDaisyNodeId: number;
  synapticTetherCoherence: number;
  coreInsight: string;
  astLogicSnippet: string;
  category: DaisySandboxCategory;
  proofHash: string;
  timestamp: string;
  isRetainedInBrain: boolean;
}

export interface TetherSynapticLoopCycle {
  cycleIndex: number;
  firingTimestamp: string;
  activeParadoxRule: number;
  activeProprietaryParadox: number;
  activeDaisyNode: number;
  tetherResonanceFrequency: string;
  coherenceScore: number;
  generatedLogicBubble?: TrueThoughtLogicBubble;
}

export interface DaisyChatMessage {
  id: string;
  sender: "user" | "daisy_ai";
  text: string;
  timestamp: string;
  problemSolution?: any;
  synapticTruthResult?: any;
  stagedSolution?: StagedMarketplaceSolution;
  actionType?: "problem_solved" | "already_exists" | "sandbox_experiment" | "marketplace_approval" | "truth_check" | "chat";
}

export interface MMTAIGroundingVerificationResult {
  isFactualAndVerified: boolean;
  direction: "INBOUND_INFRASTRUCTURE" | "OUTBOUND_WORLD_CHAT";
  factualityScore: number;
  checkedAgainst88ParadoxRules: boolean;
  solvexBlackBoxShielded: boolean;
  verificationHash: string;
  auditTrail: string[];
  timestamp: string;
}

export interface SolvexBlackBoxContainer {
  blackBoxId: string;
  originalComponentTitle: string;
  obfuscatedZkpBytecode: string;
  crystalClearVerificationProof: string;
  isProprietaryProtected: true;
  mmtaiComplianceStamp: string;
}

export interface SovereignSale380HeaderRecord {
  saleId: string;
  itemTitle: string;
  buyerIdentity: string;
  exact380CharacterHeader: string;
  nodeSuffix?: string;
  finalNodeBoundHeader: string;
  timestamp: string;
  amountUsd: number;
  solvexProofHash: string;
}

// ==========================================
// DAISY HAMINJA DIALECTIC REGISTRY TYPES
// ==========================================

export interface ParadoxDefinition {
  id: number;
  code: string;
  name: string;
  category: string;
  description: string;
  crossFirePairId: number;
  crossFireConcept: string;
  dialecticWeight: number;
  resolutionFormula: string;
  verifiedSourceDomain: string;
}

export type NodeRole = 
  | "Alpha Core Node" 
  | "Tether Bubble Relay" 
  | "ZK Lockbox Vault" 
  | "Verified Crawler" 
  | "Cross-Fire Processor" 
  | "Edge Telemetry Gateway"
  | string;

export interface MeshNode {
  id: string;
  name: string;
  role: NodeRole;
  cluster: "Alpha Core" | "Beta Relay" | "Gamma Lockbox" | "Delta Crawler" | "Epsilon Edge" | string;
  ipAddress: string;
  status: "OPTIMAL" | "ACTIVE" | "SYNCING" | "FAILOVER_STANDBY" | "DEGRADED" | "active" | "syncing" | "quarantined" | "idle";
  latencyMs: number;
  tetherBubbleRadiusKm: number;
  routingLoadPct: number;
  memoryUsagePct: number;
  uptimeSeconds: number;
  zkKeyHash: string;
}

export type SourceDomain = "edu" | "gov" | "wikipedia" | "law" | "human_rights" | "academic_journal" | string;

export interface VerifiedKnowledgeSource {
  id: string;
  title: string;
  domain: SourceDomain;
  url: string;
  authorityScore: number;
  lastCrawledISO: string;
  recordCount: number;
  zkHashProof: string;
  status: "VERIFIED" | "CRAWLING" | "VALIDATING";
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  domain: string;
  sourceType: SourceDomain;
  confidenceScore: number;
  connectionsCount: number;
}

export interface KnowledgeGraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string;
  weight: number;
}

export interface SynthesizedSolution {
  id: string;
  title: string;
  problemStatement: string;
  paradoxesCrossFired: number[];
  dualTrackSynthesis: {
    trackA_Analytic: string;
    trackB_Dialectic: string;
    synthesizedResolution: string;
  };
  zkLockboxHash: string;
  version: string;
  timestampISO: string;
  confidenceScore: number;
  verifiedCitations: string[];
  ipStatus: "LOCKED" | "EXPORTED" | "VERIFIED_ON_MESH";
}

export interface B2BProblemRequest {
  id: string;
  category: "Supply Chain Paradox" | "Resource Allocation" | "Market Entry Strategy" | "Macroeconomic Hedging" | "Regulatory Arbitrage" | "Capital Deployment" | string;
  title: string;
  description: string;
  financialImpactEstimate: string;
  constraints: string[];
}

export interface B2BSolutionResult {
  requestId: string;
  strategicFramework: string;
  economicModel: {
    roiProjection: string;
    riskMitigationPct: number;
    capitalEfficiencyGain: string;
  };
  actionPlan: string[];
  paradoxResolutionMapping: string;
  verifiedSourcesUsed: string[];
}

export interface ConflictCase {
  id: string;
  region: string;
  title: string;
  actors: string[];
  escalationLevel: 1 | 2 | 3 | 4 | 5;
  rootCauses: string[];
  gameTheoryMatrix: {
    zeroSumOutcome: string;
    winWinSynthesis: string;
  };
  deEscalationSteps: string[];
  humanRightsStandardsApplied: string[];
}

export type CommunicatorMode = "INTERNAL_POLITICAL" | "EXTERNAL_PROFESSIONAL";

export interface SemanticFilterMetrics {
  originalText: string;
  sanitizedText: string;
  profanityDetected: boolean;
  slursDetected: boolean;
  hostileToneScore: number;
  filterActionTaken: "PASS_CLEAN" | "NEUTRALIZED" | "SILENT_SUPPRESSION" | "SANITIZED";
  detectedTriggers: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "daisy_ai";
  mode: CommunicatorMode;
  content: string;
  rawInternalReasoning?: string;
  semanticMetrics?: SemanticFilterMetrics;
  verifiedCitations?: string[];
  timestampISO: string;
}

export interface ComplianceControl {
  id: string;
  standard: "EAL6+" | "NIST SP 800-53" | "ISO 27001" | "SOC2 Type II" | "ZK Cryptography" | string;
  code: string;
  name: string;
  status: "COMPLIANT" | "AUDITED" | "ENFORCED" | "compliant" | "warning" | "non_compliant" | "auditing";
  lastVerifiedISO: string;
  proofHash: string;
}

export interface AuditLogEntry {
  id: string;
  timestampISO: string;
  action: string;
  actor: string;
  module: string;
  zkProof: string;
  severity: "INFO" | "SECURITY" | "SYNTHESIS" | "FAILOVER";
}

export interface RegistryVerificationStatus {
  paradoxRegistry88Loaded: boolean;
  mesh54NodeTopologyReady: boolean;
  solutionFrameworkActive: boolean;
  verifiedCorpusGroundingReady: boolean;
  communicationProtocolsSecured: boolean;
  b2bEconomicSolverMounted: boolean;
  conflictEngineCalibrated: boolean;
  autonomousSynthesisTriggersOnline: boolean;
  overallScore: number;
}

// ==========================================
// USER AUTHENTICATION & PROFILE TYPES
// ==========================================

export interface UserBillingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UserPreferences {
  theme?: 'dark' | 'midnight' | 'matrix';
  emailNotifications?: boolean;
  twoFactorEnabled?: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'Customer' | 'Enterprise Buyer' | 'Procurement Specialist' | 'Sovereign Administrator';
  accountType: 'Individual' | 'Corporate B2B' | 'Developer';
  avatarUrl?: string;
  createdAt: string;
  phone?: string;
  billingAddress?: UserBillingAddress;
  preferences?: UserPreferences;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserAccount;
  token?: string;
  error?: string;
  message?: string;
}

// ==========================================
// SHOPPING CART & CHECKOUT TYPES
// ==========================================

export type LicenseTierType = 'Standard Single-Node' | 'Enterprise Multi-Node' | 'Unlimited Sovereign Mesh';

export interface CartItem {
  id: string;
  solutionId: string;
  title: string;
  description: string;
  category: string;
  itemType: 'Paradox Solution' | 'Autonomous Business Template';
  price: number;
  pricingModel: string;
  quantity: number;
  imageUrl?: string;
  iconName?: string;
  vendor?: string;
  paradoxResolution?: string;
  features?: string[];
  specs?: Record<string, string>;
  licenseTier: LicenseTierType;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 15 for 15%, or 50 for $50 off
  description: string;
  minSpend?: number;
}

export interface CartSummary {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  promoCodeApplied?: string;
  taxAmount: number;
  escrowFee: number;
  total: number;
}

export interface CheckoutCustomerInfo {
  name: string;
  email: string;
  company: string;
  phone: string;
  billingAddress: UserBillingAddress;
}

export interface CheckoutDeploymentConfig {
  nodeNumber: string;
  domainTarget: string;
  cloudProvider: 'AWS Sovereign Cloud' | 'Google Cloud Vertex' | 'Azure Quantum Mesh' | 'On-Premises Air-Gapped';
  licenseTier: LicenseTierType;
  autoDeploy: boolean;
}

export interface CheckoutPaymentPayload {
  method: 'credit-card' | 'paypal' | 'net30-wire' | 'crypto-escrow';
  cardDetails?: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    brand: string;
  };
  paypalOrderId?: string;
  corporatePoNumber?: string;
  taxId?: string;
  cryptoWalletAddress?: string;
  cryptoNetwork?: 'XRPL' | 'Solana' | 'Ethereum';
}

export interface CheckoutOrderReceipt {
  orderId: string;
  poNumber: string;
  timestamp: string;
  customer: CheckoutCustomerInfo;
  items: CartItem[];
  summary: {
    subtotal: number;
    discount: number;
    tax: number;
    escrowFee: number;
    total: number;
  };
  payment: {
    method: string;
    status: 'SETTLED' | 'ESCROW_LOCKED' | 'AUTHORIZED';
    transactionId: string;
  };
  deployment: CheckoutDeploymentConfig;
  merkleProofHash: string;
  licenseKeys: { solutionId: string; title: string; key: string }[];
}

export interface PurchasedSolutionItem {
  id: string;
  lotId: string;
  title: string;
  category: string;
  purchasedAt: string;
  price: number;
  currency: string;
  licenseKey: string;
  licenseTier: LicenseTierType;
  merkleProof: string;
  status: 'ACTIVE' | 'DEPLOYED' | 'UNLOCKED';
  downloadUrl?: string;
  sourceCodeZip?: string;
  capabilities: string[];
  runtimeTarget: string;
}


