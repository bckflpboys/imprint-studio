import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Listings | MMID - Multi Media Interactive Directory',
  description: 'Discover local businesses, services, and organizations in Kimberley. Browse verified listings with ratings, reviews, and contact information.',
  keywords: ['business listings', 'Kimberley businesses', 'local services', 'directory', 'business directory'],
  openGraph: {
    title: 'Business Listings | MMID',
    description: 'Discover local businesses and services in Kimberley',
    type: 'website',
    locale: 'en_ZA',
  },
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
