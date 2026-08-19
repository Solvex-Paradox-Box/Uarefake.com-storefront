import { SolutionItem } from '../types';
import { INITIAL_SOLUTIONS as ALL_128_SOLUTIONS_DATA } from './allSolutionsData';
import { REAL_105_SOLUTIONS, RealLotSolution } from './real105Solutions';

const BUSINESS_TEMPLATE_IMAGES = [
  'photo-1558494949-ef010cbdcc31',
  'photo-1526374965328-7f61d4dc18c5',
  'photo-1618005182384-a83a8bd57fbe',
  'photo-1634017839464-5c339ebe3cb4',
  'photo-1518770660439-4636190af475',
  'photo-1550751827-4bd374c3f58b',
  'photo-1620712943543-bcc4688e7485',
  'photo-1586528116311-ad8dd3c8310d',
  'photo-1578575437130-527eed3abbec',
  'photo-1508873696983-2df5293cb32b',
  'photo-1451187580459-43490279c0fa',
  'photo-1563986768609-322da13575f3',
  'photo-1504639725590-34d0984388bd',
  'photo-1551288049-bebda4e38f71',
  'photo-1460925895917-afdab827c52f',
  'photo-1485827404703-89b55fcc595e',
  'photo-1639762681485-074b7f938ba0',
  'photo-1559526324-4b87b5e36e44'
];

function getBusinessImageUrl(lotNumber: number): string {
  const photoId = BUSINESS_TEMPLATE_IMAGES[(lotNumber - 1) % BUSINESS_TEMPLATE_IMAGES.length];
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80&sig=biz-${lotNumber}`;
}

export function convertReal105ToSolutionItems(): SolutionItem[] {
  return REAL_105_SOLUTIONS.map((lot: RealLotSolution) => {
    const category = 
      lot.wing === 'ZK & CRYPTOGRAPHY' 
        ? 'ZK & Sovereign Cryptography' 
        : lot.wing === 'HFT & COMPLIANCE' 
        ? 'HFT & Autonomous Compliance' 
        : 'Autonomous AI & Governance';

    const iconName = 
      lot.wing === 'ZK & CRYPTOGRAPHY' 
        ? 'ShieldCheck' 
        : lot.wing === 'HFT & COMPLIANCE' 
        ? 'Activity' 
        : 'Cpu';

    return {
      id: `lot-template-${String(lot.lotNumber).padStart(3, '0')}`,
      itemType: 'Autonomous Business Template' as const,
      title: `${lot.lotId}: ${lot.title}`,
      category: category,
      description: `${lot.subtitle} — ${lot.whatItDoes}`,
      fullDescription: `${lot.whatItDoes} Designed as an out-of-the-box turnkey autonomous business. Equipped with self-executing outreach (${lot.outreach}), instant vault distribution (${lot.distribution}), and enterprise ${lot.grade}. Once purchased, this is a fully autonomous business ready out of the box.`,
      paradoxResolution: lot.paradoxResolved,
      price: lot.priceUsdc,
      pricingModel: 'One-time' as const,
      rating: +(4.90 + (lot.lotNumber % 10) * 0.01).toFixed(2),
      reviewsCount: 140 + lot.lotNumber * 3,
      vendor: 'Solvex Autonomous Sovereign Vault (Todd Jeffrey Ites Jr.)',
      integrationPlatforms: [
        'Solvex Sovereign Vault (uarefake.space)',
        'Customer Storefront (uarefake.com)',
        '380-Byte Mesh Ledger',
        'Autonomous Outreach Engine',
        'Solvex SwarmOS'
      ],
      features: [
        `Autonomous Outreach: ${lot.outreach}`,
        `Instant Self-Delivering Pipeline: ${lot.distribution}`,
        `Enterprise Grade: ${lot.grade}`,
        `Sovereign Chamber: ${lot.chamber} • Wing: ${lot.wing}`,
        `Includes 380-char sovereign node license & zero-latency settlement`,
        `Out-of-the-Box Ready: Self-governing revenue & lead pipeline`
      ],
      badge: lot.isApex ? '👑 Apex Sovereign Bundle' : `${lot.chamber} • ${lot.lotId}`,
      iconName: iconName,
      imageUrl: getBusinessImageUrl(lot.lotNumber),
      specs: {
        'Lot Identifier': lot.lotId,
        'Chamber': lot.chamber,
        'Wing': lot.wing,
        'Business Architecture': '100% Fully Autonomous Out-Of-The-Box Business',
        'Outreach Engine': lot.outreach,
        'Delivery Protocol': lot.distribution,
        'Institutional Grade': lot.grade,
        'Price (USDC)': `$${lot.priceUsdc.toFixed(2)} USD`,
        'Price (ETH)': `${lot.priceEth.toFixed(8)} ETH`,
        'Paradox Resolved': lot.paradoxResolved,
        'Readiness': 'Instant Out-of-the-Box Execution'
      },
      isAutonomousBusiness: true,
      lotId: lot.lotId,
      lotNumber: lot.lotNumber,
      chamber: lot.chamber,
      wing: lot.wing,
      outreachModel: lot.outreach,
      distributionModel: lot.distribution,
      grade: lot.grade,
      priceEth: lot.priceEth,
      priceUsdc: lot.priceUsdc
    };
  });
}

export const ALL_105_AUTONOMOUS_BUSINESSES: SolutionItem[] = convertReal105ToSolutionItems();
export const ALL_105_TEMPLATES: SolutionItem[] = ALL_105_AUTONOMOUS_BUSINESSES;
export const ALL_128_SOLUTIONS: SolutionItem[] = ALL_128_SOLUTIONS_DATA;
export const ALL_233_SOLUTIONS: SolutionItem[] = [...ALL_105_AUTONOMOUS_BUSINESSES, ...ALL_128_SOLUTIONS_DATA];
export const ALL_210_SOLUTIONS: SolutionItem[] = ALL_233_SOLUTIONS;
export const ALL_CATALOG_ITEMS: SolutionItem[] = ALL_233_SOLUTIONS;

export function generateAllCatalogItems(): SolutionItem[] {
  return ALL_233_SOLUTIONS;
}
