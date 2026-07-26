import React, { useState } from 'react';
import { Keyboard, Send } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function DiagnosticForm() {
  const { appendLog } = useFleet();
  const [assetId, setAssetId] = useState('');
  const [engineTemp, setEngineTemp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = parseFloat(engineTemp);
    if (temp > 120) {
      setError('⚠ Temperature exceeds maximum safe diagnostic limit (120°C). Triage required.');
      return;
    }
    setError('');
    appendLog('INFO', `Manual override logged for ${assetId.toUpperCase()}: Core Temp at ${temp}°C`);
    setAssetId('');
    setEngineTemp('');
  };

  return (
    <div className="glass hover-glow p-6 rounded-3xl mb-10 border border-indigo-500/10">
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 font-outfit">
        <Keyboard className="w-4 h-4 text-purple-400" />
        Manual Diagnostic Override
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Asset ID (e.g., TRK-100)"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
          required
          pattern="[A-Za-z]{3}-[0-9]{3}"
          className="bg-slate-900/80 border border-indigo-500/20 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 font-mono flex-1 placeholder-slate-600 transition-colors"
        />
        <input
          type="number"
          placeholder="Core Temp (°C)"
          value={engineTemp}
          onChange={(e) => setEngineTemp(e.target.value)}
          required
          min="-50"
          max="250"
          className="bg-slate-900/80 border border-indigo-500/20 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 font-mono flex-1 placeholder-slate-600 transition-colors"
        />
        <button
          type="submit"
          className="gradient-bg btn-primary text-white px-7 py-3 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/15 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Log Diagnostic
        </button>
      </form>
      {error && <p className="text-rose-400 text-xs mt-3 flex items-center gap-1.5">{error}</p>}
    </div>
  );
}
