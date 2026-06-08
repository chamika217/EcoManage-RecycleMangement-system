'use client';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default function HomePage() {
  const [calculator, setCalculator] = useState({
    type: 'plastic',
    weight: 10,
  });

  const calculateImpact = (type, weight) => {
    const factors = {
      plastic: { co2: 1.5, water: 24, energy: 5.7, label: 'Plastics Recycled' },
      paper: { co2: 0.9, water: 26, energy: 4.0, label: 'Paper Recycled' },
      glass: { co2: 0.3, water: 0.9, energy: 1.2, label: 'Glass Recycled' },
      metal: { co2: 6.4, water: 95, energy: 14.0, label: 'Metal Recycled' },
    };
    const f = factors[type] || factors.plastic;
    return {
      co2: (weight * f.co2).toFixed(1),
      water: (weight * f.water).toFixed(1),
      energy: (weight * f.energy).toFixed(1),
    };
  };

  const impact = calculateImpact(calculator.type, Number(calculator.weight) || 0);

  const services = [
    { 
      icon: '🗑️', 
      title: 'Waste Collection', 
      desc: 'Schedule and track waste collection requests easily from your dashboard.',
      color: 'from-emerald-500 to-green-600',
      bgLight: 'bg-emerald-50/50'
    },
    { 
      icon: '♻️', 
      title: 'Recycling Programs', 
      desc: 'Learn proper waste segregation and recycling guidelines for your community.',
      color: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-cyan-50/50'
    },
    { 
      icon: '📅', 
      title: 'Collection Schedules', 
      desc: 'View upcoming collection dates, routes, and timings for your residential area.',
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50/50'
    },
    { 
      icon: '📊', 
      title: 'Live Reports', 
      desc: 'Track real-time collection statistics, community impact, and recycling progress.',
      color: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50/50'
    },
  ];

  const stats = [
    { value: '500+', label: 'Collections Done', color: 'text-emerald-600' },
    { value: '12',   label: 'Active Teams', color: 'text-blue-600' },
    { value: '8',    label: 'Waste Categories', color: 'text-amber-600' },
    { value: '98%',  label: 'Success Rate', color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 text-white py-20 lg:py-28 px-4">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 text-xs px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-wider">
                🌱 Smart City Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Smart Waste & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300">
                  Recycling Management
                </span>
              </h1>
              <p className="text-green-100/90 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium">
                Submit collection requests, track vehicle schedules, and manage recycling operations in real-time — all in one unified platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <Link 
                  href="/request" 
                  className="shadow-lg shadow-green-900/30 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 px-8 rounded-xl hover:from-green-400 hover:to-emerald-500 transition duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Submit Request
                </Link>
                <Link 
                  href="/schedule" 
                  className="border-2 border-white/40 text-white hover:border-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition duration-300"
                >
                  View Schedule
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl transition duration-500 hover:scale-[1.02]">
                <img 
                  src="/images/eco_hero.png" 
                  alt="Eco City Smart Waste Illustration" 
                  className="rounded-2xl max-w-full h-auto object-cover max-h-[420px] shadow-inner"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="relative -mt-10 z-10 px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-gray-100">
              {stats.map((s, i) => (
                <div key={i} className="text-center px-2">
                  <div className={`text-3xl md:text-4xl font-extrabold ${s.color}`}>{s.value}</div>
                  <div className="text-gray-500 font-semibold text-xs md:text-sm mt-1 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Our Services</h2>
              <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
              <p className="text-gray-500 text-lg mt-4">
                Comprehensive, tech-enabled waste management systems for cleaner, greener communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${s.color} text-white shadow-md mb-4`}>
                      {s.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <span className="text-xs font-semibold text-green-600 hover:text-green-700 inline-flex items-center gap-1 cursor-pointer">
                      Learn More <span>→</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Eco Calculator & How It Works */}
        <section className="py-20 px-4 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: How it works with illustration */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                ♻️ Sorting Matters
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">How to Segregate Your Waste</h2>
              <p className="text-gray-600 leading-relaxed">
                Segregating waste at the source is the key to efficient recycling. By sorting items into Paper, Plastics, Glass, and Metal, you help reduce the load on landfills and increase resource recovery.
              </p>
              
              <div className="flex justify-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <img 
                  src="/images/recycling_bins.png" 
                  alt="Recycling Bins Illustration" 
                  className="max-h-[220px] object-contain rounded-xl"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <Link href="/categories" className="text-sm font-bold text-green-600 hover:text-green-700 hover:underline inline-flex items-center gap-1">
                  View Detailed Recycling Guidelines <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right: Dynamic Calculator Widget */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-3xl p-6 md:p-8 border border-green-100/60 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Eco-Impact Calculator</h3>
                <p className="text-sm text-gray-500 mb-6">Estimate the resources you save by recycling instead of throwing away.</p>
                
                <div className="space-y-4">
                  {/* Select Waste Type */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Select Waste Material</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { key: 'plastic', label: 'Plastics', icon: '🥤' },
                        { key: 'paper', label: 'Paper', icon: '📦' },
                        { key: 'glass', label: 'Glass', icon: '🍾' },
                        { key: 'metal', label: 'Metal', icon: '🥫' }
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setCalculator(prev => ({ ...prev, type: item.key }))}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                            calculator.type === item.key
                              ? 'bg-green-600 border-green-600 text-white shadow-md'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-green-300'
                          }`}
                        >
                          <span className="text-xl mb-1">{item.icon}</span>
                          <span className="text-xs font-bold">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Weight */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Weight (in Kilograms)</label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        type="number"
                        min="1"
                        value={calculator.weight}
                        onChange={(e) => setCalculator(prev => ({ ...prev, weight: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                        placeholder="Enter weight..."
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-bold text-sm">kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm mt-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your Estimated Environmental Saving</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-green-50 rounded-xl">
                        <div className="text-lg md:text-xl font-black text-green-700">{impact.co2} kg</div>
                        <div className="text-[10px] font-bold text-green-600 uppercase mt-0.5">CO₂ Offset</div>
                      </div>
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <div className="text-lg md:text-xl font-black text-blue-700">{impact.water} L</div>
                        <div className="text-[10px] font-bold text-blue-600 uppercase mt-0.5">Water Saved</div>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-xl">
                        <div className="text-lg md:text-xl font-black text-amber-700">{impact.energy} kWh</div>
                        <div className="text-[10px] font-bold text-amber-600 uppercase mt-0.5">Energy Saved</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Call To Action */}
        <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 text-white text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ready to keep your community clean?</h2>
            <p className="text-green-100 text-lg max-w-xl mx-auto leading-relaxed">
              Submit your waste collection request today and see the local impact you make. Track schedules and stay informed.
            </p>
            <div className="pt-4">
              <Link 
                href="/request" 
                className="shadow-xl shadow-green-950/40 bg-white text-green-800 hover:text-green-900 font-extrabold py-4 px-10 rounded-xl hover:bg-green-50 transition duration-300 transform hover:-translate-y-0.5 active:translate-y-0 inline-block text-lg"
              >
                Submit Collection Request
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
