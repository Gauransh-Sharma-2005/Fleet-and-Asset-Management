import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function Navbar() {
  const { view, navigateTo } = useFleet();
  const isGuest = view === 'guest';

  return (
    <header
      className="relative z-50 sticky top-0 border-b border-indigo-500/10"
      style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => navigateTo('guest')}
        >
          <div className="gradient-bg p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="2.5" fill="currentColor"></circle>
              <circle cx="5" cy="18" r="2.5"></circle>
              <circle cx="19" cy="18" r="2.5"></circle>
              <path d="M7 16.5L10.5 7.5"></path>
              <path d="M17 16.5L13.5 7.5"></path>
              <path d="M7.5 18H16.5"></path>
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight text-white font-outfit">
            Fleet<span className="gradient-text">Stream</span>
          </span>
        </div>

        {isGuest && (
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-400">
            <a href="#objectives" className="hover:text-white transition-colors">Objectives</a>
            <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#monitor" className="hover:text-white transition-colors">Live Monitor</a>
          </nav>
        )}

        <div className="flex items-center space-x-3">
          {view !== 'admin' && (
            <button
              onClick={() => navigateTo('admin-login')}
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white border border-white/8 bg-white/4 hover:bg-white/8 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              Admin Portal
            </button>
          )}
          {isGuest && (
            <a
              href="#monitor"
              className="gradient-bg btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-300"
            >
              Get Started
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
