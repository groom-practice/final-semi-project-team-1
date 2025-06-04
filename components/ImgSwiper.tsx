// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFavoriteImgs } from "@/store/useFavoriteStore";
import Image from "next/image";

function ImgSwiper() {
  const { favoriteImgs } = useFavoriteImgs();

  const pagination = {
    clickable: true,
  };

  if (favoriteImgs.length === 0)
    return (
      <div className="flex justify-center items-center h-[400px] text-gray-400">
        즐겨찾기한 사진이 없습니다.
      </div>
    );

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
        {favoriteImgs.map((photo) => (
          <SwiperSlide key={photo.id}>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={photo.download_url}
                alt={photo.id}
                width={600}
                height={600}
                className="rounded-lg shadow-md object-cover object-center"
              />
              <div className="mt-2 text-center text-lg text-gray-700">
                {photo.author}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImgSwiper;
