import React, { useState } from 'react';
import { LogOut, SlidersHorizontal, Settings2, Megaphone, AlertTriangle, Eye } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function AdminDashboard() {
  const {
    logout,
    ingest, setIngest,
    latency, setLatency,
    fleetCount, setFleetCount,
    simNodeOnline, toggleSimNode,
    applyTempOverride,
    triggerFault,
    broadcastType, setBroadcastType,
    sendBroadcast,
    navigateTo,
  } = useFleet();

  const [tempVal, setTempVal] = useState(98);
  const [broadcastMsg, setBroadcastMsg] = useState('');

  const handleSendBroadcast = () => {
    if (!broadcastMsg.trim()) {
      alert('Enter an alert message before broadcasting.');
      return;
    }
    sendBroadcast(broadcastMsg);
    setBroadcastMsg('');
  };

  const broadcastBtnClasses = (type, activeClasses) =>
    `flex-1 btype-btn text-[10px] font-mono font-bold py-2 rounded-lg border transition-all ${
      broadcastType === type ? `ring-1 ring-white/20 ${activeClasses}` : 'border-slate-700 text-slate-600 hover:text-slate-400'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-indigo-500/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="gradient-bg text-white text-[9px] font-bold font-mono uppercase px-2.5 py-1 rounded-full tracking-wider">ADMIN NODE</span>
            <span className="text-slate-500 font-mono text-xs">Session: edge-admin-01</span>
          </div>
          <h1 className="text-4xl font-black text-white font-outfit">Secure Control Terminal</h1>
          <p className="text-slate-500 text-sm">Manage system parameters, inject diagnostics, and broadcast emergency alerts.</p>
        </div>
        <button
          onClick={logout}
          className="btn-primary bg-red-950/40 hover:bg-red-900/60 text-rose-400 border border-red-500/30 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 self-start md:self-auto"
        >
          <LogOut className="w-4 h-4" />
          Terminate Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panel 1: sliders */}
        <div className="glass hover-glow p-7 rounded-3xl border border-indigo-500/10 space-y-7">
          <h2 className="text-base font-bold text-white flex items-center gap-2 font-outfit border-b border-white/5 pb-4">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            Console Load Adjusters
          </h2>

          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Ingest Gateway Rate</span>
              <span className="text-indigo-300 font-bold">{ingest.toLocaleString()} pkts/s</span>
            </div>
            <input type="range" min="100" max="6000" step="50" value={ingest} onChange={(e) => setIngest(parseInt(e.target.value, 10))} className="w-full" />
            <p className="text-[9px] text-slate-600 font-mono">Updates dashboard ingest counter live.</p>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">DB Upsert Latency</span>
              <span className="text-purple-300 font-bold">{latency.toFixed(1)} ms</span>
            </div>
            <input type="range" min="0.5" max="35" step="0.1" value={latency} onChange={(e) => setLatency(parseFloat(e.target.value))} className="w-full" />
            <p className="text-[9px] text-slate-600 font-mono">Updates spatial upsert cycle metric card.</p>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Active Node Count</span>
              <span className="text-pink-300 font-bold">{fleetCount} / 350</span>
            </div>
            <input type="range" min="200" max="350" step="1" value={fleetCount} onChange={(e) => setFleetCount(parseInt(e.target.value, 10))} className="w-full" />
            <p className="text-[9px] text-slate-600 font-mono">Simulates nodes going on/offline.</p>
          </div>
        </div>

        {/* Panel 2: sim node controls */}
        <div className="glass hover-glow p-7 rounded-3xl border border-indigo-500/10 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 font-outfit border-b border-white/5 pb-4">
            <Settings2 className="w-4 h-4 text-purple-400" />
            Simulator Node Controls
          </h2>

          <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-2xl border border-white/5">
            <div>
              <div className="text-xs font-bold text-white font-mono">Node TRK-8821</div>
              <p className="text-[9px] text-slate-500 mt-0.5">Toggle online/offline state</p>
            </div>
            <button
              onClick={toggleSimNode}
              className={`text-[10px] font-bold font-mono px-3 py-1.5 rounded-lg transition-all border ${
                simNodeOnline
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
              }`}
            >
              {simNodeOnline ? 'ONLINE' : 'OFFLINE'}
            </button>
          </div>

          <div className="space-y-2.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500 font-mono block">Core Temp Override (°C)</label>
            <div className="flex gap-2.5">
              <input
                type="number"
                value={tempVal}
                onChange={(e) => setTempVal(parseFloat(e.target.value))}
                className="flex-1 bg-slate-950/80 border border-white/8 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 font-mono transition-colors"
              />
              <button
                onClick={() => applyTempOverride(tempVal)}
                className="gradient-bg btn-primary text-white px-4 py-3 rounded-xl text-xs font-bold shrink-0 shadow-md shadow-purple-500/15"
              >
                Apply
              </button>
            </div>
            <p className="text-[9px] text-slate-600 font-mono">Values &gt; 120°C log as CRITICAL violations.</p>
          </div>

          <button
            onClick={triggerFault}
            className="w-full btn-primary bg-red-950/40 hover:bg-red-900/60 text-rose-400 border border-red-500/30 py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <AlertTriangle className="w-4 h-4" />
            Force OVERSPEED Alert
          </button>
        </div>

        {/* Panel 3: emergency broadcast */}
        <div className="glass hover-glow p-7 rounded-3xl border border-indigo-500/10 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 font-outfit border-b border-white/5 pb-4">
            <Megaphone className="w-4 h-4 text-pink-400" />
            Emergency Broadcast
          </h2>

          <div className="space-y-2.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500 font-mono block">System-Wide Alert Message</label>
            <textarea
              rows={4}
              value={broadcastMsg}
              onChange={(e) => setBroadcastMsg(e.target.value)}
              placeholder="Enter emergency message for all operators. Example: Severe weather alert — reroute all zone-B assets immediately."
              className="w-full bg-slate-950/80 border border-white/8 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-pink-500 font-sans placeholder-slate-700 transition-colors resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={() => setBroadcastType('CRITICAL')} className={broadcastBtnClasses('CRITICAL', 'bg-rose-500/15 text-rose-400')}>CRITICAL</button>
            <button onClick={() => setBroadcastType('WARNING')} className={broadcastBtnClasses('WARNING', 'bg-amber-500/15 text-amber-400')}>WARNING</button>
            <button onClick={() => setBroadcastType('INFO')} className={broadcastBtnClasses('INFO', 'bg-slate-700/30 text-slate-300')}>INFO</button>
          </div>

          <button
            onClick={handleSendBroadcast}
            className="w-full gradient-bg btn-primary text-white py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-pink-500/15 flex items-center justify-center gap-2"
          >
            <Megaphone className="w-4 h-4" />
            Broadcast System-Wide Alert
          </button>
          <p className="text-[9px] text-slate-600 font-mono">Injects a CRITICAL exception into the live violations feed.</p>

          <button
            onClick={() => navigateTo('guest')}
            className="w-full text-[10px] text-indigo-400 hover:text-white transition-colors font-mono flex items-center justify-center gap-1.5 pt-1"
          >
            <Eye className="w-3.5 h-3.5" />
            View live exceptions feed
          </button>
        </div>
      </div>
    </div>
  );
}
