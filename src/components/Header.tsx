import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "../features/hero-section";
import { RootState, AppDispatch } from "../store/store";

const Header = () => {
  const { i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.hero);

  const title =
    i18n.language === "uz"
      ? data?.title_uz ?? ""
      : i18n.language === "ru"
      ? data?.title_ru ?? ""
      : data?.title_en ?? "";

  const subtitle =
    i18n.language === "uz"
      ? data?.subtitle_uz ?? ""
      : i18n.language === "ru"
      ? data?.subtitle_ru ?? ""
      : data?.subtitle_en ?? "";

  const letters = subtitle.split("");
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const count = Math.floor(scrolled / 5) * 2;
      setVisibleCount(count);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto pt-[120px] lg:pt-[180px]">
        <motion.h1
          title={title}
          className="font-arial text-[#171717] font-[700] lg:text-[70px] md:text-[55px] text-[45px] leading-[100%] text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        <p
          ref={ref}
          className="font-arial text-[#171717] font-[400] md:text-[32px] text-[21px] leading-[100%] text-center md:mt-5 mt-1 lg:px-35 flex flex-wrap justify-center gap-x-[2px]"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              animate={{
                color: index < visibleCount ? "#171717" : "#C6C6C6",
              }}
              transition={{ duration: 0.3 }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </p>

        {/* Video */}
        <div className="md:h-[500px] h-[400px] rounded-[50px] overflow-hidden mt-20">
          {data?.video && (
            <video
              className="w-full h-full object-cover"
              src={`${_api}/${data.video}`}
              autoPlay
              loop
              muted
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;