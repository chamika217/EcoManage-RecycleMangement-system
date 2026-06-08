'use client';
import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import { getRequests, updateRequest, deleteRequest } from '@/lib/api';

const STATUSES = ['pending','approved','in-progress','completed','cancelled'];
const badge = s => ({ pending:'bg-yellow-100 text-yellow-800', approved:'bg-blue-100 text-blue-800', completed:'bg-green-100 text-green-800', cancelled:'bg-red-100 text-red-800', 'in-progress':'bg-purple-100 text-purple-800' }[s]||'bg-gray-100 text-gray-800');

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => getRequests().then(d=>{setRequests(d.data||[]);setLoading(false);});
  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id, status) => { await updateRequest(id,{status}); load(); setSelected(s=>s?{...s,status}:null); };
  const handleDelete = async (id) => { if(!confirm('Delete?'))return; await deleteRequest(id); load(); setSelected(null); };

  return (
    <AuthGuard>
      <div className="p-6">
        <div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">Collection Requests</h1><p className="text-gray-500 text-sm">{requests.length} total</p></div>
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>{['Name','Email','Waste Type','Preferred Date','Status','Actions'].map(h=><th key={h} className="text-left px-4 py-3 text-xs uppercase text-gray-600 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requests.length===0 ? <tr><td colSpan={6} className="text-center py-12 text-gray-500">No requests found.</td></tr>
                : requests.map(r=>(
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                    <td className="px-4 py-3 text-gray-600">{r.email}</td>
                    <td className="px-4 py-3 text-gray-600">{r.wasteType}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(r.preferredDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge(r.status)}`}>{r.status}</span></td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={()=>setSelected(r)} className="text-xs text-blue-600 hover:underline">View</button>
                      <button onClick={()=>handleDelete(r._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-4"><h2 className="font-bold text-lg">Request Details</h2><button onClick={()=>setSelected(null)} className="text-gray-400 text-xl">✕</button></div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                {[['Name',selected.name],['Email',selected.email],['Phone',selected.phone],['Waste Type',selected.wasteType],['Quantity',selected.quantity],['Date',new Date(selected.preferredDate).toLocaleDateString()]].map(([k,v])=>(
                  <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs">{k}</p><p className="font-medium text-gray-800">{v}</p></div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-sm mb-4"><p className="text-gray-500 text-xs">Address</p><p className="font-medium">{selected.address}</p></div>
              {selected.notes && <div className="bg-gray-50 rounded-lg p-3 text-sm mb-4"><p className="text-gray-500 text-xs">Notes</p><p>{selected.notes}</p></div>}
              <div><p className="text-sm font-medium text-gray-700 mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map(s=><button key={s} onClick={()=>handleStatus(selected._id,s)} className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition ${selected.status===s?'bg-green-600 text-white border-green-600':'bg-white text-gray-700 border-gray-300 hover:border-green-500'}`}>{s}</button>)}
                </div>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t">
                <button onClick={()=>handleDelete(selected._id)} className="btn-danger">Delete</button>
                <button onClick={()=>setSelected(null)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
