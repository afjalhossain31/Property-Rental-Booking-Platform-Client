import Banner from "@/component/Banner";
import FeaturedProperties from "@/component/FeaturedProperties";
import TopLocations from "@/component/TopLocations";
import CustomerReviews from "@/component/CustomerReviews"; // নিশ্চিত করুন ফাইলটি এই ঠিকানাতেই আছে
import RentalStatistics from "@/component/RentalStatistics";
import WhyChooseUs from "@/component/WhyChooseUs";
import RecentlyAdded from "@/component/RecentlyAdded";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedProperties />
      <TopLocations />
      <CustomerReviews /> 
      <RentalStatistics />
      <WhyChooseUs />
      <RecentlyAdded />
    </main>
  );
}