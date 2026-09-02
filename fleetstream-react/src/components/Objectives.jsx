import React from 'react';
import { TrendingDown, Gauge, ShieldCheck } from 'lucide-react';

const ITEMS = [
  {
    icon: TrendingDown,
    title: 'Minimize Delivery Lag',
    desc: 'Provide dispatch operators with instantaneous fleet location streams to proactively route around active bottlenecks.',
  },
  {
    icon: Gauge,
    title: 'Optimize Fuel Efficiency',
    desc: 'Enforce strict accountability structures over fleet operations by identifying and logging prolonged engine idling patterns.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Asset Safety',
    desc: 'Establish persistent geographical containment perimeters backed by automated threat alerts to defend vehicle hardware.',
  },
];

export default function Objectives() {
  return (
    <section id="objectives" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-indigo-500/10 scroll-mt-20 sm:scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Project Targets</h2>
        <p className="text-2xl sm:text-4xl font-black text-white gradient-text font-outfit">Core Objectives &amp; Business Impact</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass-card hover-glow p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-indigo-500/8">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/15 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 border border-emerald-500/20">
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-outfit">{title}</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
