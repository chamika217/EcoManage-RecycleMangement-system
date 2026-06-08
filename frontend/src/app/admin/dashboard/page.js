'use client';
import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import { getReports } from '@/lib/api';

const badge = s => ({ pending:'bg-yellow-100 text-yellow-800', approved:'bg-blue-100 text-blue-800', completed:'bg-green-100 text-green-800', cancelled:'bg-red-100 text-red-800', 'in-progress':'bg-purple-100 text-purple-800' }[s]||'bg-gray-100 text-gray-800');

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('admin_user');
    if (u) setAdmin(JSON.parse(u));
    getReports().then(d => { setData(d.data); setLoading(false); });
  }, []);

  const s = data?.stats;
  const cards = [
    { label:'Total Requests', value:s?.totalRequests??'–', icon:'📋', color:'bg-blue-50 border-blue-200 text-blue-700' },
    { label:'Pending',        value:s?.pendingRequests??'–', icon:'⏳', color:'bg-yellow-50 border-yellow-200 text-yellow-700' },
    { label:'Approved',       value:s?.approvedRequests??'–', icon:'✅', color:'bg-green-50 border-green-200 text-green-700' },
    { label:'Completed',      value:s?.completedRequests??'–', icon:'🎉', color:'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { label:'Schedules',      value:s?.totalSchedules??'–', icon:'📅', color:'bg-purple-50 border-purple-200 text-purple-700' },
    { label:'Teams',          value:s?.totalTeams??'–', icon:'👥', color:'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { label:'Categories',     value:s?.totalCategories??'–', icon:'♻️', color:'bg-teal-50 border-teal-200 text-teal-700' },
    { label:'Messages',       value:s?.totalMessages??'–', icon:'✉️', color:'bg-pink-50 border-pink-200 text-pink-700' },
  ];

  return (
    <AuthGuard>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back{admin?`, ${admin.username}`:''}!</p>
        </div>
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {cards.map((c,i)=>(
                <div key={i} className={`rounded-xl border p-4 ${c.color}`}>
                  <div className="text-xl mb-2">{c.icon}</div>
                  <div className="text-2xl font-bold">{c.value}</div>
                  <div className="text-xs font-medium mt-1 opacity-80">{c.label}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4">📋 Recent Requests</h3>
                {!data?.recentRequests?.length ? <p className="text-gray-500 text-sm">No requests yet.</p> : (
                  <div className="space-y-3">{data.recentRequests.map(r=>(
                    <div key={r._id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div><p className="font-medium text-sm text-gray-800">{r.name}</p><p className="text-gray-500 text-xs">{r.wasteType}</p></div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${badge(r.status)}`}>{r.status}</span>
                    </div>
                  ))}</div>
                )}
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4">📅 Upcoming Schedules</h3>
                {!data?.upcomingSchedules?.length ? <p className="text-gray-500 text-sm">No upcoming schedules.</p> : (
                  <div className="space-y-3">{data.upcomingSchedules.map(s=>(
                    <div key={s._id} className="py-2 border-b last:border-0">
                      <p className="font-medium text-sm text-gray-800">{s.title}</p>
                      <p className="text-gray-500 text-xs">📍 {s.area} · {new Date(s.collectionDate).toLocaleDateString()} · {s.collectionTime}</p>
                    </div>
                  ))}</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AuthGuard>
  );
}
