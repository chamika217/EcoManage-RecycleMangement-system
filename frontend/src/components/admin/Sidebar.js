'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard',           icon: '📊', label: 'Dashboard' },
  { href: '/admin/dashboard/requests',  icon: '📋', label: 'Collection Requests' },
  { href: '/admin/dashboard/categories',icon: '♻️', label: 'Recycling Categories' },
  { href: '/admin/dashboard/teams',     icon: '👥', label: 'Collection Teams' },
  { href: '/admin/dashboard/schedules', icon: '📅', label: 'Schedules' },
  { href: '/admin/dashboard/reports',   icon: '📈', label: 'Reports' },
  { href: '/admin/dashboard/messages',  icon: '✉️', label: 'Messages' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-green-900 text-white min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-green-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">♻️</span>
          <div>
            <div className="font-bold text-lg leading-none">EcoManage</div>
            <div className="text-green-400 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
                ? 'bg-green-700 text-white'
                : 'text-green-300 hover:bg-green-800 hover:text-white'
            }`}>
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-green-800 space-y-1">
        <Link href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-green-300 hover:bg-green-800 hover:text-white transition">
          <span>🌐</span> View Website
        </Link>
        <button onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-green-300 hover:bg-green-800 hover:text-white transition w-full">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
