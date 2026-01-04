import { BusinessListing } from './ListingCard';

interface ListingSchemaProps {
  listing: BusinessListing & {
    longDescription?: string;
    hours?: Record<string, string>;
    services?: string[];
  };
}

export default function ListingSchema({ listing }: ListingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://mmid.co.za/listings/${listing.id}`,
    name: listing.name,
    description: listing.description,
    image: listing.image,
    url: listing.website ? `https://${listing.website}` : undefined,
    telephone: listing.phone,
    email: listing.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address.split(',')[0],
      addressLocality: 'Kimberley',
      addressRegion: 'Northern Cape',
      postalCode: '8301',
      addressCountry: 'ZA',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: listing.rating,
      reviewCount: listing.reviews,
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    ...(listing.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: listing.coordinates.lat,
        longitude: listing.coordinates.lng,
      },
    }),
    ...(listing.hours && {
      openingHoursSpecification: Object.entries(listing.hours).map(([day, hours]) => {
        if (hours === 'Closed') {
          return {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
          };
        }
        const [open, close] = hours.split(' - ');
        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
          opens: open,
          closes: close,
        };
      }),
    }),
    sameAs: [
      `https://mmid.co.za/listings/${listing.id}`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
