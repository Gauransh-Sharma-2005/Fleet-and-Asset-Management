import React, { useState } from 'react';
import { Radio, AlertTriangle } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function GpsSimulator() {
  const { appendLog, triggerFault } = useFleet();
  const [lat, setLat] = useState('Not Connected');
  const [lng, setLng] = useState('Not Connected');

  const startEdgeTracking = () => {
    if (!('geolocation' in navigator)) {
      alert('Geolocation API not supported by this web browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const la = pos.coords.latitude.toFixed(5);
        const ln = pos.coords.longitude.toFixed(5);
        setLat(la);
        setLng(ln);
        appendLog('INFO', `Edge device simulator broadcast coordinates: [Lat: ${la}, Lng: ${ln}]`);
      },
      () => appendLog('WARNING', 'Telemetry connection failure: Browser location query rejected.')
    );
  };

  const simulateInfraction = () => {
    appendLog('CRITICAL', 'Simulated hardware threshold breach: OVERSPEED alert triggered on device #SIM-01');
    if ('vibrate' in navigator) navigator.vibrate([300, 100, 300]);
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification('CRITICAL SYSTEM ALERT', { body: 'Vehicle #SIM-01 broke business rule: OVERSPEED anomaly detected.' });
    } else {
      alert('Alert registered! (Enable desktop notifications above for full out-of-browser push windows)');
    }
    triggerFault();
  };

  return (
    <div className="glass hover-glow p-5 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-10 border border-indigo-500/10 shadow-2xl shadow-indigo-500/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-center">
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2.5 sm:gap-3 font-outfit">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500 status-active"></span>
            </span>
            <span className="gradient-text">HTML5 Edge Simulator Node</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pulls live browser Geolocation telemetry coordinates and routes them straight to storage registers.
          </p>
        </div>

        <div className="text-xs space-y-2.5 font-mono text-slate-400 bg-slate-950/70 p-4 rounded-xl sm:rounded-2xl border border-indigo-500/10">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="text-slate-500">Latitude:</span>
            <span className="text-indigo-300 font-bold stats-pulse">{lat}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="text-slate-500">Longitude:</span>
            <span className="text-purple-300 font-bold stats-pulse">{lng}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3 justify-end">
          <button
            onClick={startEdgeTracking}
            className="w-full gradient-bg btn-primary text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Radio className="w-4 h-4" />
            Stream Device GPS
          </button>
          <button
            onClick={simulateInfraction}
            className="w-full btn-primary bg-red-950/40 hover:bg-red-900/60 text-rose-400 border border-red-500/40 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <AlertTriangle className="w-4 h-4" />
            Trigger Alert Test
          </button>
        </div>
      </div>
    </div>
  );
}
