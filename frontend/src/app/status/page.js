'use client';
import { useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { getRequestById } from '@/lib/api';

const statusInfo = {
  pending:     { color:'text-yellow-600', bg:'bg-yellow-50',  icon:'⏳', label:'Pending Review' },
  approved:    { color:'text-blue-600',   bg:'bg-blue-50',    icon:'✅', label:'Approved' },
  'in-progress':{ color:'text-purple-600',bg:'bg-purple-50',  icon:'🚛', label:'In Progress' },
  completed:   { color:'text-green-600',  bg:'bg-green-50',   icon:'🎉', label:'Completed' },
  cancelled:   { color:'text-red-600',    bg:'bg-red-50',     icon:'❌', label:'Cancelled' },
};

export default function StatusPage() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!id.trim()) return;
    setLoading(true); setError(''); setRequest(null);
    const data = await getRequestById(id.trim());
    if (data.success) setRequest(data.data);
    else setError('Request not found. Please check your ID.');
    setLoading(false);
  };

  const info = request ? (statusInfo[request.status] || statusInfo.pending) : null;

  return (
    <>
      <Navbar />
      <div className="bg-green-700 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Track Request Status</h1>
        <p className="text-green-200">Enter your request ID to check the current status</p>
      </div>
      <section className="max-w-2xl mx-auto px-4 py-12">
        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Request ID</label>
          <div className="flex gap-3">
            <input className="input-field flex-1" value={id} onChange={e=>setId(e.target.value)} placeholder="Paste your request ID here..." />
            <button type="submit" disabled={loading} className="btn-primary px-6">{loading ? '...' : 'Track'}</button>
          </div>
        </form>
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">❌ {error}</div>}
        {request && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className={`flex items-center gap-3 p-4 rounded-xl ${info.bg} mb-6`}>
              <span className="text-3xl">{info.icon}</span>
              <div>
                <p className="text-xs text-gray-500">Current Status</p>
                <p className={`font-bold text-lg ${info.color}`}>{info.label}</p>
              </div>
            </div>
            <h3 className="font-bold text-gray-800 mb-4">Request Details</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[['Name',request.name],['Email',request.email],['Phone',request.phone],['Waste Type',request.wasteType],['Quantity',request.quantity],['Preferred Date',new Date(request.preferredDate).toLocaleDateString()],['Submitted',new Date(request.createdAt).toLocaleDateString()]].map(([k,v])=>(
                <div key={k} className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs">{k}</p><p className="font-medium text-gray-800">{v}</p></div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mt-3 text-sm"><p className="text-gray-500 text-xs">Address</p><p className="font-medium text-gray-800">{request.address}</p></div>
            {request.notes && <div className="bg-gray-50 rounded-lg p-3 mt-3 text-sm"><p className="text-gray-500 text-xs">Notes</p><p className="text-gray-800">{request.notes}</p></div>}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
