import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchCompanyInfo } from "../features/company-info";
import { useTranslation } from "react-i18next";

const AboutHeader = () => {
  const { i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch<AppDispatch>();
  const { info: data } = useSelector((state: RootState) => state.companyInfo);

  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  if (!data) return null;

  const title =
    i18n.language === "uz"
      ? data.title_uz
      : i18n.language === "ru"
      ? data.title_ru
      : data.title_en;

  const description =
    i18n.language === "uz"
      ? data.description_uz
      : i18n.language === "ru"
      ? data.description_ru
      : data.description_en;

  return (
    <div className="w-full h-[629px] relative overflow-hidden">
      {/* Background image */}
      <img
        src={`${_api}/${data?.image}`}
        alt={title}
        loading="eager"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="w-full text-white absolute left-[50%] translate-x-[-50%] bottom-[30px] flex flex-col items-center max-lg:px-4 px-0 z-50">
        <motion.h1
          title={title}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[#E8003D] font-caveat text-[100px] md:text-[141px] font-[700] leading-[85px] md:leading-[125px] text-center"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="max-w-[1129px] text-center font-[400] font-arial text-[18px] md:text-[25px] xl:text-[32px] leading-[100%] text-[#FFFFFF] mt-10 max-lg:px-4 px-0"
          dangerouslySetInnerHTML={{
            __html:
              description
          }}
        />
      </div>
    </div>
  );
};

export default AboutHeader;