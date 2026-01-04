export default function Pricing() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['Basic', 'Pro', 'Enterprise'].map((plan) => (
            <div key={plan} className="border rounded-lg p-6 text-center hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-4">{plan}</h3>
              <p className="text-3xl font-bold mb-6">$99</p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
