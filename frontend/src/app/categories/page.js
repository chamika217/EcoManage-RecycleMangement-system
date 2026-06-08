'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { getCategories } from '@/lib/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(d => { setCategories(d.data || []); setLoading(false); });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-green-700 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Recycling Categories</h1>
        <p className="text-green-200 max-w-xl mx-auto">Learn about proper waste segregation and recycling guidelines</p>
      </div>
      <section className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border">
            <div className="text-5xl mb-4">♻️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories yet</h3>
            <p className="text-gray-500">Categories will appear here once added by admin.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(cat => (
              <div key={cat._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="p-6" style={{ borderTop: `4px solid ${cat.color || '#22c55e'}` }}>
                  <div className="text-4xl mb-3">{cat.icon || '♻️'}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{cat.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{cat.description}</p>
                  {cat.acceptedItems?.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-green-700 uppercase mb-1">✅ Accepted</h4>
                      <ul className="text-sm text-gray-600 space-y-0.5">{cat.acceptedItems.map((item, i) => <li key={i}>• {item}</li>)}</ul>
                    </div>
                  )}
                  {cat.notAcceptedItems?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-red-600 uppercase mb-1">❌ Not Accepted</h4>
                      <ul className="text-sm text-gray-600 space-y-0.5">{cat.notAcceptedItems.map((item, i) => <li key={i}>• {item}</li>)}</ul>
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
