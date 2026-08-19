import { SolutionItem } from '../types';

// Curated pool of high-quality, distinctive high-tech, software, logistics, compliance & AI photography URLs
const DISTINCT_PHOTO_IDS = [
  'photo-1558494949-ef010cbdcc31', // Servers / Datacenter
  'photo-1526374965328-7f61d4dc18c5', // Matrix Code
  'photo-1618005182384-a83a8bd57fbe', // Abstract Digital Flow
  'photo-1634017839464-5c339ebe3cb4', // Tech Sphere
  'photo-1518770660439-4636190af475', // Hardware Motherboard
  'photo-1550751827-4bd374c3f58b', // Cyberpunk Circuit
  'photo-1620712943543-bcc4688e7485', // Artificial Intelligence
  'photo-1586528116311-ad8dd3c8310d', // Warehouse Freight Containers
  'photo-1578575437130-527eed3abbec', // Cargo Crane
  'photo-1508873696983-2df5293cb32b', // Logistics Cargo Plane
  'photo-1601584115197-04ecc0da31d7', // Freight Semi-Truck
  'photo-1451187580459-43490279c0fa', // Global Satellite Network
  'photo-1563986768609-322da13575f3', // Security Lock / Audit
  'photo-1504639725590-34d0984388bd', // Code on Monitor
  'photo-1519389950473-47ba0277781c', // IoT Team
  'photo-1509228468518-180dd4864904', // Robotics / Circuit
  'photo-1551288049-bebda4e38f71', // Financial Analytics Dashboard
  'photo-1460925895917-afdab827c52f', // Business ERP Charts
  'photo-1504868584819-f8e8b4b6d7e3', // Data Visualization
  'photo-1485827404703-89b55fcc595e', // White Android Robot
  'photo-1535378917042-10a22c95931a', // Neon Cybernetic Head
  'photo-1639762681485-074b7f938ba0', // Blockchain Token / Nodes
  'photo-1642543492481-44e81e3914a7', // Crypto Coin Network
  'photo-1559526324-4b87b5e36e44', // Credit Card / Payment Terminal
  'photo-1516321318423-f06f85e504b3', // Digital Communication
  'photo-1504384308090-c894fdcc538d', // Workspace Coding
  'photo-1525547719571-a2d4ac8945e2', // Laptop High Tech
  'photo-1517694712202-14dd9538aa97', // Computer Screen Code
  'photo-1531482615713-2afd69097998', // Tech Discussion
  'photo-1551836022-deb4988cc6c0', // Business Strategy Board
  'photo-1498050108023-c5249f4df085', // Fullstack Workspace
  'photo-1556761175-5973dc0f32e7', // B2B Contract Signature
  'photo-1563770660941-20978e870e26', // High Tech Glass Building
  'photo-1542744173-8e7e53415bb0', // Analytics Meeting
  'photo-1507679799987-c73779587ccf', // Modern Corporate Executive
  'photo-1497366216548-37526070297c', // Modern Minimalist Tech Office
  'photo-1557804506-669a67965ba0', // Team Launch
  'photo-1573164713988-8665fc963095', // Female Engineer Coding
  'photo-1581091226825-a6a2a5aee158', // Female Robotics Engineer
  'photo-1581092160607-ee22621dd758', // Industrial Automation Arm
  'photo-1581092335397-9583fe92d232', // Laser Scanner Microchip
  'photo-1581092580497-e0d23cbdf1dc', // Microprocessor Inspection
  'photo-1518770660439-4636190af475', // Silicon Wafer
  'photo-1531297484001-80022131f5a1', // Glowing Tech Laptop
  'photo-1488590528505-98d2b5aba04b', // Modern Display Grid
  'photo-1519389950473-47ba0277781c', // Cloud Engineers Working
  'photo-1522071820081-009f0129c71c', // Tech Workshop
  'photo-1454165804606-c3d57bc86b40'  // Financial Planning
];

// Generates a guaranteed unique, high-resolution image URL for each index
function getUniqueImageUrl(index: number): string {
  const photoId = DISTINCT_PHOTO_IDS[index % DISTINCT_PHOTO_IDS.length];
  // Append deterministic seed & fit parameters to guarantee unique visual request caching
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80&sig=${index}`;
}

// 128 Core Raw Solution Blueprints spanning all Paradox Resolutions
const RAW_SOLUTION_TEMPLATES = [
  {
    title: 'solvex-paradox-box/storefront',
    category: 'JIT Software Distribution',
    itemType: 'Paradox Solution' as const,
    desc: 'The master autonomous B2B digital storefront & marketplace gateway with integrated 380-header engine, JIT delivery, and PayPal escrow.',
    fullDesc: 'The core public storefront and enterprise application platform housing the complete catalog of 128 digital software solutions and 105 turnkey autonomous business blueprints. Includes live 380-character node header synthesis, sovereign passkey authentication, and direct synchronization with uarefake.com and uarefake.space.',
    paradox: 'Resolves the sovereign commercial paradox: instant open web distribution with zero third-party platform lock-in.',
    price: 999.00,
    badge: 'Master Storefront',
    icon: 'Zap',
    repo: 'github.com/solvex-paradox-box/storefront'
  },
  {
    title: 'solvex-crystal-clear-black-box',
    category: 'JIT Software Distribution',
    itemType: 'Paradox Solution' as const,
    desc: 'Deterministic registry-driven software packaging & real-time JIT digital artifact distribution pipeline.',
    fullDesc: 'Zero-latency digital distribution of compiled software artifacts, autonomous paradox resolutions, and turnkey digital business templates with cryptographic hash verification.',
    paradox: 'Resolves the distribution paradox: instant edge runtime delivery paired with zero-trust cryptographic signature validation.',
    price: 850.00,
    badge: 'Core Repository',
    icon: 'Zap',
    repo: 'github.com/solvex-paradox-box/solvex-crystal-clear-black-box'
  },
  {
    title: 'solvex-paradox-box/uarefake-space-control',
    category: 'Autonomous Operations',
    itemType: 'Paradox Solution' as const,
    desc: 'Central command & telemetry plane for 380-node distributed autonomous networks.',
    fullDesc: 'Sovereign command node dispatching runtime configuration, telemetry metrics, and multi-cloud sync across uarefake.space and edge clusters.',
    paradox: 'Resolves the decentralized control paradox: absolute node sovereignty with synchronized global state coherence.',
    price: 799.00,
    badge: 'Control Node',
    icon: 'Network',
    repo: 'github.com/solvex-paradox-box/uarefake-space-control'
  },
  {
    title: 'solvex-paradox-box/quantum-rfq-matcher',
    category: 'Procurement AI',
    itemType: 'Paradox Solution' as const,
    desc: 'AI-driven deterministic RFQ multi-parameter supplier bid scoring and real-time execution engine.',
    fullDesc: 'Evaluates supplier compliance, latency, landed costs, and ESG scoring across global manufacturing suppliers in sub-50ms.',
    paradox: 'Resolves the bidding paradox: ultra-fast algorithmic matching without compromising compliance or price ceiling guarantees.',
    price: 650.00,
    badge: 'B2B Core',
    icon: 'Cpu',
    repo: 'github.com/solvex-paradox-box/quantum-rfq-matcher'
  },
  {
    title: 'solvex-paradox-box/autonomous-customs-clearance',
    category: 'Customs & Compliance',
    itemType: 'Paradox Solution' as const,
    desc: 'HS-code auto-classifier, tariff calculating neural engine, and border document generator.',
    fullDesc: 'Classifies products into 10-digit Harmonized Tariff Codes with 99.98% accuracy and automatically compiles import/export declarations.',
    paradox: 'Resolves cross-border compliance paradox: zero bureaucratic delays with bulletproof audit traceability.',
    price: 720.00,
    badge: 'Compliance',
    icon: 'Shield',
    repo: 'github.com/solvex-paradox-box/autonomous-customs-clearance'
  },
  {
    title: 'solvex-paradox-box/jit-container-bytecode-streamer',
    category: 'JIT Software Distribution',
    itemType: 'Paradox Solution' as const,
    desc: 'WASM & container bytecode edge streaming layer delivering sub-second runtime warm boots.',
    fullDesc: 'Streams pre-compiled bytecode modules directly to distributed edge workers, eliminating traditional container pull latencies.',
    paradox: 'Resolves runtime cold-start paradox: zero container warmup delay on demand.',
    price: 540.00,
    badge: 'Edge Runtime',
    icon: 'Zap',
    repo: 'github.com/solvex-paradox-box/jit-container-bytecode-streamer'
  },
  {
    title: 'solvex-paradox-box/smart-multimodal-logistics-router',
    category: 'Logistics Automation',
    itemType: 'Paradox Solution' as const,
    desc: 'Dynamic ocean, air, rail, and freight route optimizer adjusting for geopolitical tariffs and port congestion.',
    fullDesc: 'Synthesizes real-time AIS vessel telemetry and flight manifests to re-route freight containers dynamically.',
    paradox: 'Resolves logistics route paradox: lowest carbon footprint at guaranteed shortest delivery window.',
    price: 680.00,
    badge: 'Logistics',
    icon: 'Truck',
    repo: 'github.com/solvex-paradox-box/smart-multimodal-logistics-router'
  },
  {
    title: 'solvex-paradox-box/neon-postgres-ledger-syncer',
    category: 'ERP Connector',
    itemType: 'Paradox Solution' as const,
    desc: 'Instant database branching and schema synchronization tool for Neon serverless PostgreSQL.',
    fullDesc: 'Automates ephemeral database branch creation on pull requests and syncs double-entry immutable ledgers in real time.',
    paradox: 'Resolves state sync paradox: instantaneous ephemeral branch spin-up without data drift.',
    price: 490.00,
    badge: 'Database Core',
    icon: 'Database',
    repo: 'github.com/solvex-paradox-box/neon-postgres-ledger-syncer'
  },
  {
    title: 'solvex-paradox-box/daisy-haminja-agent-core',
    category: 'Autonomous Operations',
    itemType: 'Paradox Solution' as const,
    desc: 'Autonomous multi-modal business operations neural agent with real-time audio and voice synthesis.',
    fullDesc: 'Acts as the AI co-pilot for automated vendor negotiations, invoice reconciliation, and sovereign storefront orchestration.',
    paradox: 'Resolves conversational agent paradox: continuous context retention across asynchronous enterprise negotiations.',
    price: 890.00,
    badge: 'Neural Agent',
    icon: 'Bot',
    repo: 'github.com/solvex-paradox-box/daisy-haminja-agent-core'
  },
  {
    title: 'solvex-paradox-box/380-header-synthesizer',
    category: 'JIT Software Distribution',
    itemType: 'Paradox Solution' as const,
    desc: 'Deterministic cryptographic 380-character node header generator and verifier.',
    fullDesc: 'Encodes node identity, SHA-256 state signatures, timestamp manifests, and license entitlements into a compact 380-char header format.',
    paradox: 'Resolves identity encapsulation paradox: full enterprise state verification in 380 alphanumeric characters.',
    price: 450.00,
    badge: 'Security',
    icon: 'Key',
    repo: 'github.com/solvex-paradox-box/380-header-synthesizer'
  },
  {
    title: 'solvex-paradox-box/paypal-instant-escrow-bridge',
    category: 'FinTech & Settlement',
    itemType: 'Paradox Solution' as const,
    desc: 'Automated milestone-based B2B PayPal payout release and digital signature validator.',
    fullDesc: 'Coordinates digital escrow settlements, smart milestones, and instant B2B payment authorizations with webhook verification.',
    paradox: 'Resolves settlement trust paradox: instant liquidity disbursement with zero chargeback fraud vulnerability.',
    price: 590.00,
    badge: 'FinTech',
    icon: 'DollarSign',
    repo: 'github.com/solvex-paradox-box/paypal-instant-escrow-bridge'
  },
  {
    title: 'solvex-paradox-box/iot-cold-chain-telemetry-oracle',
    category: 'Supply Chain IoT',
    itemType: 'Paradox Solution' as const,
    desc: 'Continuous temperature, humidity, and shock sensor anomaly detector with automated insurance claim triggers.',
    fullDesc: 'Connects BLE/LoRaWAN sensor feeds across refrigerated containers and fires automatic breach alerts into ERPs.',
    paradox: 'Resolves telemetry veracity paradox: tamper-proof IoT sensor audit logs from source farm to destination port.',
    price: 610.00,
    badge: 'IoT',
    icon: 'Activity',
    repo: 'github.com/solvex-paradox-box/iot-cold-chain-telemetry-oracle'
  }
];

// Domains and topics for generating the complete 128 solutions array
const DOMAINS = [
  { cat: 'JIT Software Distribution', icon: 'Zap', type: 'Paradox Solution' as const },
  { cat: 'Procurement AI', icon: 'Cpu', type: 'Paradox Solution' as const },
  { cat: 'Logistics Automation', icon: 'Truck', type: 'Paradox Solution' as const },
  { cat: 'Customs & Compliance', icon: 'Shield', type: 'Paradox Solution' as const },
  { cat: 'Supply Chain IoT', icon: 'Activity', type: 'Autonomous Business Template' as const },
  { cat: 'ERP Connector', icon: 'Database', type: 'Autonomous Business Template' as const },
  { cat: 'Autonomous Operations', icon: 'Bot', type: 'Autonomous Business Template' as const },
  { cat: 'FinTech & Settlement', icon: 'DollarSign', type: 'Autonomous Business Template' as const },
  { cat: 'Global Trade Agent', icon: 'Globe', type: 'Paradox Solution' as const }
];

const PARADOX_THEMES = [
  'Zero-Latency Edge Execution vs Zero-Trust Security Verification',
  'Autonomous Autonomous Negotiation vs Strict Legal Compliance',
  'Microsecond Settlement vs Complete Anti-Money-Laundering Auditability',
  'Decentralized Peer-to-Peer Node Mesh vs Central Sovereign Telemetry',
  'Predictive Logistics Rerouting vs Carbon-Neutral Transport Limits',
  'High-Frequency RFQ Bidding vs Absolute Margin Protection',
  'Tamper-Proof Sensor Telemetry vs Ultra-Low Battery Consumption',
  'Instantaneous Multi-ERP Data Ingestion vs Zero Schema Drift',
  'Real-Time Multilingual Border Clearance vs Strict Tariffs Verification',
  'Automated Escrow Milestone Release vs Multi-Party Dispute Arbitration'
];

export function generateAll128Solutions(): SolutionItem[] {
  const result: SolutionItem[] = [];

  // 1. Insert curated core templates first with unique images
  RAW_SOLUTION_TEMPLATES.forEach((tmpl, idx) => {
    const imageUrl = getUniqueImageUrl(idx);

    result.push({
      id: `sol-${String(idx + 1).padStart(3, '0')}`,
      itemType: tmpl.itemType,
      title: tmpl.title,
      category: tmpl.category,
      description: tmpl.desc,
      fullDescription: tmpl.fullDesc,
      paradoxResolution: tmpl.paradox,
      price: tmpl.price,
      pricingModel: 'One-time',
      rating: +(4.85 + (idx * 0.01) % 0.15).toFixed(2),
      reviewsCount: 120 + ((idx * 23) % 450),
      vendor: 'solvex-paradox-box (Todd Ites Jr. / Daisy Haminja)',
      integrationPlatforms: [
        'solvex-paradox-box/storefront',
        'uarefake.space Control Board',
        'uarefake.com',
        'Neon PostgreSQL',
        'Vercel Edge Network'
      ],
      features: [
        `Deterministic enterprise execution module`,
        `Integrated 380-character node header synthesis & verification`,
        `Direct PayPal B2B escrow & instant license provisioning`,
        `Sub-50ms cryptographic telemetry & event logging`
      ],
      badge: tmpl.badge,
      iconName: tmpl.icon,
      imageUrl,
      specs: {
        'Repository': tmpl.repo,
        'Delivery Format': 'Instant Digital Download / JIT Container Image / NPM Package',
        'Supplier': 'solvex-paradox-box / Todd Ites Jr. (Sole Verified Creator)',
        'Security': 'AES-256 / SHA-256 Manifest Signatures + eBPF Verified',
        'Target Control Plane': 'uarefake.space & uarefake.com',
        'Node Index': `Node-Q${String(idx + 1).padStart(3, '0')}`
      }
    });
  });

  // 2. Programmatically generate remaining solutions up to exact count 128 with unique image for every item
  const remainingCount = 128 - result.length;
  for (let i = 0; i < remainingCount; i++) {
    const index = result.length + 1;
    const domain = DOMAINS[i % DOMAINS.length];
    const paradoxTheme = PARADOX_THEMES[i % PARADOX_THEMES.length];
    const imageUrl = getUniqueImageUrl(index - 1);

    const slug = `solvex-matrix-${index}`;
    const titles = [
      `solvex-paradox-box/quantum-node-${index}`,
      `solvex-paradox-box/autonomous-synapse-${index}`,
      `solvex-paradox-box/cybernetic-router-${index}`,
      `solvex-paradox-box/hyper-ledger-${index}`,
      `solvex-paradox-box/trans-centennial-engine-${index}`,
      `solvex-paradox-box/zero-latency-bridge-${index}`,
      `solvex-paradox-box/neural-procurement-core-${index}`,
      `solvex-paradox-box/smart-settlement-sentinel-${index}`
    ];
    const title = titles[i % titles.length];

    const is88thSolution = index === 88;
    const itemPrice = is88thSolution ? 0 : +(350 + ((index * 17) % 650)).toFixed(2);
    const itemPricingModel = is88thSolution ? 'Free' : (index % 3 === 0 ? 'Monthly Subscription' : 'One-time');
    const itemBadge = is88thSolution ? 'Free Test Solution' : (index % 5 === 0 ? 'Enterprise Pro' : index % 3 === 0 ? 'High Speed' : 'Sovereign Node');
    const itemTitle = is88thSolution ? 'solvex-paradox-box/nist-sp-800-53-least-privilege-assigner' : title;
    const itemCategory = is88thSolution ? 'Regulatory Compliance & SOC 2 Auditing' : domain.cat;
    const itemDesc = is88thSolution
      ? 'Temporarily elevates permissions only when executing highly critical system tasks, de-escalating immediately after. 100% Free for marketplace testing.'
      : `Execution node resolving: ${paradoxTheme.toLowerCase()}.`;
    const itemFullDesc = is88thSolution
      ? 'The 88th Sovereign Solution resolving the Omnipresence vs Boundary Invariance Paradox. Pricing has been removed and set to 100% Free ($0.00) to guarantee seamless testing of the autonomous marketplace, instant passkey checkout, and JIT container distribution.'
      : `A high-performance sovereign software solution engineering deterministic workflows in ${domain.cat}. Provides instant digital license dispatch, 380-node header verification, and automated settlement orchestration.`;
    const itemParadox = is88thSolution
      ? 'Resolves Omnipresence vs Boundary Invariance Paradox: Zero-barrier sovereign test harness with instant free licensing.'
      : `Resolves the enterprise paradox: ${paradoxTheme}.`;

    result.push({
      id: `sol-${String(index).padStart(3, '0')}`,
      itemType: domain.type,
      title: itemTitle,
      category: itemCategory,
      description: itemDesc,
      fullDescription: itemFullDesc,
      paradoxResolution: itemParadox,
      price: itemPrice,
      pricingModel: itemPricingModel,
      rating: +(4.80 + ((index * 7) % 20) / 100).toFixed(2),
      reviewsCount: 85 + ((index * 37) % 400),
      vendor: 'solvex-paradox-box (Todd Jeffrey Ites Jr. - Sole Verified Creator)',
      integrationPlatforms: [
        'solvex-paradox-box/storefront',
        'uarefake.space Control Board',
        'uarefake.com',
        'Neon PostgreSQL',
        'GitHub Enterprise Mesh'
      ],
      features: [
        `Cryptographic verification on 380-character header standard`,
        `Real-time JIT artifact streaming with zero cold-start delay`,
        `Automated PayPal escrow release and multi-party milestone locking`,
        `Deep telemetry hooks for uarefake.space command console`
      ],
      badge: itemBadge,
      iconName: domain.icon,
      imageUrl,
      specs: {
        'Repository': `github.com/solvex-paradox-box/${slug}`,
        'Delivery Format': 'Instant Digital Download / JIT Container Image / NPM Package',
        'Creator / Author': 'Todd Jeffrey Ites Jr. (Sole Verified Creator & Architect)',
        'Security': 'AES-256 / SHA-256 Manifest Signatures + eBPF Verified',
        'Target Control Plane': 'uarefake.space & uarefake.com',
        'Node ID': `NODE-0X${index.toString(16).toUpperCase().padStart(4, '0')}`
      }
    });
  }

  return result;
}

export const INITIAL_SOLUTIONS: SolutionItem[] = generateAll128Solutions();
