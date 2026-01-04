import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Business Listing | MMID',
  description: 'Add your business to our directory and reach more customers.',
};

export default function NewListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
