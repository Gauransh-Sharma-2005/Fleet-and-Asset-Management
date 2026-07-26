import React, { useState } from 'react';
import { Terminal, ArrowRight, Bell, BellRing, Sparkles } from 'lucide-react';

export default function Hero() {
  const [notiEnabled, setNotiEnabled] = useState(false);

  const requestNotificationPermission = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop alerts.');
      return;
    }
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        setNotiEnabled(true);
        new Notification('FleetStream Active', { body: 'System alerts integrated with infrastructure pipeline.' });
      }
    });
  };

  return (
    <section
      className="relative py-36 sm:py-48 text-center overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/93 via-[#030712]/90 to-[#030712]/97 backdrop-blur-[2px]"></div>

      {/* Floating orbs */}
      <div className="float-orb w-96 h-96 bg-indigo-600/50 top-10 left-10 absolute rounded-full blur-3xl opacity-45"></div>
      <div className="float-orb w-80 h-80 bg-purple-600/50 top-20 right-20 absolute rounded-full blur-3xl opacity-45" style={{ animationDelay: '-5s' }}></div>
      <div className="float-orb w-64 h-64 bg-pink-600/45 bottom-20 left-1/4 absolute rounded-full blur-3xl opacity-45" style={{ animationDelay: '-10s' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-10">
        <div className="inline-flex items-center space-x-3 bg-indigo-500/25 border border-indigo-400/40 px-6 py-2.5 rounded-full text-xs font-bold text-indigo-300 badge-glow">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>Real-Time Multi-Region Telemetry Domain</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          Real-Time Fleet &amp;
          <br />
          <span className="gradient-text">Asset Management</span>
          <br /> System
        </h1>

        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          Eliminate operational blind spots by transforming physical vehicles into{' '}
          <span className="text-indigo-300 font-bold bg-indigo-500/15 px-2 py-0.5 rounded">intelligent, data-streaming nodes</span>.
          Built with native React state management and a{' '}
          <span className="text-purple-300 font-bold bg-purple-500/15 px-2 py-0.5 rounded">highly scalable distributed topology</span>.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#monitor"
            className="gradient-bg btn-primary text-white px-10 py-4 rounded-xl font-bold text-base shadow-2xl shadow-indigo-500/40 flex items-center justify-center gap-3"
          >
            <Terminal className="w-5 h-5" />
            Open Telemetry Monitor
            <ArrowRight className="w-5 h-5" />
          </a>
          <button
            onClick={requestNotificationPermission}
            className={`btn-primary px-10 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-colors ${
              notiEnabled
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'glass text-slate-300 hover:border-indigo-500/40'
            }`}
          >
            {notiEnabled ? <BellRing className="w-5 h-5 text-emerald-400" /> : <Bell className="w-5 h-5" />}
            {notiEnabled ? 'System Alerts Enabled' : 'Enable System Notifications'}
          </button>
        </div>
      </div>
    </section>
  );
}
