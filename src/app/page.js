import Banner from "@/component/Banner";
import WhyChooseUs from "@/component/WhyChooseUs";
import TopLocations from "@/component/TopLocations";
import FeaturedProperties from "@/component/FeaturedProperties";
import RentalStatistics from "@/component/RentalStatistics";
import RecentlyAdded from "@/component/RecentlyAdded";
import CustomerReviews from "@/component/CustomerReviews";

export default function Home() {
  return (
    <div>
      <Banner />
     
      <TopLocations />
      <FeaturedProperties />
      <RentalStatistics />
      <RecentlyAdded />
       <WhyChooseUs />
    </div>
  );
}
