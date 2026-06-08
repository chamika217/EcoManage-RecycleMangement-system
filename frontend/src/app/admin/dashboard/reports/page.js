'use client';
import { useEffect, useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import { getReports } from '@/lib/api';

export default function AdminReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ getReports().then(d=>{setData(d.data);setLoading(false);}); },[]);
  const s = data?.stats;
  const cards = [
    { label:'Total Requests',  value:s?.totalRequests,  icon:'📋', sub:`${s?.completedRequests||0} completed` },
    { label:'Pending',         value:s?.pendingRequests, icon:'⏳', sub:'Awaiting approval' },
    { label:'Approved',        value:s?.approvedRequests,icon:'✅', sub:'Ready for collection' },
    { label:'Schedules',       value:s?.totalSchedules,  icon:'📅', sub:`${s?.completedSchedules||0} completed` },
    { label:'Active Teams',    value:s?.totalTeams,      icon:'👥', sub:'Collection teams' },
    { label:'Categories',      value:s?.totalCategories, icon:'♻️', sub:'Recycling categories' },
    { label:'Messages',        value:s?.totalMessages,   icon:'✉️', sub:'From public' },
  ];
  const badge = s=>({pending:'bg-yellow-100 text-yellow-800',approved:'bg-blue-100 text-blue-800',completed:'bg-green-100 text-green-800',cancelled:'bg-red-100 text-red-800','in-progress':'bg-purple-100 text-purple-800'}[s]||'bg-gray-100 text-gray-800');

  return (
    <AuthGuard>
      <div className="p-6">
        <div className="mb-6"><h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1><p className="text-gray-500 text-sm">System-wide statistics</p></div>
        {loading ? <div className="text-center py-20 text-gray-500">Loading...</div> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {cards.map((c,i)=>(
                <div key={i} className="card p-5">
                  <div className="text-xl mb-2">{c.icon}</div>
                  <div className="text-2xl font-bold text-gray-800">{c.value??'–'}</div>
                  <div className="text-sm font-medium text-gray-700">{c.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{c.sub}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4">📋 Recent Requests</h3>
                {!data?.recentRequests?.length ? <p className="text-gray-500 text-sm">No data.</p> : (
                  <div className="space-y-2">{data.recentRequests.map(r=>(
                    <div key={r._id} className="flex justify-between items-center py-2 border-b last:border-0 text-sm">
                      <div><p className="font-medium text-gray-800">{r.name}</p><p className="text-gray-500 text-xs">{r.wasteType}</p></div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${badge(r.status)}`}>{r.status}</span>
                    </div>
                  ))}</div>
                )}
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4">📅 Upcoming Schedules</h3>
                {!data?.upcomingSchedules?.length ? <p className="text-gray-500 text-sm">No upcoming.</p> : (
                  <div className="space-y-2">{data.upcomingSchedules.map(s=>(
                    <div key={s._id} className="py-2 border-b last:border-0 text-sm">
                      <p className="font-medium text-gray-800">{s.title}</p>
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
