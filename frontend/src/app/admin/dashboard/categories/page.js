'use client';
import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api';

const empty = { name:'', description:'', icon:'♻️', color:'#22c55e', acceptedItems:'', notAcceptedItems:'', guidelines:'' };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const load = () => getCategories().then(d=>{setCategories(d.data||[]);setLoading(false);});
  useEffect(() => {
    load();
  }, []);

  const openEdit = (cat) => { setForm({...cat, acceptedItems:(cat.acceptedItems||[]).join(', '), notAcceptedItems:(cat.notAcceptedItems||[]).join(', '), guidelines:(cat.guidelines||[]).join(', ')}); setModal(cat); };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, acceptedItems:form.acceptedItems.split(',').map(s=>s.trim()).filter(Boolean), notAcceptedItems:form.notAcceptedItems.split(',').map(s=>s.trim()).filter(Boolean), guidelines:form.guidelines.split(',').map(s=>s.trim()).filter(Boolean) };
    modal==='add' ? await createCategory(payload) : await updateCategory(modal._id, payload);
    setSaving(false); setModal(null); load();
  };

  const handleDelete = async (id) => { if(!confirm('Delete?'))return; await deleteCategory(id); load(); };

  return (
    <AuthGuard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-gray-800">Recycling Categories</h1><p className="text-gray-500 text-sm">{categories.length} categories</p></div>
          <button onClick={()=>{setForm(empty);setModal('add');}} className="btn-primary">+ Add Category</button>
        </div>
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.length===0 ? <div className="col-span-3 text-center py-16 bg-white rounded-xl border text-gray-500">No categories yet.</div>
            : categories.map(cat=>(
              <div key={cat._id} className="card p-5" style={{borderTop:`3px solid ${cat.color}`}}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{cat.icon}</span>
                  <div className="flex gap-2">
                    <button onClick={()=>openEdit(cat)} className="text-xs text-blue-600 hover:underline">Edit</button>
                    <button onClick={()=>handleDelete(cat._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800">{cat.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{cat.description}</p>
                {cat.acceptedItems?.length>0 && <p className="text-xs text-green-600 mt-2">✅ {cat.acceptedItems.slice(0,3).join(', ')}</p>}
              </div>
            ))}
          </div>
        )}
        {modal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4"><h2 className="font-bold text-lg">{modal==='add'?'Add Category':'Edit Category'}</h2><button onClick={()=>setModal(null)} className="text-gray-400 text-xl">✕</button></div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input className="input-field" value={form.name} onChange={e=>set('name',e.target.value)} /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Icon</label><input className="input-field" value={form.icon} onChange={e=>set('icon',e.target.value)} /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea className="input-field" rows={2} value={form.description} onChange={e=>set('description',e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Color</label><input type="color" className="h-9 w-full rounded border border-gray-300 cursor-pointer" value={form.color} onChange={e=>set('color',e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Accepted Items (comma separated)</label><input className="input-field" placeholder="Paper, Cardboard" value={form.acceptedItems} onChange={e=>set('acceptedItems',e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Not Accepted (comma separated)</label><input className="input-field" placeholder="Contaminated items" value={form.notAcceptedItems} onChange={e=>set('notAcceptedItems',e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Guidelines (comma separated)</label><input className="input-field" value={form.guidelines} onChange={e=>set('guidelines',e.target.value)} /></div>
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
