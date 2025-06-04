"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

export default function Page() {
  const pagination = {
    clickable: true,
  };
  return (
    <div className="p-10 w-screen">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={pagination}
        loop={true}
        grabCursor={true}
        navigation={true}
        className="w-full"
      >
        <SwiperSlide>
          <SlideContent slideNum={1} />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent slideNum={2} />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent slideNum={3} />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent slideNum={4} />
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent slideNum={5} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

function SlideContent({ slideNum }: { slideNum: number }) {
  return (
    <div className="w-full h-[600px] flex justify-center items-center border border-slate-500">
      Slide {slideNum}
    </div>
  );
}
