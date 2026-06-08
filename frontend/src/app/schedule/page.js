'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { getSchedules } from '@/lib/api';

const statusColor = { scheduled:'bg-blue-100 text-blue-700', 'in-progress':'bg-purple-100 text-purple-700', completed:'bg-green-100 text-green-700', cancelled:'bg-red-100 text-red-700' };

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getSchedules().then(d => { setSchedules(d.data || []); setLoading(false); }); }, []);

  return (
    <>
      <Navbar />
      <div className="bg-green-700 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Collection Schedule</h1>
        <p className="text-green-200">View upcoming waste collection dates for your area</p>
      </div>
      <section className="max-w-4xl mx-auto px-4 py-12">
        {loading ? <div className="text-center py-20 text-gray-500">Loading schedules...</div>
        : schedules.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-700">No schedules available</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {schedules.map(s => (
              <div key={s._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center min-w-[80px]">
                  <div className="text-2xl font-bold text-green-700">{new Date(s.collectionDate).getDate()}</div>
                  <div className="text-xs text-green-600">{new Date(s.collectionDate).toLocaleDateString('en',{month:'short',year:'numeric'})}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">{s.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[s.status]||'bg-gray-100 text-gray-600'}`}>{s.status}</span>
                  </div>
                  <p className="text-gray-600 text-sm">📍 {s.area}</p>
                  <p className="text-gray-500 text-sm">⏰ {s.collectionTime}</p>
                  {s.team && <p className="text-gray-500 text-sm">👥 {s.team.teamName}</p>}
                  {s.wasteTypes?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {s.wasteTypes.map((t, i) => <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
