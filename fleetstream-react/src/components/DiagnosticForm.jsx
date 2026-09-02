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
    <div className="glass hover-glow p-5 sm:p-6 rounded-2xl sm:rounded-3xl mb-8 sm:mb-10 border border-indigo-500/10">
      <h3 className="text-sm font-bold text-white mb-3.5 sm:mb-4 flex items-center gap-2 font-outfit">
        <Keyboard className="w-4 h-4 text-purple-400" />
        Manual Diagnostic Override
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Asset ID (e.g., TRK-100)"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
          required
          pattern="[A-Za-z]{3}-[0-9]{3}"
          className="w-full bg-slate-900/80 border border-indigo-500/20 text-white text-base sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:border-indigo-500 font-mono flex-1 placeholder-slate-600 transition-colors"
        />
        <input
          type="number"
          placeholder="Core Temp (°C)"
          value={engineTemp}
          onChange={(e) => setEngineTemp(e.target.value)}
          required
          min="-50"
          max="250"
          className="w-full bg-slate-900/80 border border-indigo-500/20 text-white text-base sm:text-sm rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:border-indigo-500 font-mono flex-1 placeholder-slate-600 transition-colors"
        />
        <button
          type="submit"
          className="w-full sm:w-auto gradient-bg btn-primary text-white px-7 py-3 sm:py-3.5 rounded-xl text-sm font-bold shadow-md shadow-indigo-500/15 flex items-center justify-center gap-2 shrink-0 active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" />
          Log Diagnostic
        </button>
      </form>
      {error && <p className="text-rose-400 text-xs mt-3 flex items-center gap-1.5 leading-relaxed">{error}</p>}
    </div>
  );
}
