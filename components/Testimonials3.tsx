export default function Testimonials3() {
  const testimonials = [
    { name: 'Alice Brown', text: 'Amazing experience!', rating: 5 },
    { name: 'Charlie Davis', text: 'Top notch quality!', rating: 5 },
    { name: 'Eve Wilson', text: 'Will use again!', rating: 5 },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border p-6 rounded-lg">
              <p className="mb-4 italic">&quot;{testimonial.text}&quot;</p>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-yellow-500">{'★'.repeat(testimonial.rating)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
