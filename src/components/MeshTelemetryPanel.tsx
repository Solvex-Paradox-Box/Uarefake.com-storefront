import React, { useState } from 'react';
import { Network, Activity, ShieldAlert, Cpu, Radio, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { MESH_TOPOLOGY_54 } from '../data/registryData';
import { MeshNode } from '../types';

export const MeshTelemetryPanel: React.FC = () => {
  const [nodes, setNodes] = useState<MeshNode[]>([...MESH_TOPOLOGY_54]);
  const [selectedCluster, setSelectedCluster] = useState<string>('ALL');
  const [activeNode, setActiveNode] = useState<MeshNode | null>(nodes[0]);
  const [isSimulatingFailover, setIsSimulatingFailover] = useState<boolean>(false);

  const clusters = ['ALL', 'Alpha Core', 'Beta Relay', 'Gamma Lockbox', 'Delta Crawler', 'Epsilon Edge'];

  const filteredNodes = nodes.filter(n => selectedCluster === 'ALL' || n.cluster === selectedCluster);

  const triggerFailover = (nodeId: string) => {
    setIsSimulatingFailover(true);
    setTimeout(() => {
      setNodes(prev => prev.map(n => {
        if (n.id === nodeId) {
          return { ...n, status: 'DEGRADED', routingLoadPct: 0, latencyMs: 45.2 };
        }
        if (n.status === 'FAILOVER_STANDBY') {
          return { ...n, status: 'OPTIMAL', routingLoadPct: 88, latencyMs: 1.4 };
        }
        return n;
      }));
      setIsSimulatingFailover(false);
    }, 800);
  };

  const rebalanceMesh = () => {
    setNodes([...MESH_TOPOLOGY_54]);
  };

  const optimalCount = nodes.filter(n => n.status === 'OPTIMAL' || n.status === 'ACTIVE').length;
  const avgLatency = (nodes.reduce((acc, curr) => acc + curr.latencyMs, 0) / nodes.length).toFixed(2);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-bold tracking-[0.1em] text-[#E0E0F0] uppercase flex items-center space-x-2">
            <Network className="w-5 h-5 text-[#00F0FF]" />
            <span>54-Node Mesh Telemetry & Tether Bubble Panel</span>
          </h1>
          <p className="text-[#A0A0B0] text-xs mt-1 max-w-2xl">
            Real-time status monitoring, tether bubble health metrics, packet latency routing, and automated cluster failover standby.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={rebalanceMesh}
            className="px-3.5 py-2 bg-[#12121A] hover:bg-[#1A1A25] text-[#E0E0F0] hover:text-[#00F0FF] rounded text-xs font-mono font-bold border border-[#2A2A35] flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET MESH STATE</span>
          </button>
        </div>
      </div>

      {/* Telemetry Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-[#0A0A10] border border-[#2A2A35] p-3.5 rounded space-y-1">
          <div className="text-[#505060] text-[10px] uppercase tracking-widest">Active Mesh Health</div>
          <div className="text-lg font-bold text-[#00FF41] flex items-center space-x-2">
            <span>{optimalCount} / 54 NODES</span>
            <span className="w-2 h-2 rounded-full bg-[#00FF41] green-glow animate-pulse"></span>
          </div>
          <div className="text-[10px] text-[#808090]">100% Tether Bubble Coverage</div>
        </div>

        <div className="bg-[#0A0A10] border border-[#2A2A35] p-3.5 rounded space-y-1">
          <div className="text-[#505060] text-[10px] uppercase tracking-widest">Average Latency</div>
          <div className="text-lg font-bold text-[#00F0FF]">{avgLatency} ms</div>
          <div className="text-[10px] text-[#808090]">Sub-2ms Target Met</div>
        </div>

        <div className="bg-[#0A0A10] border border-[#2A2A35] p-3.5 rounded space-y-1">
          <div className="text-[#505060] text-[10px] uppercase tracking-widest">Tether Bubble Radius</div>
          <div className="text-lg font-bold text-[#FFB800]">1,250 km</div>
          <div className="text-[10px] text-[#808090]">Global Geofence Protected</div>
        </div>

        <div className="bg-[#0A0A10] border border-[#2A2A35] p-3.5 rounded space-y-1">
          <div className="text-[#505060] text-[10px] uppercase tracking-widest">ZK Hash Throughput</div>
          <div className="text-lg font-bold text-[#C080FF]">42,800 Proofs/s</div>
          <div className="text-[10px] text-[#808090]">EAL6+ Cryptographic Speed</div>
        </div>
      </div>

      {/* Cluster Filters & Topology Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: 54 Node Grid */}
        <div className="lg:col-span-2 bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A35] pb-3">
            <h2 className="text-xs font-bold text-[#505060] tracking-widest uppercase flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#00F0FF]" />
              <span>54-Node Topology Matrix</span>
            </h2>

            {/* Cluster Filter Tabs */}
            <div className="flex space-x-1.5 overflow-x-auto text-[10px] font-mono">
              {clusters.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCluster(c)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    selectedCluster === c
                      ? 'bg-[#00F0FF] text-[#050507] font-bold'
                      : 'bg-[#050507] text-[#808090] hover:bg-[#12121A] hover:text-[#E0E0F0]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid View of Nodes */}
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2 max-h-[480px] overflow-y-auto pr-1">
            {filteredNodes.map(node => {
              const isSelected = activeNode?.id === node.id;
              let statusBg = "bg-[#12121A] border-[#2A2A35] text-[#00FF41]";
              if (node.status === 'DEGRADED') statusBg = "bg-[#380010] border-rose-500/60 text-rose-300";
              if (node.status === 'FAILOVER_STANDBY') statusBg = "bg-[#382800] border-[#FFB800]/60 text-[#FFB800]";

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-2 rounded border transition-all text-center space-y-1 font-mono text-[10px] cursor-pointer ${statusBg} ${
                    isSelected ? 'ring-2 ring-[#00F0FF] cyan-glow-sm scale-105' : 'hover:scale-102'
                  }`}
                >
                  <div className="font-bold">{node.id}</div>
                  <div className="text-[9px] opacity-75 truncate">{node.latencyMs}ms</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Node Telemetry Inspector */}
        {activeNode && (
          <div className="bg-[#0A0A10] border border-[#2A2A35] rounded-lg p-6 space-y-4 font-mono text-xs">
            <div className="border-b border-[#2A2A35] pb-3 flex items-center justify-between">
              <div>
                <span className="text-[#00F0FF] font-bold text-sm">{activeNode.id}</span>
                <div className="text-[#E0E0F0] font-sans font-semibold text-xs">{activeNode.name}</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeNode.status === 'OPTIMAL' ? 'bg-[#002810] text-[#00FF41] border border-[#00FF41]/40' : 'bg-[#380010] text-rose-300 border border-rose-800'
              }`}>
                {activeNode.status}
              </span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between py-1 border-b border-[#1A1A25]">
                <span className="text-[#505060]">Role:</span>
                <span className="text-[#E0E0F0] font-sans">{activeNode.role}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1A1A25]">
                <span className="text-[#505060]">Cluster:</span>
                <span className="text-[#00F0FF]">{activeNode.cluster}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1A1A25]">
                <span className="text-[#505060]">IP Address:</span>
                <span className="text-[#A0A0B0]">{activeNode.ipAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1A1A25]">
                <span className="text-[#505060]">Latency:</span>
                <span className="text-[#00FF41] font-bold">{activeNode.latencyMs} ms</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1A1A25]">
                <span className="text-[#505060]">Tether Radius:</span>
                <span className="text-[#FFB800]">{activeNode.tetherBubbleRadiusKm} km</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1A1A25]">
                <span className="text-[#505060]">Routing Load:</span>
                <span className="text-[#C080FF]">{activeNode.routingLoadPct}%</span>
              </div>
            </div>

            <div className="p-2.5 bg-[#050507] rounded border border-[#2A2A35] space-y-1">
              <div className="text-[#505060] text-[9px] uppercase">ZK KEY PROOF SIGNATURE</div>
              <div className="text-[#00F0FF] text-[10px] truncate">{activeNode.zkKeyHash}</div>
            </div>

            <button
              onClick={() => triggerFailover(activeNode.id)}
              disabled={isSimulatingFailover || activeNode.status === 'DEGRADED'}
              className="w-full py-2.5 bg-[#380010] hover:bg-rose-900 text-rose-200 border border-rose-700/60 rounded font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>SIMULATE NODE FAILOVER REROUTE</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
