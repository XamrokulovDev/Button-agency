import { useTranslation } from "react-i18next";
import arrow_click_right from "../assets/arrow-click-right.svg";
import arrow_click_left from "../assets/arrow-click-left.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchReviews } from "../features/reviews";

const AboutSwiper = () => {
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.review);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const desktopSwiperRef = useRef<SwiperClass | null>(null);
  const mobileSwiperRef = useRef<SwiperClass | null>(null);

  const handleAvatarClick = (index: number) => {
    desktopSwiperRef.current?.slideToLoop(index);
    mobileSwiperRef.current?.slideToLoop(index);
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (desktopSwiperRef.current && mobileSwiperRef.current) {
      const newIndex = activeIndex === 0 ? data.length - 1 : activeIndex - 1;
      desktopSwiperRef.current.slideToLoop(newIndex);
      mobileSwiperRef.current.slideToLoop(newIndex);
      setActiveIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (desktopSwiperRef.current && mobileSwiperRef.current) {
      const newIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
      desktopSwiperRef.current.slideToLoop(newIndex);
      mobileSwiperRef.current.slideToLoop(newIndex);
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-[32px]">
        {t("content.title")}
      </h1>

      {/* Avatars */}
      <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
        {data?.map((user, index) => (
          <div
            key={index}
            onClick={() => handleAvatarClick(index)}
            className={`border rounded-full cursor-pointer p-1 transition-all ${
              activeIndex === index
                ? "border-[#E8003D]"
                : "border-transparent hover:border-[#E8003D]"
            }`}
          >
            <img
              src={`${_api}/${user.image}`}
              alt={user.full_name_lt || user.full_name_kr}
              loading="lazy"
              className="w-[40px] h-[40px] object-cover rounded-full"
            />
          </div>
        ))}
      </div>
      {/* Desktop Swiper */}
      <div className="hidden lg:block relative mt-10">
        <div className="absolute left-0 top-0 w-[300px] h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-[300px] h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <Swiper
          onSwiper={(swiper) => (desktopSwiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop={true}
          centeredSlides={true}
          slidesPerView={3.5}
          spaceBetween={20}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation]}
        >
          {data.map((user, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-300 h-full border p-5 ${
                    isActive ? "border-[#E8003D]" : "border-[#1A1A1A]/30"
                  } rounded-[25px]`}
                >
                  <div
                    className={`text-[16px] ${
                      isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/20"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html:
                        i18n.language === "uz"
                          ? user?.message_uz
                          : i18n.language === "ru"
                          ? user?.message_ru
                          : user?.message_en,
                    }}
                  />
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      src={`${_api}/${user.image}`}
                      alt={user.full_name_lt || user.full_name_kr}
                      loading="lazy"
                      className="w-[48px] h-[48px] rounded-full object-cover"
                    />
                    <div>
                      <p
                        className={`text-[18px] ${
                          isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/20"
                        }`}
                      >
                        {i18n.language === "ru"
                          ? user.full_name_kr
                          : user.full_name_lt}
                      </p>
                      <p
                        className={`text-[16px] ${
                          isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/20"
                        }`}
                      >
                        {i18n.language === "uz"
                          ? user.position_uz
                          : i18n.language === "ru"
                          ? user.position_ru
                          : user.position_en}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Mobile Swiper */}
      <div className="lg:hidden relative mt-8">
        <div className="max-md:hidden absolute left-0 top-0 w-[150px] h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="max-md:hidden absolute right-0 top-0 w-[150px] h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <Swiper
          onSwiper={(swiper) => (mobileSwiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop={true}
          centeredSlides={true}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.1 },
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.5 },
          }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation]}
        >
          {data.map((user, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-300 h-full border p-4 ${
                    isActive ? "border-[#E8003D]" : "border-[#1A1A1A]/30"
                  } rounded-[22px]`}
                >
                  <div
                    className="text-[14px] sm:text-[15px] md:text-[16px] text-black"
                    dangerouslySetInnerHTML={{
                      __html:
                        i18n.language === "uz"
                          ? user?.message_uz
                          : i18n.language === "ru"
                          ? user?.message_ru
                          : user?.message_en,
                    }}
                  />
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      src={`${_api}/${user.image}`}
                      alt={user.full_name_lt || user.full_name_kr}
                      loading="lazy"
                      className="w-[48px] h-[48px] rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[18px] font-bold text-black">
                        {user.full_name_lt || user.full_name_kr}
                      </p>
                      <p className="text-[16px] text-black">
                        {i18n.language === "uz"
                          ? user.position_uz
                          : i18n.language === "ru"
                          ? user.position_ru
                          : user.position_en}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Arrows */}
      {data.length >= 2 && (
        <div className="w-full flex items-center justify-center gap-5 mt-10">
          <button
            onClick={handlePrev}
            className="w-[50px] h-[35px] border border-[#E8003D] rounded-full flex items-center justify-center cursor-pointer"
          >
            <img src={arrow_click_left || "/placeholder.svg"} alt="left" />
          </button>
          <button
            onClick={handleNext}
            className="w-[50px] h-[35px] border border-[#E8003D] rounded-full flex items-center justify-center cursor-pointer"
          >
            <img src={arrow_click_right || "/placeholder.svg"} alt="right" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutSwiper;