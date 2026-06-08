'use client';
import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import { getSchedules, getTeams, createSchedule, updateSchedule, deleteSchedule } from '@/lib/api';

const empty = { title:'', area:'', collectionDate:'', collectionTime:'', team:'', wasteTypes:'', notes:'' };
const badge = s => ({ scheduled:'bg-blue-100 text-blue-700', 'in-progress':'bg-purple-100 text-purple-700', completed:'bg-green-100 text-green-700', cancelled:'bg-red-100 text-red-700' }[s]||'bg-gray-100 text-gray-700');

export default function AdminSchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const load = () => Promise.all([getSchedules(), getTeams()]).then(([s,t])=>{setSchedules(s.data||[]);setTeams(t.data||[]);setLoading(false);});
  useEffect(() => {
    load();
  }, []);

  const openEdit = (s) => { setForm({...s, team:s.team?._id||s.team||'', collectionDate:s.collectionDate?new Date(s.collectionDate).toISOString().split('T')[0]:'', wasteTypes:(s.wasteTypes||[]).join(', ')}); setModal(s); };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, wasteTypes: form.wasteTypes.split(',').map(s=>s.trim()).filter(Boolean) };
    if (!payload.team) delete payload.team;
    modal==='add' ? await createSchedule(payload) : await updateSchedule(modal._id, payload);
    setSaving(false); setModal(null); load();
  };

  const handleDelete = async (id) => { if(!confirm('Delete?'))return; await deleteSchedule(id); load(); };

  return (
    <AuthGuard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-gray-800">Schedules</h1><p className="text-gray-500 text-sm">{schedules.length} schedules</p></div>
          <button onClick={()=>{setForm(empty);setModal('add');}} className="btn-primary">+ Add Schedule</button>
        </div>
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>{['Title','Area','Date','Time','Team','Status','Actions'].map(h=><th key={h} className="text-left px-4 py-3 text-xs uppercase text-gray-600 font-medium">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-50">
                {schedules.length===0 ? <tr><td colSpan={7} className="text-center py-12 text-gray-500">No schedules yet.</td></tr>
                : schedules.map(s=>(
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{s.title}</td>
                    <td className="px-4 py-3 text-gray-600">{s.area}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(s.collectionDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-500">{s.collectionTime}</td>
                    <td className="px-4 py-3 text-gray-500">{s.team?.teamName||'–'}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge(s.status)}`}>{s.status}</span></td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={()=>openEdit(s)} className="text-xs text-blue-600 hover:underline">Edit</button>
                      <button onClick={()=>handleDelete(s._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {modal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4"><h2 className="font-bold text-lg">{modal==='add'?'Add Schedule':'Edit Schedule'}</h2><button onClick={()=>setModal(null)} className="text-gray-400 text-xl">✕</button></div>
              <div className="space-y-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input className="input-field" value={form.title} onChange={e=>set('title',e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Area *</label><input className="input-field" placeholder="Colombo 07" value={form.area} onChange={e=>set('area',e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date *</label><input type="date" className="input-field" value={form.collectionDate} onChange={e=>set('collectionDate',e.target.value)} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Time *</label><input type="time" className="input-field" value={form.collectionTime} onChange={e=>set('collectionTime',e.target.value)} /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                  <select className="input-field" value={form.team} onChange={e=>set('team',e.target.value)}>
                    <option value="">No team</option>
                    {teams.map(t=><option key={t._id} value={t._id}>{t.teamName}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Waste Types (comma separated)</label><input className="input-field" placeholder="General, Recyclables" value={form.wasteTypes} onChange={e=>set('wasteTypes',e.target.value)} /></div>
                {modal!=='add' && <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="input-field" value={form.status} onChange={e=>set('status',e.target.value)}>
                    {['scheduled','in-progress','completed','cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>}
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes</label><textarea className="input-field" rows={2} value={form.notes} onChange={e=>set('notes',e.target.value)} /></div>
              </div>
              <div className="flex justify-end gap-3 mt-5 pt-4 border-t">
                <button onClick={()=>setModal(null)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="btn-primary">{saving?'Saving...':'Save'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
