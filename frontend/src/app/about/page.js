import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default function AboutPage() {
  const goals = [
    { icon: '🌱', title: 'Environmental Sustainability', desc: 'Promoting responsible waste disposal and recycling to protect our environment.' },
    { icon: '🏘️', title: 'Community Service',           desc: 'Serving communities with efficient waste management solutions.' },
    { icon: '📱', title: 'Digital Efficiency',           desc: 'Leveraging technology for smarter waste operations.' },
    { icon: '♻️', title: 'Recycling Culture',            desc: 'Encouraging proper waste segregation and recycling habits.' },
  ];
  return (
    <>
      <Navbar />
      <div className="bg-green-700 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">About EcoManage</h1>
        <p className="text-green-200 max-w-xl mx-auto">Building a cleaner, greener future through smart waste management</p>
      </div>
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What is EcoManage?</h2>
            <p className="text-gray-600 mb-4">EcoManage is a full-stack waste collection and recycling management system built for municipalities and waste management organizations. Our platform enables efficient management of waste collection requests, schedules, teams, and recycling operations.</p>
            <p className="text-gray-600">Administrators can manage everything from a centralized admin panel while the public can submit requests, view schedules, and track their collection status.</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">♻️</div>
            <h3 className="text-xl font-bold text-green-800">Our Mission</h3>
            <p className="text-green-700 mt-2">To improve waste management efficiency and promote sustainable recycling practices for a cleaner tomorrow.</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Our Goals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((g, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-3">{g.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{g.title}</h3>
              <p className="text-gray-500 text-sm">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
