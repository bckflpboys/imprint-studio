import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import BookingSection from "@/components/BookingSection";
import FloatingBooking from "@/components/FloatingBooking";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <ServicesSection />
      <BookingSection />
      <GallerySection />

      <FloatingBooking />
    </main>
  );
}
