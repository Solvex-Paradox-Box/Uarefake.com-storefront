import React, { useState } from 'react';
import { Database, Server, Cloud, Box, RefreshCw, CheckCircle2, Layers, Zap, Activity } from 'lucide-react';
import { ERPIntegration } from '../types';

interface IntegrationsPanelProps {
  integrations: ERPIntegration[];
  onSyncTriggered: (id: string) => void;
}

export const IntegrationsPanel: React.FC<IntegrationsPanelProps> = ({
  integrations,
  onSyncTriggered
}) => {
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSync = async (id: string) => {
    setSyncingId(id);
    try {
      const res = await fetch(`/api/integrations/${id}/sync`, { method: 'POST' });
      if (res.ok) {
        onSyncTriggered(id);
      }
    } catch (err) {
      console.error('Sync error:', err);
    } finally {
      setTimeout(() => setSyncingId(null), 800);
    }
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Database': return <Database className="w-6 h-6 text-indigo-400" />;
      case 'Server': return <Server className="w-6 h-6 text-cyan-400" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-sky-400" />;
      case 'Box': return <Box className="w-6 h-6 text-amber-400" />;
      default: return <Layers className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Bi-Directional Enterprise Webhook Grid</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Cross-Platform ERP & API Adapters
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Solvex automatically synchronizes purchase orders, inventory stock levels, material requisitions, and PayPal settlement receipts directly into your core enterprise ledger.
          </p>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-800 border border-slate-700/80 rounded-xl">
                  {getIcon(item.icon)}
                </div>
                <div className="flex items-center space-x-1.5 text-xs">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'Connected' ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
                  <span className="font-semibold text-slate-200">{item.status}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  {item.category} ADAPTER
                </span>
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Last Ledger Sync:</span>
                  <span className="text-slate-200 font-medium">{item.lastSync}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Webhook Events:</span>
                  <span className="text-slate-200 font-mono font-medium">{item.totalEventsProcessed.toLocaleString()} Events</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex justify-end">
              <button
                onClick={() => handleSync(item.id)}
                disabled={syncingId === item.id}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all border border-slate-700/80"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${syncingId === item.id ? 'animate-spin' : ''}`} />
                <span>{syncingId === item.id ? 'Synchronizing...' : 'Trigger Immediate Sync'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Event Logger Simulation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Live Webhook Streaming Feed</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto">
          <div className="flex items-center space-x-2 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>[2026-08-09 18:00:12] SAP S/4HANA: Material master sync #9921 updated from Solvex Procurement Agent.</span>
          </div>
          <div className="flex items-center space-x-2 text-sky-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>[2026-08-09 18:00:05] PayPal B2B Webhook: IPN Instant Payment Notification verified (Status: COMPLETED).</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>[2026-08-09 17:58:40] Oracle NetSuite: PO Requisition #2026-8891 status set to IN_TRANSIT.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
