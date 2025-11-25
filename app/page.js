import Blog from "./component/common/Home/Blog";
import Brand from "./component/common/Home/Brand";
import FeatureProduct from "./component/common/Home/FeatureProduct";
import HeroImage from "./component/common/Home/HeroImage";
import Slider from "./component/common/Home/Slider";
import WhyChoose from "./component/common/Home/WhyChoose";
import TestimonialSection from "./testimonial/page";

export default function Home() {
  return (
    <div className="">
      <HeroImage></HeroImage>
      <FeatureProduct></FeatureProduct>
      <WhyChoose></WhyChoose>
      <Brand></Brand>
      <TestimonialSection></TestimonialSection>
    </div>
  );
}
