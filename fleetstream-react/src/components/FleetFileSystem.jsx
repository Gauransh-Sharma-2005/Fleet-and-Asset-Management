import React, { useState } from 'react';
import axios from 'axios';
import { Terminal, HardDrive, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function FleetFileSystem() {
  const [assetId, setAssetId] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [status, setStatus] = useState('Optimal');
  const [reading, setReading] = useState('');
  const [fileLogs, setFileLogs] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveLog = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/save-log', {
      assetId,
      sensorType,
      status,
      reading
    })
    .then((res) => {
      setStatusMsg(res.data);
      setAssetId('');
      setSensorType('');
      setReading('');
      handleViewLogs(); // Automatically refresh logs after saving
      setTimeout(() => setStatusMsg(''), 4000);
    })
    .catch((err) => {
      console.error(err);
      setStatusMsg('Error saving log to server.');
    });
  };

  const handleViewLogs = () => {
    setLoading(true);
    axios.get('http://localhost:3001/get-logs')
      .then((res) => {
        setFileLogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setFileLogs('No log records found or error reading file.');
        setLoading(false);
      });
  };

  return (
    <div id="file-system" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8 scroll-mt-20 sm:scroll-mt-24 border-t border-indigo-500/10">
      {/* Header */}
      <div className="flex items-start sm:items-center gap-3">
        <div className="p-2.5 sm:p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 shrink-0">
          <HardDrive className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-outfit">FleetStream - Black Box File System Manager</h2>
          <p className="text-slate-400 text-xs font-mono mt-0.5">Server-side file system persistence using Node.js `fs.appendFile` & `fs.readFile`</p>
        </div>
      </div>

      {statusMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {statusMsg}
        </div>
      )}

      {/* Main Grid Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Form Section */}
        <form onSubmit={handleSaveLog} className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-indigo-500/15 space-y-3.5 sm:space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Send className="w-4 h-4 text-indigo-400" /> New Log Entry
          </h3>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Asset Reference ID</label>
            <input 
              type="text" 
              placeholder="e.g., TRK-09" 
              value={assetId} 
              onChange={(e) => setAssetId(e.target.value)} 
              required 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Sensor Type</label>
            <input 
              type="text" 
              placeholder="e.g., Thermal Core" 
              value={sensorType} 
              onChange={(e) => setSensorType(e.target.value)} 
              required 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Operational Status</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Optimal">Optimal</option>
                <option value="Warning">Warning</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Sensor Reading</label>
              <input 
                type="text" 
                placeholder="Sensor Value" 
                value={reading} 
                onChange={(e) => setReading(e.target.value)} 
                required 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full gradient-bg btn-primary text-white font-bold rounded-xl px-4 py-3 sm:py-3.5 text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all mt-2"
          >
            <HardDrive className="w-4 h-4" /> Save Log to Server FS
          </button>
        </form>

        {/* Output / Terminal Section */}
        <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-indigo-500/15 flex flex-col space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" /> Stored Fleet Files
            </h3>
            <button 
              type="button"
              onClick={handleViewLogs} 
              className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Fetch Logs
            </button>
          </div>

          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3.5 sm:p-4 font-mono text-xs text-emerald-400/90 overflow-y-auto custom-scrollbar h-56 sm:h-64 whitespace-pre-wrap">
            {fileLogs || <span className="text-slate-600 italic">Click the fetch button to view content from server storage file...</span>}
          </div>
        </div>

      </div>
    </div>
  );
}