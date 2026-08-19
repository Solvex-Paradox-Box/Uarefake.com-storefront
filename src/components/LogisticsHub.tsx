import React, { useState } from 'react';
import { Cpu, Server, Navigation, Clock, CheckCircle2, ShieldCheck, FileText, Activity, AlertCircle, ExternalLink, RefreshCw, Zap, Code2 } from 'lucide-react';
import { Shipment } from '../types';

interface LogisticsHubProps {
  shipments: Shipment[];
}

export const LogisticsHub: React.FC<LogisticsHubProps> = ({ shipments }) => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment>(shipments[0] || null);
  const [activeDocModal, setActiveDocModal] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Logistics Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Solvex Software Distribution Pipeline Active (JIT Software)</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Solvex Software Distribution & JIT Delivery Hub</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              All items are digital solutions, paradox resolutions, and autonomous business templates distributed via the <span className="text-emerald-400 font-mono font-bold">Solvex Software Distribution Pipeline</span> and delivered via <span className="text-indigo-300 font-mono font-bold">JIT (Just-In-Time) Software Provisioning</span>.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              ACTIVE JIT PIPELINES: {shipments.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left List / Right Active Map & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipment Cards List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Active JIT Software Pipelines
          </h3>

          <div className="space-y-3">
            {shipments.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-2">
                <Code2 className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-slate-300">No Active JIT Pipelines</div>
                <p className="text-xs text-slate-500">When purchase orders are generated or software packages are deployed, JIT distribution telemetry streams will activate here.</p>
              </div>
            ) : (
              shipments.map((ship) => {
              const isSelected = selectedShipment?.id === ship.id;
              return (
                <div
                  key={ship.id}
                  onClick={() => setSelectedShipment(ship)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-950/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center space-x-1">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{ship.carrier}</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                      {ship.status}
                    </span>
                  </div>

                  <div className="font-bold text-slate-100 text-sm mb-1 truncate font-mono">
                    {ship.trackingNumber}
                  </div>

                  <div className="text-xs text-slate-400 flex items-center space-x-1 mb-2">
                    <Server className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{ship.origin} → {ship.destination}</span>
                  </div>

                  <div className="text-[11px] text-slate-300 flex justify-between pt-2 border-t border-slate-800">
                    <span>ETA: {ship.eta}</span>
                    <span className="text-indigo-400 font-mono font-medium">{ship.transportMode}</span>
                  </div>
                </div>
              );
            }))}
          </div>
        </div>

        {/* Selected Shipment Details & Map Visualizer */}
        {selectedShipment && (
          <div className="lg:col-span-2 space-y-6">
            {/* Map Visualizer Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-slate-800/80 px-5 py-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-slate-100 text-sm">
                    JIT Provisioning Telemetry ({selectedShipment.trackingNumber})
                  </span>
                </div>

                <button
                  onClick={() => setActiveDocModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>JIT Software Entitlement Manifest</span>
                </button>
              </div>

              {/* Vector Map / Pipeline Visualizer */}
              <div className="h-64 bg-slate-950 relative flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                {/* Simulated Pipeline Stream */}
                <div className="relative z-10 w-full max-w-lg space-y-8 text-center">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                    <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-left">
                      <div className="font-bold text-slate-200">{selectedShipment.origin}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">REGISTRY SOURCE NODE</div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-right">
                      <div className="font-bold text-slate-200">{selectedShipment.destination}</div>
                      <div className="text-[10px] text-indigo-400 font-mono">TARGET DEPLOYMENT INSTANCE</div>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="relative">
                    <div className="h-1.5 bg-slate-800 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-cyan-400 w-full rounded-full animate-pulse" />
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-slate-900 border-2 border-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                      <Zap className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                    </div>
                  </div>

                  <div className="inline-block bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2 text-xs text-slate-300">
                    <span className="text-slate-400">JIT Provisioning Status:</span>{' '}
                    <span className="font-semibold text-emerald-400 font-mono">{selectedShipment.currentLocation}</span>
                  </div>
                </div>
              </div>

              {/* Telemetry Strip */}
              {selectedShipment.temperatureTelemetry && (
                <div className="bg-slate-950/90 px-5 py-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>JIT Software Health & Metric Telemetry:</span>
                    <span className="font-mono text-emerald-400 font-bold">{selectedShipment.temperatureTelemetry}</span>
                  </div>
                  <span className="text-slate-500 text-[11px] font-mono">Solvex Distribution Pipeline Sync</span>
                </div>
              )}
            </div>

            {/* Milestones Timeline */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Solvex JIT Delivery Milestones
              </h4>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                {selectedShipment.milestones.map((m, idx) => (
                  <div key={idx} className="relative flex items-start space-x-4 pl-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 z-10 flex items-center justify-center ${
                        m.completed
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'bg-slate-900 border-slate-700 text-transparent'
                      }`}
                    >
                      {m.completed && <CheckCircle2 className="w-3 h-3 text-slate-950 stroke-[3]" />}
                    </div>

                    <div className="flex-1 bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-200">{m.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{m.date}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5 font-mono">{m.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* JIT Software License Entitlement Manifest Modal */}
      {activeDocModal && selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-lg text-white">Solvex Cryptographic JIT License & Entitlement Manifest</h3>
                <p className="text-xs text-emerald-400 font-mono">Distributed via Solvex Software Distribution Pipeline</p>
              </div>
              <button
                onClick={() => setActiveDocModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div><span className="text-slate-500">MANIFEST HASH:</span> JIT-LICENSE-{selectedShipment.trackingNumber}</div>
              <div><span className="text-slate-500">PIPELINE PROVIDER:</span> Solvex Software Distribution Network</div>
              <div><span className="text-slate-500">REGISTRY CONTROL BOARD:</span> uarefake.space AI Registry</div>
              <div><span className="text-slate-500">TARGET DEPLOYMENT DOMAIN:</span> uarefake.com</div>
              <div><span className="text-slate-500">SERVICE PROTOCOL:</span> Solvex-Core-Logistics-Protocol</div>
              <div><span className="text-slate-500">JIT PROVISIONING TYPE:</span> Digital Solution & Paradox Resolution Package</div>
              <div><span className="text-slate-500">DELIVERY METHOD:</span> Just-In-Time Software Container Stream</div>
              <div><span className="text-slate-500">PAYMENT SETTLEMENT:</span> PayPal B2B Sandbox Escrow Verified</div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveDocModal(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Close Manifest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

