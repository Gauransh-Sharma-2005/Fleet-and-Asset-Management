import React, { useEffect, useRef, useState } from 'react';
import { Fingerprint } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

const STEPS = [
  [600, 'Authorising gateway token keys...', <div className="text-purple-400" key="1">&gt; Admin credentials validated...</div>],
  [1300, 'Syncing cluster channel permissions...', <div className="text-cyan-400" key="2">&gt; Security token accepted. Binding cluster scope...</div>],
  [2000, 'Establishing encrypted session...', <div className="text-emerald-400" key="3">&gt; Session established. Loading admin dashboard...</div>],
];

export default function Handshake() {
  const { completeHandshake } = useFleet();
  const [message, setMessage] = useState('Authorising gateway token keys...');
  const [logLines, setLogLines] = useState([<div key="0">&gt; Connecting to identity verification node...</div>]);
  const doneRef = useRef(false);

  useEffect(() => {
    const timers = STEPS.map(([delay, msg, log]) =>
      setTimeout(() => {
        setMessage(msg);
        setLogLines((prev) => [...prev, log]);
      }, delay)
    );

    const finalTimer = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        completeHandshake();
      }
    }, 2600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="text-center space-y-8 max-w-sm w-full">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full spin-ring" style={{ border: '3px solid rgba(99,102,241,0.15)', borderTopColor: '#6366f1', borderRightColor: '#ec4899', animation: 'spin 1.1s linear infinite' }}></div>
          <div className="absolute inset-3 rounded-full border border-indigo-500/20 bg-slate-950 flex items-center justify-center">
            <Fingerprint className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black text-white font-outfit">Security Handshake</h2>
          <p className="text-slate-400 text-xs mt-2 font-mono">{message}</p>
        </div>
        <div className="glass p-4 rounded-2xl border border-indigo-500/10 text-[9px] font-mono text-left h-28 overflow-y-hidden space-y-1 text-indigo-400/70">
          {logLines}
        </div>
      </div>
    </div>
  );
}
