import React from 'react';
import { Activity, BookOpen, Code, Terminal, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-indigo-500/10 pt-16 pb-8 relative overflow-hidden" style={{ background: 'rgba(3,7,18,0.97)' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="gradient-bg p-2 rounded-lg text-white">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight font-outfit">FleetStream</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Industrial-grade asset tracking and telemetry middleware. Designed for low-latency operational visibility in distributed logistics networks.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/8 w-fit px-3 py-1.5 rounded-full border border-emerald-500/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM OPERATIONAL
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6">Interface Controls</h4>
          <ul className="space-y-3.5 text-sm text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-2"><BookOpen className="w-4 h-4" /> Documentation</a></li>
            <li><a href="#" className="hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-2"><Code className="w-4 h-4" /> API Reference</a></li>
            <li><a href="#" className="hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-2"><Terminal className="w-4 h-4" /> Telemetry Logs</a></li>
            <li><a href="#" className="hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-2"><HelpCircle className="w-4 h-4" /> Support Portal</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6">Build Info</h4>
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 hover:border-indigo-500/25 transition-all duration-500 group">
            <div className="flex justify-between text-xs py-2 border-b border-white/5">
              <span className="text-slate-500">Version</span>
              <span className="text-white font-mono group-hover:text-indigo-400 transition-colors">v2.4.0-stable</span>
            </div>
            <div className="flex justify-between text-xs py-2 border-b border-white/5">
              <span className="text-slate-500">Node</span>
              <span className="text-white font-mono group-hover:text-indigo-400 transition-colors">edge-srv-01</span>
            </div>
            <div className="flex justify-between text-xs py-2">
              <span className="text-slate-500">Uptime</span>
              <span className="text-emerald-400 font-mono">248d 14h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center py-6 border-t border-indigo-500/15">
        <p className="text-sm font-bold text-white tracking-widest uppercase opacity-70">&copy; 2026 FleetStream Technologies</p>
        <p className="text-xs text-slate-500 mt-1">Secure telemetry transmission protocol &bull; All rights reserved.</p>
      </div>
    </footer>
  );
}
