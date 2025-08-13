import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam } from "../features/team-members";
import type { RootState, AppDispatch } from "../store/store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const TeamMemberCard = () => {
  const { i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[21px] gap-y-[40px] max-lg:px-4 md:py-20 py-10 px-0">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-full h-[450px] md:h-[364px] rounded-[18px] relative overflow-hidden hover:translate-y-[-10px] transition-all duration-400 ease-in-out"
        >
          <img
            src={`${_api}/${item.photo}`}
            alt={item.full_name_lt}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/2 z-10 bg-gradient-to-t from-[#2B000B] to-[#44001200]" />
          <motion.div
            className="absolute top-3 left-3 z-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/20 backdrop-blur-md text-white text-xs md:text-sm font-medium uppercase px-4 py-1 rounded-full border border-white/30">
              {i18n.language === "uz"
                ? item.position_uz
                : i18n.language === "ru"
                ? item.position_ru
                : item.position_en}
            </div>
          </motion.div>
          <h3
            title={
              i18n.language === "ru" ? item.full_name_lt : item.full_name_kr
            }
            className="absolute bottom-[15px] left-0 right-0 z-20 text-center text-[#FFFFFF] font-arial font-[700] text-[22px] leading-[34px] px-5"
          >
            {i18n.language === "ru" ? item.full_name_kr : item.full_name_lt}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamMemberCard;
