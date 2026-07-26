import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const FleetContext = createContext(null);

const BASE_LOGS = [
  { type: 'CRITICAL', text: 'Vehicle #TRK-8821 broken business rule: OVERSPEED (92 km/h)', time: 'Just Now' },
  { type: 'WARNING', text: 'Vehicle #VAN-4042 perimeter breach: GEO_VIOLATION entered Zone B', time: '3s ago' },
  { type: 'INFO', text: 'Device #IMEI-99210 triggered heartbeat operation: ONLINE connection established', time: '12s ago' },
  { type: 'CRITICAL', text: 'Vehicle #TRK-1092 dynamic event registered: HARSH_BRAKING anomaly detected', time: '1m ago' },
  { type: 'INFO', text: 'Gateway system health check initialized on cluster edge node #SVR-USW2', time: '4m ago' },
  { type: 'WARNING', text: 'Asset #TRK-5512 reporting low auxiliary sensor signal battery (12%)', time: '8m ago' },
  { type: 'INFO', text: 'Spatial map boundaries successfully synchronized with MySQL structural geometry', time: '15m ago' },
];

export function FleetProvider({ children }) {
  const [view, setView] = useState('guest'); // guest | admin-login | handshake | admin

  const [logs, setLogs] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('fleetstream_logs') || 'null');
    return stored && stored.length ? stored : BASE_LOGS;
  });
  const [filter, setFilter] = useState('ALL');

  const [ingest, setIngest] = useState(1420);
  const [latency, setLatency] = useState(4.2);
  const [fleetCount, setFleetCount] = useState(348);
  const [simNodeOnline, setSimNodeOnline] = useState(true);
  const [appStatus, setAppStatus] = useState('ACTIVE'); // ACTIVE | STANDBY | FAULT
  const [broadcastType, setBroadcastType] = useState('CRITICAL');
  const [adminAuthed, setAdminAuthed] = useState(() => sessionStorage.getItem('fsAdminAuth') === '1');

  useEffect(() => {
    localStorage.setItem('fleetstream_logs', JSON.stringify(logs));
  }, [logs]);

  // Page-visibility sensor, mirrors the original vanilla-JS behaviour
  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === 'visible') {
        setAppStatus((s) => (s === 'FAULT' ? s : 'ACTIVE'));
      } else {
        setAppStatus((s) => (s === 'FAULT' ? s : 'STANDBY'));
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const appendLog = useCallback((type, text) => {
    setLogs((prev) => {
      const next = [{ type, text, time: 'Just Now' }, ...prev];
      return next.slice(0, 50);
    });
  }, []);

  const clearLogs = useCallback(() => setLogs([]), []);

  const navigateTo = useCallback((name) => {
    setView(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const triggerFault = useCallback(() => {
    setAppStatus('FAULT');
    setTimeout(() => setAppStatus('ACTIVE'), 5000);
  }, []);

  const toggleSimNode = useCallback(() => {
    setSimNodeOnline((prev) => {
      const next = !prev;
      appendLog(
        next ? 'INFO' : 'WARNING',
        next
          ? 'Simulated vehicle node TRK-8821: Reconnected to ingestion gateway.'
          : 'Simulated vehicle node TRK-8821: Connection terminated by administrator command.'
      );
      return next;
    });
  }, [appendLog]);

  const applyTempOverride = useCallback(
    (temp) => {
      if (temp > 120) {
        appendLog('CRITICAL', `Core Temperature VIOLATION override on node TRK-8821: Engine Temp at ${temp}°C!`);
      } else {
        appendLog('INFO', `Core Temperature manually overridden on node TRK-8821: set to ${temp}°C.`);
      }
    },
    [appendLog]
  );

  const login = useCallback(
    (user, pass) => {
      if (user === 'admin' && pass === 'admin') {
        navigateTo('handshake');
        return true;
      }
      return false;
    },
    [navigateTo]
  );

  const completeHandshake = useCallback(() => {
    sessionStorage.setItem('fsAdminAuth', '1');
    setAdminAuthed(true);
    navigateTo('admin');
    appendLog('INFO', 'Administrator successfully authenticated. Admin console unlocked.');
  }, [appendLog, navigateTo]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('fsAdminAuth');
    setAdminAuthed(false);
    navigateTo('guest');
    appendLog('INFO', 'Administrator terminated session. Standard view restored.');
  }, [appendLog, navigateTo]);

  const sendBroadcast = useCallback(
    (msg) => {
      if (!msg.trim()) return false;
      appendLog(broadcastType, `[SYSTEM BROADCAST]: ${msg.trim()}`);
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        new Notification('FleetStream System Broadcast', { body: msg.trim() });
      }
      navigateTo('guest');
      setTimeout(() => {
        document.getElementById('monitor')?.scrollIntoView({ behavior: 'smooth' });
      }, 450);
      return true;
    },
    [appendLog, broadcastType, navigateTo]
  );

  const value = {
    view, navigateTo,
    logs, filter, setFilter, appendLog, clearLogs,
    ingest, setIngest, latency, setLatency, fleetCount, setFleetCount,
    simNodeOnline, toggleSimNode,
    appStatus, triggerFault,
    broadcastType, setBroadcastType, sendBroadcast,
    adminAuthed, login, completeHandshake, logout,
    applyTempOverride,
  };

  return <FleetContext.Provider value={value}>{children}</FleetContext.Provider>;
}

export function useFleet() {
  const ctx = useContext(FleetContext);
  if (!ctx) throw new Error('useFleet must be used inside <FleetProvider>');
  return ctx;
}
