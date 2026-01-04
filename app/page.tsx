import HeroSection from "@/components/HeroSection";
import BusinessCategories from "@/components/BusinessCategories";
import BusinessAreas from "@/components/BusinessAreas";
import GrowOnlineBanner from "@/components/GrowOnlineBanner";
import ClaimPromoteConvert from "@/components/ClaimPromoteConvert";
import FeaturedListingsByCategory from "@/components/FeaturedListingsByCategory";
import ExclusiveListingsSection from "@/components/ExclusiveListingsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <BusinessCategories />
      <BusinessAreas />
      <GrowOnlineBanner />
      <ClaimPromoteConvert />
      <ExclusiveListingsSection />
      <FeaturedListingsByCategory />
      <BlogSection />
      {/* <Footer /> */}
    </main>
  );
}
