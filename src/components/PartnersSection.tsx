import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "../features/partners";
import { RootState, AppDispatch } from "../store/store";
import { Plus } from "lucide-react";
import ModalForm from "./ModalForm";

export default function PartnersSection() {
  const { t } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.partners);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  return (
    <section className="mt-[80px] max-xl:px-4 px-0">
      <div className="max-w-[1200px] mx-auto">
        <h2
          title={t("partners.title", "Hamkorlarimiz")}
          className="text-[32px] md:text-4xl font-bold text-gray-800 mb-10 max-md:text-center"
        >
          {t("partners.title")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-[75px] gap-[35px]">
          {data.map((partner, index) => (
            <a
              href={partner.url}
              target="_blank"
              key={index+1}
              className="flex items-center justify-center min-h-[98px] w-full"
            >
              <img
                src={`${_api}/${partner?.logo}`}
                alt="partner logo"
                loading="lazy"
                className="h-full w-full object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </a>
          ))}
          <motion.div className="flex flex-col items-center justify-center text-red-500">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-[247px] h-[50px] md:h-[70px] border border-red-500 rounded-2xl border-dashed md:px-10 cursor-pointer py-5 flex items-center justify-center md:gap-2 hover:bg-red-500 hover:text-white transition duration-300"
            >
              <span className="text-[16px] md:text-[24px] font-[400] font-arial leading-[34px]">
                {t("partners.yourLogo")}
              </span>
              <Plus className="md:w-6 w-5 md:h-6 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && <ModalForm onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}