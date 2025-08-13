import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { truncateWords } from "../utils/truncateWords";
import HeadersText from "../components/HeadersText";
import { motion, AnimatePresence } from "framer-motion";
import HelmetPage from "../utils/Helmet";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchProjects } from "../features/projects";

const Portfolio = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;
  const currentLang = i18n.language as "uz" | "ru" | "en";

  const dispatch = useDispatch<AppDispatch>();
  const { data: projects } = useSelector((state: RootState) => state.projects);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const filteredProjects = activeTag
    ? projects.filter((project) => {
        const titles = project.service_details.map((tag) => {
          return currentLang === "uz"
            ? tag.title_uz
            : currentLang === "ru"
            ? tag.title_ru
            : tag.title_en;
        });
        return titles.includes(activeTag);
      })
    : projects;

  const allTags = Array.from(
    new Set(
      projects.flatMap((project) =>
        project.service_details.map((tag) =>
          currentLang === "uz"
            ? tag.title_uz
            : currentLang === "ru"
            ? tag.title_ru
            : tag.title_en
        )
      )
    )
  );

  const pageTitle = {
    uz: "Portfolio",
    ru: "Портфолио",
    en: "Portfolio",
  };

  return (
    <>
      <HelmetPage lang={currentLang} pageTitle={pageTitle[currentLang]} />
      <HeadersText title={t("cases.title")} />
      <motion.section
        className="max-w-7xl mx-auto px-4 md:pt-10 pt-0 md:pb-30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Teglar */}
        <div className="flex flex-wrap items-start justify-center gap-[15px] sm:gap-[50px] mb-12">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-arial font-[400] text-[14px] sm:text-[24px] leading-[100%] px-[20px] sm:px-[50px] py-[10px] sm:py-[20px] rounded-[40px] border cursor-pointer ${
              activeTag === null
                ? "bg-[#E8003D] text-white border-[#E8003D]"
                : "bg-transparent text-black hover:bg-[#E8003D] hover:text-white border-[#E8003D]"
            }`}
          >
            {t("cases.all") || "Barchasi"}
          </button>
          {allTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => setActiveTag(tag)}
              className={`font-arial font-[400] text-[14px] sm:text-[24px] leading-[100%] px-[20px] sm:px-[50px] py-[10px] sm:py-[20px] rounded-[40px] border cursor-pointer ${
                activeTag === tag
                  ? "bg-[#E8003D] text-white border-[#E8003D]"
                  : "bg-transparent text-black hover:bg-[#E8003D] hover:text-white border-[#E8003D]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* Projects */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 md:gap-20 gap-12 md:mt-16">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.uuid}
                onClick={() => navigate(`/portfolio/${project.uuid}`)}
                className="cursor-pointer bg-white rounded-[25px] overflow-hidden shadow hover:shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={`${_api}/${project.image}`}
                  alt={project[`title_${currentLang}`]}
                  loading="lazy"
                  className="w-full h-[350px] sm:h-[420px] object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="font-arial font-[700] text-[28px] text-[#000000] mb-5">
                    {project[`title_${currentLang}`]}
                  </h3>
                  <p className="text-[16px] md:text-[20px] min-h-[100px] font-arial font-[400] text-[#000000] mb-3">
                    {truncateWords(project[`description_${currentLang}`], 25)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.service_details.map((tag, index) => (
                      <span
                        key={index}
                        className="px-6 py-1 text-[12px] md:text-[14px] text-[#000000] font-[400] border border-[#CCCCCC] rounded-full"
                      >
                        {i18n.language === "uz"
                          ? tag.title_uz
                          : i18n.language === "ru"
                          ? tag.title_ru
                          : tag.title_en}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>
    </>
  );
};

export default Portfolio;
