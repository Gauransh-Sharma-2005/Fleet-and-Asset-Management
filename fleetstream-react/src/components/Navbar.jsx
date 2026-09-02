import React, { useState } from 'react';
import { ShieldAlert, Menu, X, Radio, HardDrive, Target, Zap, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function Navbar() {
  const { view, navigateTo } = useFleet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isGuest = view === 'guest';

  const handleMobileNav = (action) => {
    setMobileMenuOpen(false);
    if (typeof action === 'string') {
      if (action.startsWith('#')) {
        if (view !== 'guest') {
          navigateTo('guest');
          setTimeout(() => {
            document.querySelector(action)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          document.querySelector(action)?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigateTo(action);
      }
    }
  };

  return (
    <header
      className="relative z-50 sticky top-0 border-b border-indigo-500/10"
      style={{ background: 'rgba(3,7,18,0.95)', backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div
          className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group min-w-0"
          onClick={() => {
            setMobileMenuOpen(false);
            navigateTo('guest');
          }}
        >
          <div className="gradient-bg p-2 sm:p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105 shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="2.5" fill="currentColor"></circle>
              <circle cx="5" cy="18" r="2.5"></circle>
              <circle cx="19" cy="18" r="2.5"></circle>
              <path d="M7 16.5L10.5 7.5"></path>
              <path d="M17 16.5L13.5 7.5"></path>
              <path d="M7.5 18H16.5"></path>
            </svg>
          </div>
          <span className="text-base sm:text-xl font-black tracking-tight text-white font-outfit truncate">
            Fleet<span className="gradient-text">Stream</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        {isGuest && (
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-semibold text-slate-400">
            <a href="#objectives" className="hover:text-white transition-colors">Objectives</a>
            <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#monitor" className="hover:text-white transition-colors">Live Monitor</a>
            <a href="#asset-manager" className="hover:text-white transition-colors">Asset Manager</a>
            <a href="#file-system" className="hover:text-white transition-colors">Black Box FS</a>
          </nav>
        )}

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {view !== 'admin' && (
            <button
              onClick={() => navigateTo('admin-login')}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition-all duration-200 shrink-0"
            >
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              Admin Portal
            </button>
          )}
          {view === 'admin' && (
            <button
              onClick={() => navigateTo('guest')}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 px-3.5 py-2 rounded-xl transition-all duration-200 shrink-0"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              Live Console View
            </button>
          )}
          {isGuest && (
            <a
              href="#monitor"
              className="gradient-bg btn-primary text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 flex items-center gap-1.5"
            >
              Launch Console
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Mobile Header Buttons (Admin badge + Hamburger toggle) */}
        <div className="flex md:hidden items-center gap-2">
          {view !== 'admin' && (
            <button
              onClick={() => navigateTo('admin-login')}
              aria-label="Admin Portal"
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1.5 rounded-lg active:scale-95 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px]">Admin</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="p-2.5 rounded-xl bg-slate-900 border border-indigo-500/20 text-slate-300 hover:text-white hover:border-indigo-500/40 active:scale-95 transition-all focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Modal / Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 sm:top-20 bg-slate-950/98 backdrop-blur-2xl border-b border-indigo-500/20 shadow-2xl z-50 animate-in slide-in-from-top duration-200">
          <div className="px-5 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 px-2">
              Navigation &amp; Controls
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleMobileNav('#monitor')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/15 text-left text-sm font-semibold text-white hover:bg-indigo-600/15 active:bg-indigo-600/25 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  Live Operations Console
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">REALTIME</span>
              </button>

              <button
                onClick={() => handleMobileNav('#asset-manager')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/15 text-left text-sm font-semibold text-white hover:bg-indigo-600/15 active:bg-indigo-600/25 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HardDrive className="w-4 h-4 text-purple-400" />
                  Asset CRUD Manager
                </span>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">DATABASE</span>
              </button>

              <button
                onClick={() => handleMobileNav('#file-system')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-indigo-500/15 text-left text-sm font-semibold text-white hover:bg-indigo-600/15 active:bg-indigo-600/25 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  Black Box File System
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">NODE FS</span>
              </button>

              <button
                onClick={() => handleMobileNav('#objectives')}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-left text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Target className="w-4 h-4 text-indigo-400" />
                Project Targets &amp; Impact
              </button>

              <button
                onClick={() => handleMobileNav('#features')}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-left text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Zap className="w-4 h-4 text-pink-400" />
                Platform Capabilities
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2">
              {view !== 'admin' ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('admin-login');
                  }}
                  className="w-full gradient-bg btn-primary text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Access Admin Terminal
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('guest');
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                  Switch to Guest View
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

