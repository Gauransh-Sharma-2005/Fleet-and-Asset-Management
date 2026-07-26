import React, { useState } from 'react';
import { Server, Truck, Database, Activity } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function StatsCards() {
  const { ingest, latency, fleetCount, appStatus } = useFleet();
  const [pktHover, setPktHover] = useState(false);

  const statusStyles = {
    ACTIVE: { text: 'text-emerald-400 neon-text', desc: 'Processing pipeline foreground run', descColor: 'text-slate-400' },
    STANDBY: { text: 'text-yellow-500', desc: 'Ingestion throttled to conserve energy', descColor: 'text-slate-400' },
    FAULT: { text: 'text-rose-500 status-fault', desc: 'Emergency triage required immediately', descColor: 'text-rose-400' },
  };
  const statusLabel = { ACTIVE: 'ACTIVE', STANDBY: 'STANDBY', FAULT: 'FAULT DETECTED' };
  const s = statusStyles[appStatus] || statusStyles.ACTIVE;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div
        className="glass-card hover-glow p-6 rounded-3xl border border-indigo-500/8"
        onMouseEnter={() => setPktHover(true)}
        onMouseLeave={() => setPktHover(false)}
      >
        <div className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-3 flex items-center gap-2 font-mono">
          <Server className="w-3 h-3 text-indigo-400" />
          Ingestion Gateway
        </div>
        <div className={`text-3xl font-black font-mono stats-pulse ${pktHover ? 'text-cyan-400' : 'text-white'}`}>
          {(pktHover ? ingest * 2 : ingest).toLocaleString()} pkts/s
        </div>
        <div className="text-[9px] text-emerald-400 font-bold flex items-center mt-3 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse neon-text mr-2 status-active"></span>
          0 packets dropped
        </div>
      </div>

      <div className="glass-card hover-glow p-6 rounded-3xl border border-indigo-500/8">
        <div className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-3 flex items-center gap-2 font-mono">
          <Truck className="w-3 h-3 text-purple-400" />
          Active Fleet
        </div>
        <div className="text-3xl font-black text-white font-mono stats-pulse">{fleetCount} / 350</div>
        <div className="text-[9px] text-slate-400 mt-3 font-mono">Nodes transmitting telemetry</div>
      </div>

      <div className="glass-card hover-glow p-6 rounded-3xl border border-indigo-500/8">
        <div className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-3 flex items-center gap-2 font-mono">
          <Database className="w-3 h-3 text-cyan-400" />
          DB Latency
        </div>
        <div className="text-3xl font-black text-white font-mono stats-pulse">{latency.toFixed(1)} ms</div>
        <div className="text-[9px] text-cyan-400 mt-3 font-mono">Spatial 1:1 Upsert cycle</div>
      </div>

      <div className="glass-card hover-glow p-6 rounded-3xl border border-indigo-500/8">
        <div className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-3 flex items-center gap-2 font-mono">
          <Activity className="w-3 h-3 text-pink-400" />
          Console Status
        </div>
        <div className={`text-3xl font-black font-mono stats-pulse ${s.text}`}>{statusLabel[appStatus]}</div>
        <div className={`text-[9px] mt-3 font-mono ${s.descColor}`}>{s.desc}</div>
      </div>
    </div>
  );
}
