export default function Testimonials() {
  const testimonials = [
    { name: 'John Doe', text: 'Great product!', rating: 5 },
    { name: 'Jane Smith', text: 'Highly recommend!', rating: 5 },
    { name: 'Bob Johnson', text: 'Excellent service!', rating: 4 },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <p className="mb-4">&quot;{testimonial.text}&quot;</p>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-yellow-500">{'★'.repeat(testimonial.rating)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
