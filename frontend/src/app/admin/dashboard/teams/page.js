'use client';
import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import { getTeams, createTeam, updateTeam, deleteTeam } from '@/lib/api';

const empty = { teamName:'', teamLeader:'', members:'', vehicleNumber:'', contactNumber:'', area:'' };

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const load = () => getTeams().then(d=>{setTeams(d.data||[]);setLoading(false);});
  useEffect(() => {
    load();
  }, []);

  const openEdit = (t) => { setForm({...t, members:(t.members||[]).join(', ')}); setModal(t); };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, members: form.members.split(',').map(s=>s.trim()).filter(Boolean) };
    modal==='add' ? await createTeam(payload) : await updateTeam(modal._id, payload);
    setSaving(false); setModal(null); load();
  };

  const handleDelete = async (id) => { if(!confirm('Delete?'))return; await deleteTeam(id); load(); };

  return (
    <AuthGuard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-gray-800">Collection Teams</h1><p className="text-gray-500 text-sm">{teams.length} teams</p></div>
          <button onClick={()=>{setForm(empty);setModal('add');}} className="btn-primary">+ Add Team</button>
        </div>
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.length===0 ? <div className="col-span-3 text-center py-16 bg-white rounded-xl border text-gray-500">No teams yet.</div>
            : teams.map(t=>(
              <div key={t._id} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-green-100 rounded-lg p-2 text-2xl">👥</div>
                  <div className="flex gap-2">
                    <button onClick={()=>openEdit(t)} className="text-xs text-blue-600 hover:underline">Edit</button>
                    <button onClick={()=>handleDelete(t._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800">{t.teamName}</h3>
                <p className="text-gray-600 text-sm">👤 {t.teamLeader}</p>
                {t.area && <p className="text-gray-500 text-sm">📍 {t.area}</p>}
                <p className="text-gray-500 text-sm">📞 {t.contactNumber}</p>
                {t.vehicleNumber && <p className="text-gray-500 text-sm">🚛 {t.vehicleNumber}</p>}
                {t.members?.length>0 && <p className="text-xs text-gray-400 mt-2">{t.members.join(', ')}</p>}
              </div>
            ))}
          </div>
        )}
        {modal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4"><h2 className="font-bold text-lg">{modal==='add'?'Add Team':'Edit Team'}</h2><button onClick={()=>setModal(null)} className="text-gray-400 text-xl">✕</button></div>
              <div className="space-y-3">
                {[['teamName','Team Name *','e.g. Green Squad A'],['teamLeader','Team Leader *','Leader name'],['contactNumber','Contact Number *','+94 77 123 4567'],['vehicleNumber','Vehicle Number','WP ABC-1234'],['area','Area','Colombo 03']].map(([key,label,ph])=>(
                  <div key={key}><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label><input className="input-field" placeholder={ph} value={form[key]||''} onChange={e=>set(key,e.target.value)} /></div>
                ))}
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Members (comma separated)</label><input className="input-field" placeholder="John, Mary, David" value={form.members||''} onChange={e=>set('members',e.target.value)} /></div>
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
