import { Metadata } from 'next';

// Mock data for metadata generation
const mockListings = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    category: 'Technology',
    description: 'Leading IT consulting and software development company providing innovative solutions for businesses of all sizes.',
    address: '123 Bultfontein Road, Kimberley, 8301',
    phone: '+27 (53) 123-4567',
    email: 'info@techsolutions.co.za',
    website: 'www.techsolutions.co.za',
    rating: 4.8,
    reviews: 127,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
  },
  {
    id: '2',
    name: 'Green Landscaping Co.',
    category: 'Home & Garden',
    description: 'Professional landscaping services offering garden design, maintenance, and outdoor living solutions.',
    address: '456 Memorial Road, Kimberley, 8301',
    phone: '+27 (53) 234-5678',
    email: 'contact@greenlandscaping.co.za',
    website: 'www.greenlandscaping.co.za',
    rating: 4.6,
    reviews: 89,
    image: '/featured-listing/Local-Churches-372x240.jpg',
  },
  {
    id: '3',
    name: 'MediCare Health Center',
    category: 'Healthcare',
    description: 'Comprehensive healthcare facility providing medical services, urgent care, and specialized treatments.',
    address: '789 Long Street, Kimberley, 8301',
    phone: '+27 (53) 345-6789',
    email: 'info@medicarehealth.co.za',
    website: 'www.medicarehealth.co.za',
    rating: 4.9,
    reviews: 234,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
  },
  {
    id: '4',
    name: 'Quick Taxi Services',
    category: 'Transportation',
    description: 'Reliable taxi and transportation services available 24/7 for local and long-distance travel.',
    address: '321 Transvaal Road, Kimberley, 8301',
    phone: '+27 (53) 456-7890',
    email: 'book@quicktaxi.co.za',
    website: 'www.quicktaxi.co.za',
    rating: 4.4,
    reviews: 156,
    image: '/featured-listing/Local-Taxi-Ranks-372x240.jpg',
  },
  {
    id: '5',
    name: 'Divine Worship Church',
    category: 'Religious Organizations',
    description: 'Welcoming community church offering spiritual guidance, worship services, and community programs.',
    address: '654 Chapel Street, Kimberley, 8301',
    phone: '+27 (53) 567-8901',
    email: 'info@divineworship.co.za',
    website: 'www.divineworship.co.za',
    rating: 4.7,
    reviews: 92,
    image: '/featured-listing/Local-Churches-372x240.jpg',
  },
  {
    id: '6',
    name: 'Gourmet Restaurant',
    category: 'Food & Dining',
    description: 'Fine dining restaurant offering exquisite cuisine in an elegant atmosphere with exceptional service.',
    address: '987 Du Toitspan Road, Kimberley, 8301',
    phone: '+27 (53) 678-9012',
    email: 'reservations@gourmetrestaurant.co.za',
    website: 'www.gourmetrestaurant.co.za',
    rating: 4.9,
    reviews: 178,
    image: '/featured-listing/Healthcare-Facilities-372x240.jpg',
  },
];

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = mockListings.find(l => l.id === id);

  if (!listing) {
    return {
      title: 'Listing Not Found | MMID',
      description: 'The listing you are looking for does not exist.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mmid.co.za';
  const listingUrl = `${baseUrl}/listings/${id}`;

  return {
    title: `${listing.name} | ${listing.category} in Kimberley | MMID`,
    description: listing.description,
    keywords: [
      listing.name,
      listing.category,
      'Kimberley',
      'business',
      'services',
      'directory',
      ...listing.description.split(' ').slice(0, 5),
    ],
    authors: [{ name: 'MMID' }],
    openGraph: {
      title: `${listing.name} - ${listing.category}`,
      description: listing.description,
      url: listingUrl,
      type: 'website',
      images: [
        {
          url: listing.image,
          width: 800,
          height: 600,
          alt: listing.name,
        },
      ],
      locale: 'en_ZA',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${listing.name} | MMID`,
      description: listing.description,
      images: [listing.image],
    },
    alternates: {
      canonical: listingUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export async function generateStaticParams() {
  return mockListings.map((listing) => ({
    id: listing.id,
  }));
}

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
