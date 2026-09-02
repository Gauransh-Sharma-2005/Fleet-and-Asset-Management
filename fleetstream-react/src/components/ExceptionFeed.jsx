import React from 'react';
import { AlertCircle, Maximize, Trash2 } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

const FILTERS = ['ALL', 'CRITICAL', 'WARNING', 'INFO'];

const BADGE_STYLES = {
  CRITICAL: 'text-rose-400 bg-rose-500/12 border-rose-500/25 font-bold',
  WARNING: 'text-amber-400 bg-amber-500/12 border-amber-500/25 font-bold',
  INFO: 'text-slate-400 bg-slate-800/60 border-slate-700/40',
};
const ROW_STYLES = {
  CRITICAL: 'bg-rose-500/5 border-rose-500/20',
  WARNING: 'bg-amber-500/5 border-amber-500/20',
  INFO: 'bg-slate-900/30 border-white/5',
};

export default function ExceptionFeed() {
  const { logs, filter, setFilter, clearLogs } = useFleet();
  const filtered = filter === 'ALL' ? logs : logs.filter((l) => l.type === filter);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="glass rounded-2xl sm:rounded-3xl border border-indigo-500/10 overflow-hidden shadow-2xl shadow-indigo-500/10 lg:col-span-3 flex flex-col" style={{ minHeight: 320 }}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-indigo-500/10 bg-slate-950/60 flex-wrap gap-2.5">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-red-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2 font-outfit">
            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
            System Exceptions Feed
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-white/5 overflow-x-auto max-w-full">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn text-[9px] sm:text-[10px] font-mono font-bold px-2 py-1 rounded transition-all whitespace-nowrap ${
                filter === f ? 'active-filter' : 'text-slate-500 hover:text-white'
              }`}
            >
              {f === 'ALL' ? 'ALL' : f === 'WARNING' ? 'WARN' : f}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 px-2.5 py-1 rounded-lg font-mono text-[9px] items-center gap-1 transition-all"
          >
            <Maximize className="w-3 h-3" /> Fullscreen
          </button>
          <button
            onClick={clearLogs}
            className="bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-mono text-[9px] sm:text-[10px] flex items-center gap-1 transition-all"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      <div className="p-3.5 sm:p-5 font-mono text-[11px] space-y-2.5 sm:space-y-3 overflow-y-auto custom-scrollbar flex-grow" id="logTerminal" style={{ maxHeight: 280 }}>
        <div className="text-indigo-400/80 text-[10px] mb-2 flex items-center gap-1">
          <span className="cursor-blink text-indigo-400">█</span>
          Initializing telemetry stream...
        </div>

        {filtered.length === 0 ? (
          <div className="text-slate-600 text-[10px] italic py-4 text-center">No "{filter}" events found.</div>
        ) : (
          filtered.map((log, i) => (
            <div
              key={i}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border ${ROW_STYLES[log.type]} gap-2 hover:border-white/10 transition-all duration-200`}
            >
              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5 min-w-0">
                <span className={`${BADGE_STYLES[log.type]} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] border font-mono tracking-wider uppercase shrink-0`}>
                  {log.type}
                </span>
                <span className="text-slate-300 text-[11px] leading-relaxed break-words">{log.text}</span>
              </div>
              <span className="text-slate-500 text-[9px] font-mono whitespace-nowrap self-end sm:self-auto shrink-0">{log.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
