import Banner from "@/component/Banner";
import FeaturedProperties from "@/component/FeaturedProperties";
import RecentlyAdded from "@/component/RecentlyAdded";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProperties />
      <RecentlyAdded />
    </div>
  );
}
