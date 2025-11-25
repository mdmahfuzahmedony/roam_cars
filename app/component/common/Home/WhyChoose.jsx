import { LuWallet, LuShieldCheck, LuTag, LuCar } from "react-icons/lu";
const features = [
  {
    icon: LuWallet,
    title: "Trusted Car Dealership",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    icon: LuShieldCheck,
    title: "Trusted Car Dealership",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    icon: LuTag,
    title: "Transparent Pricing",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    icon: LuCar,
    title: "Expert Car Service",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-base-500 max py-5 md:py-24">
      <div className="container mx-auto px-4 max-w-[1450px]">
        {/* Main Title of the Section */}
        <h2 className="text-2xl md:text-5xl font-bold text-white mb-12 md:mb-16 text-center md:text-left">
          Why Choose Us?
        </h2>

        {/* Grid for Feature Items */}
        <div className="grid grid-cols-1 rounded-2xl sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            // Each Feature Item
            <div
              key={index}
              className="flex bg-base-200 rounded-2xl flex-col items-center text-center p-4"
            >
              {/* Icon */}
              <div className="text-blue-600 mb-6">
                {/* Dynamically rendering the icon component */}
                <feature.icon className="w-16 h-16 md:w-20 md:h-20" />
              </div>
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-200 mb-3">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-gray-500 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
