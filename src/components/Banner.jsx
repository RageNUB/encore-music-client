import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  return (
    <>
      <Swiper
        rewind={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full h-[18rem] lg:h-[34rem] rounded-lg"
      >
        <SwiperSlide><img className="w-full h-full rounded-lg" src="https://img.freepik.com/free-photo/texture-treble-clef-dark-background-isolated-generative-ai_169016-29580.jpg?w=1060&t=st=1686614973~exp=1686615573~hmac=d5de2a519339ce603b18503177b353fec21d9f60c61e89a1826e6d77034d3cfa" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-full rounded-lg" src="https://img.freepik.com/free-photo/creative-illustration-with-electric-guitar-generative-ai_169016-30106.jpg?w=1060&t=st=1686614855~exp=1686615455~hmac=0c922679abd7f6b49b4613e3d0f4ecf31e6ec1fc7a94d6f68d0146dc99fda50a" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-full rounded-lg" src="https://img.freepik.com/premium-photo/music-notes-glossy-background-illustration-ai-generativexa_115919-14854.jpg?w=1060" alt="" /></SwiperSlide>
        <SwiperSlide><img className="w-full h-full rounded-lg" src="https://img.freepik.com/premium-photo/bright-musical-background_476363-6644.jpg?w=1060" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
