import React from 'react';
import { useFleet } from '../context/FleetContext';

export default function AlertBar() {
  const { navigateTo } = useFleet();
  return (
    <div
      className="relative z-40 border-b border-indigo-500/10 py-2 px-3 sm:px-4 text-center text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap leading-tight"
      style={{ background: 'rgba(10,8,30,0.95)' }}
    >
      <span className="gradient-bg text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0">
        Live
      </span>
      <span className="text-slate-300">
        FleetStream v2.4.0 — Enhanced AI dashcam safety coaching profiles now active.
      </span>
      <button
        onClick={() => {
          navigateTo('guest');
          setTimeout(() => document.getElementById('monitor')?.scrollIntoView({ behavior: 'smooth' }), 50);
        }}
        className="underline text-indigo-400 hover:text-white transition-colors ml-0.5 sm:ml-1 font-semibold whitespace-nowrap"
      >
        Launch Console →
      </button>
    </div>
  );
}
