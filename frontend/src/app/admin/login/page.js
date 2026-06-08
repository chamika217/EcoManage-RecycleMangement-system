'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    const data = await login(form);
    if (data.success) {
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.admin));
      router.push('/admin/dashboard');
    } else {
      setError(data.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">♻️</div>
          <h1 className="text-2xl font-bold text-gray-800">EcoManage Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to the admin panel</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-red-700 text-sm">❌ {error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required className="input-field" placeholder="admin@waste.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required className="input-field" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <div className="mt-4 text-center"><a href="/" className="text-sm text-green-600 hover:underline">← Back to Website</a></div>
        <div className="mt-4 bg-green-50 rounded-lg p-3 text-xs text-green-700 text-center">
          First time? Run <span className="font-mono font-bold">http://localhost:5000/api/auth/seed</span><br/>
          Default: admin@waste.com / Admin@123
        </div>
      </div>
    </div>
  );
}
