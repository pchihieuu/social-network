import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/custom-slick.css";

const About: React.FC = () => {
  const CustomPrevArrow = (props: any) => (
    <div className="slick-prev" {...props}>
      <FaArrowLeft />
    </div>
  );

  const CustomNextArrow = (props: any) => (
    <div className="slick-next" {...props}>
      <FaArrowRight />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Slider Section */}
      <section className="relative w-full overflow-hidden">
        <Slider {...settings} className="relative w-full">
          <div className="relative w-full h-80 flex items-center justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/425/624/non_2x/internet-entertainment-concept-3d-landscape-orientation-banner-with-copy-space-vector.jpg"
              alt="Banner Slide 1"
              className="absolute inset-0 object-cover w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative w-full h-80 flex items-center justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/008/079/258/non_2x/using-smartphone-for-entertainment-3d-vertical-banner-with-copy-space-free-vector.jpg"
              alt="Banner Slide 2"
              className="absolute inset-0 object-cover w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative w-full h-80 flex items-center justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/425/777/non_2x/falling-gift-boxes-3d-landscape-orientation-banner-with-copy-space-vector.jpg"
              alt="Banner Slide 2"
              className="absolute inset-0 object-cover w-full h-full"
              style={{ objectFit: "cover" }}
            />
            
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </section>

      {/* Main Content */}
      <main>
        <section className="py-16 px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700">
                At TechSavvy, our mission is to empower individuals and businesses with cutting-edge technology solutions that drive innovation and growth. We are committed to delivering high-quality products and exceptional customer service.
              </p>
            </div>

            {/* Center Column */}
            <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our History</h2>
              <p className="text-gray-700">
                Founded in 2020, TechSavvy has rapidly grown to become a leader in the technology industry. Our journey began with a vision to create a platform that bridges the gap between technology and its users, and we have been striving towards that goal ever since.
              </p>
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Meet Our Team</h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {/* Example team members */}
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img className="w-24 h-24 mx-auto rounded-full" src="https://i.pravatar.cc/128" alt="Team Member" />
                    <h3 className="text-xl font-semibold text-gray-900 mt-4">John Doe</h3>
                    <p className="text-gray-600">CEO</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img className="w-24 h-24 mx-auto rounded-full" src="https://i.pravatar.cc/128" alt="Team Member" />
                    <h3 className="text-xl font-semibold text-gray-900 mt-4">Jane Smith</h3>
                    <p className="text-gray-600">CTO</p>
                  </div>
                  {/* Add more team members as needed */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
