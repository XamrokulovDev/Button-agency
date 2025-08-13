import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeadersText from "../components/HeadersText";
import HelmetPage from "../utils/Helmet";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchProjects } from "../features/projects";
import { fetchProjectDetail } from "../features/project-detail";
import { useEffect } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;
  const currentLang = i18n.language as "uz" | "ru" | "en";

  const dispatch = useDispatch<AppDispatch>();
  const { data: projects } = useSelector((state: RootState) => state.projects);
  const { data: projectDetail } = useSelector(
    (state: RootState) => state.projectDetail
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectDetail(id));
    }
  }, [dispatch, id]);

  const project = projects.find((p) => p.uuid === id);

  if (!project) {
    return null;
  }

  const nextProject = projectDetail?.next_project;
  const Project = projectDetail?.project;

  const pageTitle = project[`title_${currentLang}`];
  const description = project[`description_${currentLang}`];

  return (
    <div className="overflow-x-hidden">
      <HeadersText title={t("cases.title")} />
      <HelmetPage lang={currentLang} pageTitle={pageTitle} />
      <div className="max-w-7xl mx-auto px-4">
        {/* Project Title */}
        <div className="flex max-md:flex-col items-start justify-between md:gap-20 gap-2 mb-6">
          <h2
            title={pageTitle}
            className="text-[35px] md:text-[45px] font-bold mb-3 flex items-center gap-3"
          >
            "{pageTitle}"
          </h2>
          {/* Tags */}
          <div className="w-full flex flex-wrap gap-2 mt-3">
            {project.service_details?.map((tag, i) => (
              <span
                key={i}
                className="border border-[#CCCCCC] rounded-[40px] text-[15px] md:text-[16px] px-[20px] md:px-[25px] py-[8px] md:py-[13px]"
              >
                {tag[`title_${currentLang}`]}
              </span>
            ))}
          </div>
        </div>
        {/* Images */}
        <div className="bg-[#FFFFFF] p-[15px] rounded-[25px] mt-12">
          <div className="flex items-center max-md:flex-col gap-[15px] min-w-0">
            <a
              href={project?.url}
              target="_blank"
              className="w-full md:w-1/2 h-[300px] sm:h-[575px]"
            >
              <img
                src={`${_api}/${project.image}`}
                alt={pageTitle}
                loading="lazy"
                className="w-full max-w-full h-[300px] sm:h-[575px] object-cover rounded-[25px]"
              />
            </a>
            <div className="w-full md:w-1/2 max-md:h-[200px] grid md:grid-cols-1 grid-cols-2 gap-[15px]">
              {Project?.image_2 && (
                <img
                  src={`${_api}/${Project?.image_2}`}
                  alt={Project?.[`title_${currentLang}`]}
                  loading="lazy"
                  className="w-full h-[280px] max-md:h-[200px] object-cover rounded-[25px]"
                />
              )}
              {Project?.image_3 && (
                <img
                  src={`${_api}/${Project?.image_3}`}
                  alt={Project?.[`title_${currentLang}`]}
                  loading="lazy"
                  className="w-full h-[280px] max-md:h-[200px] object-cover rounded-[25px]"
                />
              )}
            </div>
          </div>
          <div
            className="text-[#000000] font-arial font-[400] text-[24px] md:text-[32px] leading-[120%] my-8"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
      </div>
      {/* Banner Sektsiyasi */}
      <section className="mt-20 md:py-10">
        <div className="relative w-full h-[520px] sm:h-[657px] mx-auto overflow-hidden">
          <div className="w-full h-full absolute top-0 left-0 bg-black/50 z-10"></div>
          <img
            src={`${_api}/${nextProject?.image}`}
            alt="Zamzam"
            loading="lazy"
            className="w-full h-full absolute top-0 left-0 object-cover"
          />
          <div className="max-w-7xl px-4 flex flex-col items-start justify-center h-full mx-auto relative z-10">
            <h2
              title={nextProject?.[`title_${currentLang}`]}
              className="text-white text-[35px] md:text-[56px] leading-[125.42px] font-bold"
            >
              {nextProject?.[`title_${currentLang}`]}
            </h2>
            <div className="flex flex-col items-start gap-[15px]">
              {nextProject?.service_details?.map((tag, i) => (
                <span
                  key={i}
                  className="border border-[#CCCCCC] text-white rounded-[40px] px-[20px] md:px-[25px] py-[8px] md:py-[13px]"
                >
                  {tag[`title_${currentLang}`]}
                </span>
              ))}
            </div>
            <a
              href={nextProject?.url}
              target="_blank"
              title="Следуюшый проект"
              className="text-white text-[23px] md:text-[40px] mt-[25px] font-bold"
            >
              Следуюшый проект
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
