import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchServices } from "../features/services";
import { useTranslation } from "react-i18next";

const ServiceItem = () => {
  const { i18n } = useTranslation();
  const controls = useAnimation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <div className="md:mt-20" ref={ref}>
      <div className="max-w-7xl mx-auto flex flex-col gap-[30px]">
        {data?.map((item, idx) => (
          <motion.div
            key={item.uuid}
            className="group border-b border-[#D4D4D4] max-lg:flex-col flex items-start lg:items-center justify-between py-[40px] px-[20px] hover:bg-[#E8003D] rounded-[10px] cursor-pointer transition-all duration-300"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: idx * 0.2,
                },
              },
            }}
            initial="hidden"
            animate={controls}
          >
            <div className="max-w-[318px] flex items-center gap-[14px]">
              <p className="font-arial text-[20px] font-[400] leading-[32px] group-hover:text-[#FFFFFF]">
                0{idx + 1}
              </p>
              <h3
                title={
                  i18n.language === "uz"
                    ? item.title_uz
                    : i18n.language === "ru"
                    ? item.title_ru
                    : item.title_en
                }
                className="font-arial text-[21px] md:text-[30px] font-[400] leading-[32px] group-hover:text-[#FFFFFF]"
              >
                {i18n.language === "uz"
                  ? item.title_uz
                  : i18n.language === "ru"
                  ? item.title_ru
                  : item.title_en}
              </h3>
            </div>
            <motion.div
              className="max-w-[727px] flex flex-wrap gap-[20px] py-6"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              {item.details.map((item, index) => (
                <motion.p
                  key={index}
                  className="font-arial text-[#101010] text-[16px] font-[400] border border-[#CCCCCC] group-hover:border-[#FFFFFF] rounded-[40px] group-hover:text-[#FFFFFF] px-[20px] md:px-[25px] py-[8px] md:py-[13px]"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate={controls}
                >
                  {i18n.language === "uz"
                    ? item.title_uz
                    : i18n.language === "ru"
                    ? item.title_ru
                    : item.title_en}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceItem;
