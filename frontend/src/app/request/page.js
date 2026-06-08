'use client';
import { useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { createRequest } from '@/lib/api';

const wasteTypes = ['General Waste','Recyclables','Organic Waste','Hazardous Waste','Electronic Waste','Construction Debris','Bulky Items'];

export default function RequestPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', wasteType:'', quantity:'', preferredDate:'', notes:'' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({...f, [k]: v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await createRequest(form);
    if (data.success) {
      setResult({ success: true, id: data.data._id });
      setForm({ name:'', email:'', phone:'', address:'', wasteType:'', quantity:'', preferredDate:'', notes:'' });
    } else {
      setResult({ success: false, error: data.error });
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="bg-green-700 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Submit Collection Request</h1>
        <p className="text-green-200">Fill in the form below to schedule a waste collection</p>
      </div>
      <section className="max-w-2xl mx-auto px-4 py-12">
        {result?.success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-bold text-green-800 mb-1">Request Submitted!</h3>
            <p className="text-green-700 text-sm">Your Request ID: <span className="font-mono font-bold">{result.id}</span></p>
            <p className="text-green-600 text-xs mt-1">Save this ID to track your request status.</p>
          </div>
        )}
        {result?.success === false && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">❌ {result.error}</div>
        )}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input className="input-field" required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your full name" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" className="input-field" required value={form.email} onChange={e=>set('email',e.target.value)} placeholder="your@email.com" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input className="input-field" required value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+94 77 123 4567" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label><input type="date" className="input-field" required value={form.preferredDate} onChange={e=>set('preferredDate',e.target.value)} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Address *</label><input className="input-field" required value={form.address} onChange={e=>set('address',e.target.value)} placeholder="Your full address" /></div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Waste Type *</label>
              <select className="input-field" required value={form.wasteType} onChange={e=>set('wasteType',e.target.value)}>
                <option value="">Select type</option>
                {wasteTypes.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label><input className="input-field" required value={form.quantity} onChange={e=>set('quantity',e.target.value)} placeholder="e.g., 5 bags" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Notes</label><textarea className="input-field" rows={3} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Any special instructions..." /></div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">{loading ? 'Submitting...' : 'Submit Request'}</button>
        </form>
      </section>
      <Footer />
    </>
  );
}
