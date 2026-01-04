export default function TestimonialsAvatars() {
  const testimonials = [
    { name: 'Sarah Lee', text: 'Fantastic!', avatar: '👩' },
    { name: 'Mike Chen', text: 'Love it!', avatar: '👨' },
    { name: 'Lisa Park', text: 'Best decision!', avatar: '👩' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-5xl mb-4">{testimonial.avatar}</div>
              <p className="mb-4">&quot;{testimonial.text}&quot;</p>
              <p className="font-bold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
