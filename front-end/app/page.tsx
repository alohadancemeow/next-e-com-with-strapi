import Slider from "@/components/slider";
import FeaturedProducts from "@/components/featured";
import Categories from "@/components/category";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts type="featured" />
      <Categories />
      <FeaturedProducts type="trending" />
      <Contact />
    </div>
  );
}
