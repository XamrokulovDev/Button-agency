import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchProjects } from "../features/projects";

const ProjectItem = () => {
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const { data: projects } = useSelector((state: RootState) => state.projects);
  const selectedProject = projects[selectedIndex];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  if (!projects || projects.length === 0) return null;
  if (!selectedProject) return null;

  return (
    <div className="mt-20 md:mt-35 px-4">
      <div className="max-w-7xl mx-auto bg-[#171717] rounded-[25px] p-0 md:p-[23px] pt-[20px] md:pt-[46px]">
        <div className="rounded-xl flex flex-col md:flex-row text-white overflow-hidden mb-2">
          {/* Left side */}
          <div className="w-full lg:w-[50%] px-4 p-6 md:p-8 md:pr-8 md:pl-0">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.uuid}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-start gap-5 h-full"
                >
                  <h1
                    title={
                      i18n.language === "uz"
                        ? selectedProject.title_uz
                        : i18n.language === "ru"
                        ? selectedProject.title_ru
                        : selectedProject.title_en
                    }
                    className="font-arial text-[24px] md:text-[40px] font-[700] leading-[32px] md:leading-[48px]"
                  >
                    {i18n.language === "uz"
                      ? selectedProject.title_uz
                      : i18n.language === "ru"
                      ? selectedProject.title_ru
                      : selectedProject.title_en}
                  </h1>
                  <div
                    className="font-arial text-[14px] md:text-[16px] font-[400] leading-[22px] md:leading-[24px]"
                    dangerouslySetInnerHTML={{
                      __html:
                        i18n.language === "uz"
                          ? selectedProject.description_uz
                          : i18n.language === "ru"
                          ? selectedProject.description_ru
                          : selectedProject.description_en,
                    }}
                  />
                  <div className="flex gap-[20px] flex-wrap">
                    {selectedProject.service_details?.map((tag, index) => (
                      <span
                        key={index}
                        className="border border-[#797979] text-[#797979] font-arial text-[12px] md:text-[16px] font-[400] leading-[22px] md:leading-[24px] rounded-full px-[20px] md:px-[25px] py-[8px] md:py-[13px]"
                      >
                        {i18n.language === "uz"
                          ? tag.title_uz
                          : i18n.language === "ru"
                          ? tag.title_ru
                          : tag.title_en}
                      </span>
                    ))}
                  </div>
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mt-auto">
                    <NavLink
                      to={`/portfolio/${selectedProject.uuid}`}
                      className="text-[#171717] bg-white font-arial font-[400] text-[15px] md:text-[20px] leading-[18px] border border-transparent transition-all duration-300 hover:bg-[#171717] hover:text-white hover:border-white py-3 px-5 md:py-4 rounded-[50px]"
                    >
                      {t("project.button")}
                    </NavLink>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handlePrev}
                        className="bg-[#545353] text-white rounded-[50px] px-4 lg:px-5 p-2 transition cursor-pointer"
                      >
                        <HiArrowLongLeft size={21} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="bg-[#545353] text-white rounded-[50px] px-4 lg:px-5 p-2 transition cursor-pointer"
                      >
                        <HiArrowLongRight size={21} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Right image */}
          <div className="w-full lg:w-[50%] h-[350px] sm:h-[450px] overflow-hidden p-5">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.img
                  key={selectedProject.uuid}
                  src={`${_api}/${selectedProject.image}`}
                  alt={
                    i18n.language === "uz"
                      ? selectedProject.title_uz
                      : i18n.language === "ru"
                      ? selectedProject.title_ru
                      : selectedProject.title_en
                  }
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Small previews */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 px-5 pb-5">
          {projects
            .filter((_, index) => index !== selectedIndex)
            .map((project, index) => (
              <motion.div
                key={project.uuid}
                className="bg-[#222222] rounded-xl text-white cursor-pointer hover:opacity-80 transition"
                onClick={() =>
                  setSelectedIndex(
                    projects.findIndex((p) => p.uuid === project.uuid)
                  )
                }
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={`${_api}/${project.image}`}
                  alt={
                    i18n.language === "uz"
                      ? project.title_uz
                      : i18n.language === "ru"
                      ? project.title_ru
                      : project.title_en
                  }
                  loading="lazy"
                  className="h-[150px] sm:h-[183px] w-full object-cover rounded-lg"
                />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;