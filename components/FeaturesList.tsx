export default function FeaturesList() {
  const features = [
    'Fast and optimized',
    'SEO friendly',
    'Responsive design',
    'Modern UI components',
  ];

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-4">Features</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
