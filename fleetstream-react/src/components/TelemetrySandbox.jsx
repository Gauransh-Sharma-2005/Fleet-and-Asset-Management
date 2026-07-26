import React, { useState } from 'react';
import { Radio } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function TelemetrySandbox() {
  const { appendLog } = useFleet();
  const [active, setActive] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 border-t border-indigo-500/10 text-center">
      <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">Telemetry Sandbox</h2>
      <p className="text-4xl font-black text-white mt-3 mb-12 gradient-text font-outfit">Interactive Vehicle Ping</p>

      <div
        className="glass-card hover-glow p-8 rounded-3xl max-w-md mx-auto cursor-pointer border border-indigo-500/10"
        onMouseEnter={() => {
          setActive(true);
          appendLog('INFO', 'Interactive telemetry scan initiated via sandbox hover event.');
        }}
        onMouseLeave={() => setActive(false)}
      >
        <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/15 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-indigo-500/20">
          <Radio className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className={`text-xl font-bold mb-3 font-outfit ${active ? 'text-indigo-300' : 'text-white'}`}>
          {active ? 'Telemetry Link Established' : 'Telemetry Scanner'}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {active
            ? 'Streaming live metrics from Fleet Streamer node.'
            : 'Hover over this console card to ping the active fleet simulator node and retrieve instantaneous diagnostics.'}
        </p>

        {active && (
          <div className="text-left font-mono text-xs bg-slate-950/80 p-4 rounded-xl border border-indigo-500/15 space-y-2 mt-4">
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-500">Asset Ref:</span>
              <span className="text-indigo-300 font-bold">TRK-8821</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-500">Node Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-slate-500">Ingest Latency:</span>
              <span className="text-purple-300 font-bold">12ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">GPS Stream:</span>
              <span className="text-cyan-300 font-bold">Locked (5s heartbeat)</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
