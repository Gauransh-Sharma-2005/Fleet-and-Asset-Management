import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { LineChart } from 'lucide-react';
import { useFleet } from '../context/FleetContext';

export default function TelemetryChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const valuesRef = useRef([]);
  const { ingest } = useFleet();
  const ingestRef = useRef(ingest);
  ingestRef.current = ingest;

  useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;

    const labels = [];
    const values = [];
    for (let i = 0; i < 20; i++) {
      labels.push('');
      values.push(ingestRef.current + (Math.random() - 0.5) * 200);
    }
    valuesRef.current = values;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'pkts/s',
            data: values,
            borderColor: '#6366f1',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.45,
            fill: true,
            backgroundColor: (c) => {
              const g = c.chart.ctx.createLinearGradient(0, 0, 0, 180);
              g.addColorStop(0, 'rgba(99,102,241,0.18)');
              g.addColorStop(1, 'rgba(99,102,241,0.0)');
              return g;
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: {
            grid: { color: 'rgba(99,102,241,0.05)' },
            ticks: { color: '#475569', font: { size: 9, family: 'JetBrains Mono' } },
          },
        },
        animation: { duration: 400 },
      },
    });

    const interval = setInterval(() => {
      if (document.visibilityState !== 'visible' || !chartRef.current) return;
      const next = Math.max(100, ingestRef.current + (Math.random() - 0.5) * 300);
      valuesRef.current.shift();
      valuesRef.current.push(next);
      chartRef.current.update();
    }, 1200);

    return () => {
      clearInterval(interval);
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <div className="glass hover-glow p-6 rounded-3xl border border-indigo-500/10 lg:col-span-2 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-outfit mb-1">
          <LineChart className="w-4 h-4 text-indigo-400" />
          Live Ingest Rate
        </h3>
        <p className="text-[10px] text-slate-500 font-mono">Packets per second — gateway simulation</p>
      </div>
      <div className="flex-1 relative" style={{ minHeight: 180 }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
