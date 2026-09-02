import React, { useEffect } from 'react';
import GpsSimulator from './GpsSimulator';
import DiagnosticForm from './DiagnosticForm';
import StatsCards from './StatsCards';
import TelemetryChart from './TelemetryChart';
import ExceptionFeed from './ExceptionFeed';
import { useFleet } from '../context/FleetContext';

export default function LiveMonitor() {
  const { clearLogs, appendLog } = useFleet();

  // Keyboard shortcut: Shift+C = clear logs
  useEffect(() => {
    function handleKey(e) {
      if (e.shiftKey && e.key.toLowerCase() === 'c') {
        clearLogs();
        appendLog('INFO', 'Logs cleared via keyboard shortcut (Shift+C).');
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [clearLogs, appendLog]);

  return (
    <section id="monitor" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-indigo-500/10 scroll-mt-20 sm:scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">Live Operations Console</h2>
        <p className="text-2xl sm:text-4xl font-black text-white gradient-text font-outfit">Real-Time Control Room</p>
      </div>

      <GpsSimulator />
      <DiagnosticForm />
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
        <TelemetryChart />
        <ExceptionFeed />
      </div>
    </section>
  );
}
