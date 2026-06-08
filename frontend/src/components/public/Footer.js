import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">♻️</span>
            <span className="font-bold text-xl">EcoManage</span>
          </div>
          <p className="text-green-300 text-sm">Efficient waste collection and recycling management for a cleaner tomorrow.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-green-200">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-green-300">
            <Link href="/request"    className="hover:text-white">Submit Request</Link>
            <Link href="/schedule"   className="hover:text-white">View Schedule</Link>
            <Link href="/categories" className="hover:text-white">Recycling Info</Link>
            <Link href="/status"     className="hover:text-white">Track Status</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-green-200">Contact</h4>
          <p className="text-sm text-green-300">📧 info@ecomanage.lk</p>
          <p className="text-sm text-green-300 mt-1">📞 +94 11 234 5678</p>
          <p className="text-sm text-green-300 mt-1">📍 Colombo, Sri Lanka</p>
        </div>
      </div>
      <div className="border-t border-green-800 py-4 text-center text-sm text-green-400">
        © 2026 EcoManage. All rights reserved.
      </div>
    </footer>
  );
}
