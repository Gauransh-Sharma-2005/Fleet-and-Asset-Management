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
      className="relative py-12 sm:py-24 md:py-36 text-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/85 via-[#030712]/75 to-[#030712]/90 backdrop-blur-[2px]"></div>

      {/* Floating orbs */}
      <div className="hidden sm:block float-orb w-72 md:w-96 h-72 md:h-96 bg-indigo-600/40 top-10 left-10 absolute rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="hidden sm:block float-orb w-64 md:w-80 h-64 md:h-80 bg-purple-600/40 top-20 right-10 absolute rounded-full blur-3xl opacity-20 pointer-events-none" style={{ animationDelay: '-5s' }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-indigo-500/25 border border-indigo-400/40 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold text-indigo-300 badge-glow max-w-full truncate">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shrink-0"></span>
          <span className="truncate">Real-Time Multi-Region Telemetry Domain</span>
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight font-outfit" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.55)' }}>
          Real-Time Fleet &amp;
          <br />
          <span className="gradient-text" style={{ filter: 'brightness(1.3)' }}>Asset Management</span>
          <br className="hidden sm:inline" /> <span className="inline sm:inline">System</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium px-2 sm:px-0" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          Eliminate operational blind spots by transforming physical vehicles into{' '}
          <span className="text-indigo-300 font-bold bg-indigo-500/15 px-1.5 sm:px-2 py-0.5 rounded">intelligent, data-streaming nodes</span>.
          Built with native React state management and a{' '}
          <span className="text-purple-300 font-bold bg-purple-500/15 px-1.5 sm:px-2 py-0.5 rounded">distributed cloud topology</span>.
        </p>

        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <a
            href="#monitor"
            className="w-full sm:w-auto gradient-bg btn-primary text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-2xl shadow-indigo-500/40 flex items-center justify-center gap-2.5 active:scale-95 transition-all"
          >
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
            Open Telemetry Monitor
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <button
            onClick={requestNotificationPermission}
            className={`w-full sm:w-auto btn-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-colors active:scale-95 ${
              notiEnabled
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'glass text-slate-300 hover:border-indigo-500/40'
            }`}
          >
            {notiEnabled ? <BellRing className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> : <Bell className="w-4 h-4 sm:w-5 sm:h-5" />}
            {notiEnabled ? 'System Alerts Enabled' : 'Enable System Notifications'}
          </button>
        </div>
      </div>
    </section>
  );
}
