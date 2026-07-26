import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Save, X } from 'lucide-react';

export default function AssetManager() {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ assetId: '', type: 'Truck', status: 'Online', temp: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch records (Read)
  useEffect(() => {
    fetch('http://localhost:5000/assets')
      .then(res => res.json())
      .then(data => setAssets(data))
      .catch(err => console.error('Error fetching assets:', err));
  }, []);

  // Handle Form Submission (Create & Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      fetch(`http://localhost:5000/assets/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(updated => {
          setAssets(assets.map(a => a.id === editId ? updated : a));
          resetForm();
        });
    } else {
      fetch('http://localhost:5000/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(newAsset => {
          setAssets([...assets, newAsset]);
          resetForm();
        });
    }
  };

  const resetForm = () => {
    setFormData({ assetId: '', type: 'Truck', status: 'Online', temp: '', location: '' });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (asset) => {
    setFormData(asset);
    setIsEditing(true);
    setEditId(asset.id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/assets/${id}`, { method: 'DELETE' })
      .then(() => {
        setAssets(assets.filter(a => a.id !== id));
      });
  };

  const filteredAssets = assets.filter(a =>
    a.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white">Asset CRUD Operations</h2>
          <p className="text-slate-400 text-sm">Manage fleet registration, telemetry status, and attributes via JSON Server.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID or Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-indigo-500/20 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/60 p-6 rounded-2xl border border-indigo-500/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          type="text" placeholder="Asset ID (e.g. TRK-990)" required
          value={formData.assetId} onChange={(e) => setFormData({...formData, assetId: e.target.value})}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white"
        />
        <select
          value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white"
        >
          <option value="Truck">Truck</option>
          <option value="Van">Van</option>
          <option value="Heavy Rig">Heavy Rig</option>
        </select>
        <input
          type="number" placeholder="Core Temp (°C)" required
          value={formData.temp} onChange={(e) => setFormData({...formData, temp: e.target.value})}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white"
        />
        <input
          type="text" placeholder="Location Zone" required
          value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white"
        />
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-4 py-3 text-sm flex items-center justify-center gap-2">
            {isEditing ? <Save className="w-4 h-4"/> : <Plus className="w-4 h-4"/>}
            {isEditing ? 'Update' : 'Add'}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="bg-slate-800 text-slate-300 px-3 rounded-xl">
              <X className="w-4 h-4"/>
            </button>
          )}
        </div>
      </form>

      <div className="bg-slate-900/40 rounded-2xl border border-indigo-500/10 overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300 font-mono">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4">Asset Ref</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Core Temp</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredAssets.length > 0 ? filteredAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-indigo-300">{asset.assetId}</td>
                <td className="p-4">{asset.type}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${asset.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="p-4">{asset.temp}°C</td>
                <td className="p-4">{asset.location}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(asset)} className="p-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-lg">
                    <Edit className="w-4 h-4"/>
                  </button>
                  <button onClick={() => handleDelete(asset.id)} className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="p-6 text-center text-slate-500 italic">No asset records found matching query.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
