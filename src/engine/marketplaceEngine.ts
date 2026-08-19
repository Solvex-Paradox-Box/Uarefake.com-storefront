import { MarketplaceListing, MarketplaceBid, BusinessTemplate } from '../types';

const TEMPLATE_CATEGORIES: BusinessTemplate['category'][] = [
  'Procurement', 'Supply Chain', 'Finance & AP', 'Vendor Risk', 
  'ESG & Compliance', 'AI & JIT Engine', 'Operations', 'Security'
];

const TEMPLATE_TITLES = [
  "Purchase-to-Pay Autonomous Daisy Chain", "Tether Bubble Synaptic Paradox Auditor", "Multi-Tier Vendor Risk Sentinel", "Safety Stock Cascade & Auto-RFQ",
  "Just-In-Time Microcontroller Reorder", "Multi-Currency FX Spot Hedger", "UAREFAKE Authenticity Protocol Auditor", "Contract Rebate & Volume Reclaimer",
  "Warranty Claim Auto-Dispatcher", "Cross-Border Compliance Bot", "B2B Spot Marketplace RFQ Auctioneer", "MMTAI Zero-Trust Ledger Auditor",
  "OCR Intelligent Line Item Extractor", "3-Way Invoice Matching Paradox Guard", "Early Payment Discount Optimizer", "Sanctions & OFAC Real-Time Sweep", "Warehouse Telemetry Buffer Balancing", "Autonomous Purchase Order Generator", "Vendor SLA Penalty Calculator", "Dynamic Spot Pricing Arbitrage",
  "ERP NetSuite/SAP Journal Sync", "Contract Clause Freeze Enforcer", "Tariff & Excise Duty Calculator", "Supply Chain Bottleneck Predictor",
  "Recursive Reasoning Goal Resolver", "JIT AST Module Synthesizer", "Cryptographic Signature Validator", "Double Billing Duplication Shield",
  "Quality Defect RMA Dispatcher", "Rebate Tax Credit Claim Matrix", "Vendor Compliance Scorecard Engine", "Autonomous B2B RFQ Counter-Offer Bot",
  "Consolidated Node Route Planner", "IoT Sensor Telemetry Monitor", "AP Voucher Batch Dispatcher", "Automated Supplier Onboarding Bot"
];

export const CATALOG_105_BUSINESS_TEMPLATES: BusinessTemplate[] = Array.from({ length: 105 }).map((_, idx) => {
  const num = idx + 1;
  const id = `TMPL-B2B-${num.toString().padStart(3, '0')}`;
  const category = TEMPLATE_CATEGORIES[idx % TEMPLATE_CATEGORIES.length];
  const titleBase = TEMPLATE_TITLES[idx % TEMPLATE_TITLES.length];
  const templateName = idx < TEMPLATE_TITLES.length ? titleBase : `${titleBase} Template #${num}`;
  
  return {
    id,
    templateName,
    category,
    description: `Turnkey autonomous B2B workflow template featuring multi-node Daisy pipeline integration, Paradox anomaly audit rules, and real-time ERP ledger synchronization.`,
    nodeCount: 4 + (num % 8),
    estimatedRoiMultiplier: `${(3.5 + (num % 12) * 0.4).toFixed(1)}x ROI`,
    deploymentsCount: 340 + num * 27,
    difficulty: num % 3 === 0 ? 'Enterprise Custom' : num % 2 === 0 ? 'Advanced' : 'Turnkey',
    status: num <= 10 ? 'featured' : num <= 30 ? 'popular' : 'standard',
    tags: ['Daisy Chain', 'Paradox Box', 'MMTAI Security', category]
  };
});

export const INITIAL_MARKETPLACE_LISTINGS: MarketplaceListing[] = [

  {
    id: 'MKT-101',
    title: 'Industrial ARM Cortex-M4 Microcontroller Boards',
    sku: 'MCU-IND-900',
    category: 'Semiconductors & Chips',
    supplierName: 'Apex Semiconductor Components',
    supplierId: 'V-101',
    quantityAvailable: 4500,
    minOrderQty: 100,
    unitPrice: 85.00,
    bulkDiscountPrice: 72.50,
    leadTimeDays: 4,
    location: 'West Coast Hub (San Jose)',
    complianceRating: 99.2,
    status: 'active'
  },
  {
    id: 'MKT-102',
    title: '2U Server Chassis - Extruded Anodized Aluminum',
    sku: 'CHS-2U-ALU',
    category: 'Structural Assemblies',
    supplierName: 'LogiMatrix Freight & Components',
    supplierId: 'V-102',
    quantityAvailable: 1200,
    minOrderQty: 50,
    unitPrice: 240.00,
    bulkDiscountPrice: 210.00,
    leadTimeDays: 7,
    location: 'EU Logistics Depot (Frankfurt)',
    complianceRating: 97.8,
    status: 'active'
  },
  {
    id: 'MKT-103',
    title: 'High-Temperature Thermal Interface Shielding Paste',
    sku: 'THM-SHLD-01',
    category: 'Chemicals & Coatings',
    supplierName: 'Titanium Alloys & Materials',
    supplierId: 'V-103',
    quantityAvailable: 8000,
    minOrderQty: 200,
    unitPrice: 50.00,
    bulkDiscountPrice: 42.00,
    leadTimeDays: 3,
    location: 'APAC Central Hub (Singapore)',
    complianceRating: 98.5,
    status: 'bidding_open'
  }
];

export const INITIAL_MARKETPLACE_BIDS: MarketplaceBid[] = [
  {
    id: 'BID-501',
    listingId: 'MKT-101',
    buyerName: 'Solvex Enterprise Operations Hub',
    quantity: 500,
    offeredUnitPrice: 75.00,
    totalOffer: 37500.00,
    bidTimestamp: '2026-08-03 07:15:00',
    status: 'pending'
  }
];
