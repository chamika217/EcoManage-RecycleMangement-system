'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { getReports } from '@/lib/api';

export default function ReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getReports().then(d => { setData(d.data); setLoading(false); }); }, []);

  const stats = data?.stats;
  const cards = [
    { label:'Total Requests', value:stats?.totalRequests||0, icon:'📋', color:'bg-blue-50 border-blue-200' },
    { label:'Completed',      value:stats?.completedRequests||0, icon:'✅', color:'bg-green-50 border-green-200' },
    { label:'Pending',        value:stats?.pendingRequests||0, icon:'⏳', color:'bg-yellow-50 border-yellow-200' },
    { label:'Active Teams',   value:stats?.totalTeams||0, icon:'👥', color:'bg-purple-50 border-purple-200' },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-green-700 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Reports & Statistics</h1>
        <p className="text-green-200">Overview of waste collection and recycling operations</p>
      </div>
      <section className="max-w-5xl mx-auto px-4 py-12">
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {cards.map((s,i)=>(
                <div key={i} className={`rounded-xl border p-5 text-center ${s.color}`}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-bold text-gray-800">{s.value}</div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">📋 Recent Requests</h3>
                {!data?.recentRequests?.length ? <p className="text-gray-500 text-sm">No requests yet.</p> : (
                  <div className="space-y-3">{data.recentRequests.map(r=>(
                    <div key={r._id} className="flex items-center justify-between text-sm">
                      <div><p className="font-medium text-gray-800">{r.name}</p><p className="text-gray-500 text-xs">{r.wasteType}</p></div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status==='completed'?'bg-green-100 text-green-700':r.status==='pending'?'bg-yellow-100 text-yellow-700':'bg-blue-100 text-blue-700'}`}>{r.status}</span>
                    </div>
                  ))}</div>
                )}
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4">📅 Upcoming Schedules</h3>
                {!data?.upcomingSchedules?.length ? <p className="text-gray-500 text-sm">No upcoming schedules.</p> : (
                  <div className="space-y-3">{data.upcomingSchedules.map(s=>(
                    <div key={s._id} className="text-sm"><p className="font-medium text-gray-800">{s.title}</p><p className="text-gray-500">{s.area} — {new Date(s.collectionDate).toLocaleDateString()}</p></div>
                  ))}</div>
                )}
              </div>
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}
