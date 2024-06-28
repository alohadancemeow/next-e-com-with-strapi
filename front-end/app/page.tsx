import Slider from "@/components/slider";
import FeaturedProducts from "@/components/featured";
import Categories from "@/components/category";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div className="home">
      <Slider />
      <div id="featured">
        <FeaturedProducts type="featured" />
      </div>
      <div id="category">
        <Categories />
      </div>
      <div id="trending">
        <FeaturedProducts type="trending" />
      </div>
      <Contact />
    </div>
  );
}
