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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-8 sm:mb-10">
      <div
        className="glass-card hover-glow p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/8 cursor-pointer select-none"
        onClick={() => setPktHover((p) => !p)}
        onMouseEnter={() => setPktHover(true)}
        onMouseLeave={() => setPktHover(false)}
      >
        <div className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-2 sm:mb-3 flex items-center justify-between font-mono">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            Ingestion Gateway
          </span>
          <span className="text-[8px] text-indigo-400/60 uppercase sm:hidden">Tap</span>
        </div>
        <div className={`text-2xl sm:text-3xl font-black font-mono stats-pulse truncate ${pktHover ? 'text-cyan-400' : 'text-white'}`}>
          {(pktHover ? ingest * 2 : ingest).toLocaleString()} <span className="text-sm sm:text-base font-normal text-slate-400">pkts/s</span>
        </div>
        <div className="text-[9px] text-emerald-400 font-bold flex items-center mt-2.5 sm:mt-3 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse neon-text mr-2 status-active shrink-0"></span>
          0 packets dropped
        </div>
      </div>

      <div className="glass-card hover-glow p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/8">
        <div className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 font-mono">
          <Truck className="w-3.5 h-3.5 text-purple-400" />
          Active Fleet
        </div>
        <div className="text-2xl sm:text-3xl font-black text-white font-mono stats-pulse">{fleetCount} <span className="text-sm sm:text-base font-normal text-slate-400">/ 350</span></div>
        <div className="text-[9px] text-slate-400 mt-2.5 sm:mt-3 font-mono">Nodes transmitting telemetry</div>
      </div>

      <div className="glass-card hover-glow p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/8">
        <div className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 font-mono">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          DB Latency
        </div>
        <div className="text-2xl sm:text-3xl font-black text-white font-mono stats-pulse">{latency.toFixed(1)} <span className="text-sm sm:text-base font-normal text-slate-400">ms</span></div>
        <div className="text-[9px] text-cyan-400 mt-2.5 sm:mt-3 font-mono">Spatial 1:1 Upsert cycle</div>
      </div>

      <div className="glass-card hover-glow p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/8">
        <div className="text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 font-mono">
          <Activity className="w-3.5 h-3.5 text-pink-400" />
          Console Status
        </div>
        <div className={`text-xl sm:text-2xl lg:text-3xl font-black font-mono stats-pulse truncate ${s.text}`}>{statusLabel[appStatus]}</div>
        <div className={`text-[9px] mt-2.5 sm:mt-3 font-mono truncate ${s.descColor}`}>{s.desc}</div>
      </div>
    </div>
  );
}
