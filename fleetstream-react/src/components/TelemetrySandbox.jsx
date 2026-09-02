import React, { useState } from 'react';
import { Radio } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function TelemetrySandbox() {
  const { appendLog } = useFleet();
  const [active, setActive] = useState(false);

  const toggleScan = () => {
    setActive((prev) => {
      const next = !prev;
      if (next) {
        appendLog('INFO', 'Interactive telemetry scan initiated via sandbox touch/click event.');
        if ('vibrate' in navigator) navigator.vibrate(50);
      }
      return next;
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-indigo-500/10 text-center">
      <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Telemetry Sandbox</h2>
      <p className="text-2xl sm:text-4xl font-black text-white mb-8 sm:mb-12 gradient-text font-outfit">Interactive Vehicle Ping</p>

      <div
        className={`glass-card hover-glow p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-md mx-auto cursor-pointer border transition-all select-none ${
          active ? 'border-indigo-500/40 shadow-xl shadow-indigo-500/20' : 'border-indigo-500/10'
        }`}
        onClick={toggleScan}
        onMouseEnter={() => {
          if (!active) {
            setActive(true);
            appendLog('INFO', 'Interactive telemetry scan initiated via sandbox hover event.');
          }
        }}
        onMouseLeave={() => {
          // On mobile/touch, do not turn off on mouse leave
          if (window.matchMedia('(hover: hover)').matches) {
            setActive(false);
          }
        }}
      >
        <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/15 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto border border-indigo-500/20">
          <Radio className={`w-7 h-7 sm:w-8 sm:h-8 ${active ? 'text-indigo-300 animate-pulse' : 'text-indigo-400'}`} />
        </div>
        <h3 className={`text-lg sm:text-xl font-bold mb-2 font-outfit ${active ? 'text-indigo-300' : 'text-white'}`}>
          {active ? 'Telemetry Link Established' : 'Telemetry Scanner'}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
          {active
            ? 'Streaming live metrics from Fleet Streamer node.'
            : 'Tap or hover over this card to ping the active fleet simulator node and retrieve instantaneous diagnostics.'}
        </p>

        <div className="inline-block text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-3">
          {active ? '● PING ACTIVE — Tap to disconnect' : '○ Tap / Hover to Ping'}
        </div>

        {active && (
          <div className="text-left font-mono text-xs bg-slate-950/90 p-4 rounded-xl border border-indigo-500/20 space-y-2.5 mt-2">
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
