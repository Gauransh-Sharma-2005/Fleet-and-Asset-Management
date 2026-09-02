import React from 'react';
import { Zap, Navigation, Bell, History } from 'lucide-react';

const ITEMS = [
  {
    icon: Zap,
    color: 'indigo',
    title: 'High-Frequency Telemetry Ingestion',
    desc: 'Streams continuous location, speed, and heading diagnostics from edge tracking devices at fixed 5-second intervals.',
    tags: [['5s interval', 'indigo'], ['Real-time', 'purple']],
  },
  {
    icon: Navigation,
    color: 'purple',
    title: 'Automated Geofencing Perimeters',
    desc: 'Leverages spatial database polygons to map and instantly track when physical assets enter or exit designated yard operational areas.',
    tags: [['Polygon-based', 'purple'], ['Auto-track', 'pink']],
  },
  {
    icon: Bell,
    color: 'pink',
    title: 'Instant Safety Exception Alerts',
    desc: 'Runs an event-driven engine that continuously flags asset speeding violations or harsh braking actions the exact millisecond they occur.',
    tags: [['Millisecond', 'pink'], ['Event-driven', 'cyan']],
  },
  {
    icon: History,
    color: 'cyan',
    title: 'Time-Series Path Breadcrumbs',
    desc: 'Maintains structured ledger archives containing sequential trajectory records to accurately reconstruct historical asset travel maps.',
    tags: [['Historical', 'cyan'], ['Structured', 'indigo']],
  },
];

const TAG_CLASSES = {
  indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20',
  purple: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
  pink: 'bg-pink-500/15 text-pink-300 border-pink-500/20',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
};

const ICON_WRAP_CLASSES = {
  indigo: 'from-indigo-500/25 to-indigo-600/20 text-indigo-400 border-indigo-500/20',
  purple: 'from-purple-500/25 to-purple-600/20 text-purple-400 border-purple-500/20',
  pink: 'from-pink-500/25 to-pink-600/20 text-pink-400 border-pink-500/20',
  cyan: 'from-cyan-500/25 to-cyan-600/20 text-cyan-400 border-cyan-500/20',
};

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-indigo-500/10 scroll-mt-20 sm:scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <h2 className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2">System Capabilities</h2>
        <p className="text-2xl sm:text-4xl font-black text-white gradient-text font-outfit">Platform Core Features</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {ITEMS.map(({ icon: Icon, color, title, desc, tags }) => (
          <div key={title} className="glass-card hover-glow p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border border-purple-500/8">
            <div className={`bg-gradient-to-br ${ICON_WRAP_CLASSES[color]} p-3.5 sm:p-4 rounded-2xl shrink-0 border`}>
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white mb-2 font-outfit">{title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{desc}</p>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {tags.map(([label, tagColor]) => (
                  <span key={label} className={`${TAG_CLASSES[tagColor]} text-[10px] sm:text-xs px-2 py-0.5 rounded border font-mono font-bold`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
