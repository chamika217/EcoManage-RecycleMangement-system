'use client';
import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import { getMessages, updateMessage, deleteMessage } from '@/lib/api';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => getMessages().then(d=>{setMessages(d.data||[]);setLoading(false);});
  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => { if(!confirm('Delete?'))return; await deleteMessage(id); load(); setSelected(null); };
  const markRead = async (id) => { await updateMessage(id,{isRead:true}); load(); };

  return (
    <AuthGuard>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
          <p className="text-gray-500 text-sm">{messages.length} total · {messages.filter(m=>!m.isRead).length} unread</p>
        </div>
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>{['','Name','Email','Subject','Date','Actions'].map((h,i)=><th key={i} className="text-left px-4 py-3 text-xs uppercase text-gray-600 font-medium">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-50">
                {messages.length===0 ? <tr><td colSpan={6} className="text-center py-12 text-gray-500">No messages yet.</td></tr>
                : messages.map(m=>(
                  <tr key={m._id} className={`hover:bg-gray-50 ${!m.isRead?'bg-green-50/40':''}`}>
                    <td className="px-4 py-3">{!m.isRead&&<span className="w-2 h-2 bg-green-500 rounded-full inline-block"/>}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{m.name}</td>
                    <td className="px-4 py-3 text-gray-600">{m.email}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">{m.subject}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={()=>{setSelected(m);if(!m.isRead)markRead(m._id);}} className="text-xs text-blue-600 hover:underline">View</button>
                      <button onClick={()=>handleDelete(m._id)} className="text-xs text-red-500 hover:underline">Delete</button>
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
              <div className="flex items-center justify-between mb-4"><h2 className="font-bold text-lg">Message Details</h2><button onClick={()=>setSelected(null)} className="text-gray-400 text-xl">✕</button></div>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs">From</p><p className="font-medium">{selected.name}</p></div>
                  <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs">Email</p><p className="font-medium">{selected.email}</p></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs">Subject</p><p className="font-medium">{selected.subject}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Message</p><p className="whitespace-pre-wrap">{selected.message}</p></div>
                <p className="text-gray-400 text-xs">Received: {new Date(selected.createdAt).toLocaleString()}</p>
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
