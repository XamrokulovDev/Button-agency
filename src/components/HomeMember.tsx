import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../features/team-members";
import type { RootState, AppDispatch } from "../store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const HomeMember = () => {
  const { i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  return (
    <div className="px-4 md:py-10 py-5">
      <div className="max-w-7xl mx-auto">
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="mySwiper cursor-ew-resize py-10"
        >
          {data?.map((member, index) => {
            const { photo } = member;
            const delay = index * 0.2;

            return (
              <SwiperSlide key={index} className="py-10">
                <motion.div
                  className="relative w-full h-[450px] md:h-[364px] rounded-3xl overflow-hidden shadow-lg bg-black"
                  style={{
                    backgroundImage: `url(${_api}/${photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  initial={{ opacity: 0, y: 50, scale: 1 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="absolute top-3 left-3 z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: delay + 0.3 }}
                  >
                    <div className="bg-black/20 backdrop-blur-md text-white text-xs md:text-sm font-medium uppercase px-4 py-1 rounded-full border border-white/30">
                      {i18n.language === "uz"
                        ? member.position_uz
                        : i18n.language === "ru"
                        ? member.position_ru
                        : member.position_en}
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 z-10 text-center bg-gradient-to-t from-[#2B000B] via-[#44001280] to-transparent h-[100px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: delay + 0.5 }}
                  >
                    <h3
                      title={
                        i18n.language === "ru"
                          ? member.full_name_lt
                          : member.full_name_kr
                      }
                      className="text-white text-[22px] font-bold leading-tight absolute bottom-5 left-[50%] translate-x-[-50%]"
                    >
                      {i18n.language === "ru"
                        ? member.full_name_kr
                        : member.full_name_lt}
                    </h3>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeMember;
