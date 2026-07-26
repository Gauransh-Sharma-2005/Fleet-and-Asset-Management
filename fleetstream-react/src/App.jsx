import React, { useEffect, useState } from 'react';
import { FleetProvider, useFleet } from './context/FleetContext';
import AlertBar from './components/AlertBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TelemetrySandbox from './components/TelemetrySandbox';
import Objectives from './components/Objectives';
import Features from './components/Features';
import LiveMonitor from './components/LiveMonitor';
import AdminLogin from './components/AdminLogin';
import Handshake from './components/Handshake';
import AdminDashboard from './components/AdminDashboard';
import AssetManager from './components/AssetManager';
import Footer from './components/Footer';

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    function onScroll() {
      const top = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setPct(h > 0 ? (top / h) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, height: 3, width: `${pct}%`,
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #ec4899)',
        zIndex: 9999, transition: 'width 0.1s ease-out',
      }}
    />
  );
}

function AmbientOrbs() {
  return (
    <>
      <div className="orb bg-indigo-600 w-[36rem] h-[36rem] -top-40 -left-40" style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(110px)', opacity: 0.12, pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="orb bg-purple-600 w-[32rem] h-[32rem] top-1/3 right-0" style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(110px)', opacity: 0.12, pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="orb bg-pink-600 w-[28rem] h-[28rem] bottom-0 left-1/3" style={{ position: 'fixed', borderRadius: '50%', filter: 'blur(110px)', opacity: 0.12, pointerEvents: 'none', zIndex: 0 }}></div>
    </>
  );
}

function GuestView() {
  return (
    <>
      <Hero />
      <TelemetrySandbox />
      <Objectives />
      <Features />
      <LiveMonitor />
      {/* Asset CRUD management, ported from the original AssetManager component */}
      <AssetManager />
    </>
  );
}

function Shell() {
  const { view } = useFleet();

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <AmbientOrbs />
      <ScrollProgress />
      <AlertBar />
      <Navbar />
      <main className="flex-grow relative z-10">
        {view === 'guest' && <GuestView />}
        {view === 'admin-login' && <AdminLogin />}
        {view === 'handshake' && <Handshake />}
        {view === 'admin' && <AdminDashboard />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <FleetProvider>
      <Shell />
    </FleetProvider>
  );
}
