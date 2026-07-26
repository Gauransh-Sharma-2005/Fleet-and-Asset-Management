import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Info, User, Lock, Eye, EyeOff, Fingerprint } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function AdminLogin() {
  const { navigateTo, login } = useFleet();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(user.trim(), pass.trim());
    if (!ok) {
      setError('🔒 Access denied: Invalid credentials. Authentication failed.');
    } else {
      setError('');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="glass hover-glow w-full max-w-md rounded-3xl p-8 border border-indigo-500/15 shadow-2xl shadow-indigo-500/10 relative">
        <button
          onClick={() => navigateTo('guest')}
          className="absolute top-5 left-5 text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center mt-4 mb-8">
          <div className="gradient-bg w-14 h-14 rounded-2xl flex items-center justify-center mx-auto text-white shadow-xl shadow-indigo-500/30 mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white font-outfit">Admin Authentication</h1>
          <p className="text-slate-500 text-xs mt-1.5 font-mono">Secure node identity verification required</p>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl p-3.5 text-xs mb-6 font-mono flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Demo Credentials:</span>
            <br />
            Username: <span className="text-emerald-400 font-bold">admin</span> &nbsp; / &nbsp;
            Password: <span className="text-emerald-400 font-bold">admin</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500 font-mono block mb-1.5">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-slate-950/80 border border-white/8 text-white text-sm rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-indigo-500 font-mono placeholder-slate-700 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest uppercase text-slate-500 font-mono block mb-1.5">Secure Token</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter secure token key"
                className="w-full bg-slate-950/80 border border-white/8 text-white text-sm rounded-xl pl-10 pr-12 py-3.5 focus:outline-none focus:border-indigo-500 font-mono placeholder-slate-700 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-rose-400 text-xs font-mono flex items-center gap-1.5">{error}</p>}

          <button
            type="submit"
            className="w-full gradient-bg btn-primary text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            <Fingerprint className="w-4 h-4" />
            Authenticate Console Node
          </button>
        </form>
      </div>
    </div>
  );
}
