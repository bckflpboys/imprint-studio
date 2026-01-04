export default function WithWithout() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">With vs Without</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-600">Without Our Product</h3>
            <ul className="space-y-2">
              <li>❌ Slow processes</li>
              <li>❌ High costs</li>
              <li>❌ Poor results</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-600">With Our Product</h3>
            <ul className="space-y-2">
              <li>✅ Fast and efficient</li>
              <li>✅ Cost-effective</li>
              <li>✅ Amazing results</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
