export interface CompanyNode {
  id: string;
  nodeNumber: string; // e.g. "NODE-01", "NODE-02", "NODE-03"
  companyName: string;
  companyMainHeader: string; // EXACTLY 380 CHARACTERS
  deviceName: string;
  location: string;
  assignedSoftware: string;
  poId: string;
  status: 'Active' | 'Provisioned' | 'Syncing' | 'Standby';
  lastPing: string;
  ipAddress: string;
}

// Generates an exact 380-character header ending with the node suffix (e.g. ::NODE-01)
export function generate380CharHeader(nodeSuffix: string, companyName: string = "uarefake.com Enterprise Global"): string {
  const prefix = `SOLVEX-ENTERPRISE-380CHAR-HEADER::COMPANY-[${companyName.toUpperCase()}]::SYSTEM-JIT-DISTRIBUTION::HASH-`;
  const suffix = `::${nodeSuffix.toUpperCase()}`; // e.g. ::NODE-01
  const neededLength = 380;
  
  // Fill the middle with deterministic crypto hash pattern
  const hashSeed = "a8f9c2104e7b83d1059f3211e038294a772c10b984102938475a6b1029384756c9d817263540192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465019283746501928374650192837465";
  
  const currentLengthWithoutFiller = prefix.length + suffix.length;
  const fillerNeeded = neededLength - currentLengthWithoutFiller;
  
  const filler = hashSeed.repeat(4).substring(0, Math.max(0, fillerNeeded));
  const fullHeader = prefix + filler + suffix;
  
  if (fullHeader.length > 380) {
    return fullHeader.substring(0, 380 - suffix.length) + suffix;
  }
  return fullHeader.padEnd(380, '0').substring(0, 380 - suffix.length) + suffix;
}

export const INITIAL_COMPANY_NODES: CompanyNode[] = [
  {
    id: 'node-01',
    nodeNumber: 'NODE-01',
    companyName: 'uarefake.com Enterprise Core',
    companyMainHeader: generate380CharHeader('NODE-01'),
    deviceName: 'Solvex Core Server Rack 01 (Main Cloud Host)',
    location: 'US-East Production Cluster (uarefake.com)',
    assignedSoftware: 'Solvex Autonomous PO Dispatch Engine',
    poId: 'N/A',
    status: 'Active',
    lastPing: '2 seconds ago',
    ipAddress: '10.240.0.12'
  },
  {
    id: 'node-02',
    nodeNumber: 'NODE-02',
    companyName: 'uarefake.com Enterprise Core',
    companyMainHeader: generate380CharHeader('NODE-02'),
    deviceName: 'Black Box Execution Unit 02 (Control Gateway)',
    location: 'uarefake.space Registry Node',
    assignedSoftware: 'Solvex Crystal Clear Black Box Core Pipeline Engine',
    poId: 'N/A',
    status: 'Active',
    lastPing: 'Just now',
    ipAddress: '10.240.0.18'
  },
  {
    id: 'node-03',
    nodeNumber: 'NODE-03',
    companyName: 'uarefake.com Enterprise Core',
    companyMainHeader: generate380CharHeader('NODE-03'),
    deviceName: 'ERP Bridge Station 03 (NetSuite & SAP Gate)',
    location: 'Houston Industrial Terminal',
    assignedSoftware: 'Oracle & SAP Cross-Platform ERP Bridge',
    poId: 'N/A',
    status: 'Active',
    lastPing: '1 min ago',
    ipAddress: '192.168.1.45'
  }
];
