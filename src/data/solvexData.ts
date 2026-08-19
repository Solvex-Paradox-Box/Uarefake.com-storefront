import { SolutionItem, PurchaseOrder, Shipment, ERPIntegration } from '../types';
import { ALL_233_SOLUTIONS } from './catalogGenerator';

export const INITIAL_SOLUTIONS: SolutionItem[] = ALL_233_SOLUTIONS;

export const INITIAL_ORDERS: PurchaseOrder[] = [];

export const INITIAL_SHIPMENTS: Shipment[] = [];

export const INITIAL_ERP_INTEGRATIONS: ERPIntegration[] = [
  {
    id: 'erp-0',
    name: 'Neon PostgreSQL (GitHub Integration Sync)',
    category: 'Database Ledger',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 124800,
    icon: 'Database'
  },
  {
    id: 'erp-1',
    name: 'Solvex Crystal Clear Black Box Engine',
    category: 'JIT Distribution',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 88400,
    icon: 'Zap'
  },
  {
    id: 'erp-2',
    name: 'uarefake.space AI Registry & Control Board',
    category: 'Control Board',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 42100,
    icon: 'Server'
  },
  {
    id: 'erp-gh',
    name: 'GitHub Registry & Actions CI/CD Pipeline',
    category: 'Repository',
    status: 'Connected',
    lastSync: 'Just now',
    totalEventsProcessed: 56900,
    icon: 'Cloud'
  },
  {
    id: 'erp-3',
    name: 'SAP S/4HANA Enterprise Cloud',
    category: 'ERP',
    status: 'Connected',
    lastSync: '2 mins ago',
    totalEventsProcessed: 14280,
    icon: 'Database'
  },
  {
    id: 'erp-4',
    name: 'Oracle NetSuite OneWorld',
    category: 'ERP',
    status: 'Connected',
    lastSync: '1 min ago',
    totalEventsProcessed: 9840,
    icon: 'Layers'
  }
];
