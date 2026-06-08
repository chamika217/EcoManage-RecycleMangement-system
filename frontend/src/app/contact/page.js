'use client';
import { useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { createContact } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    const data = await createContact(form);
    setResult({ success: data.success, error: data.error });
    if (data.success) setForm({ name:'', email:'', subject:'', message:'' });
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="bg-green-700 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-green-200">Have questions? We'd love to hear from you.</p>
      </div>
      <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Get In Touch</h2>
          {[{ icon:'📧', label:'Email', value:'info@ecomanage.lk' },{ icon:'📞', label:'Phone', value:'+94 11 234 5678' },{ icon:'📍', label:'Address', value:'No. 1, Eco Street, Colombo 03' },{ icon:'🕐', label:'Hours', value:'Mon–Sat: 8:00 AM – 5:00 PM' }].map((item,i)=>(
            <div key={i} className="flex gap-4 mb-5">
              <div className="bg-green-100 rounded-lg p-3 text-xl h-fit">{item.icon}</div>
              <div><p className="text-sm text-gray-500">{item.label}</p><p className="font-medium text-gray-800">{item.value}</p></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {result?.success && <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 text-center text-green-700 font-medium text-sm">✅ Message sent! We'll get back to you soon.</div>}
          {result?.success === false && <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 text-red-700 text-sm">❌ {result.error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input className="input-field" required value={form.name} onChange={e=>set('name',e.target.value)} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" className="input-field" required value={form.email} onChange={e=>set('email',e.target.value)} /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label><input className="input-field" required value={form.subject} onChange={e=>set('subject',e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label><textarea className="input-field" rows={4} required value={form.message} onChange={e=>set('message',e.target.value)} /></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Sending...' : 'Send Message'}</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
