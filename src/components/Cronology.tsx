import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchCronology } from "../features/work-process";
import lineIcon from "../assets/line.svg";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Cronology = () => {
  const _api = import.meta.env.VITE_API_URL;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.cronology);

  useEffect(() => {
    dispatch(fetchCronology());
  }, [dispatch]);

  return (
    <div className="-mt-[400px] md:-mt-[300px]">
      {/* Sticky title */}
      <div className="relative">
        <h1
          title={t("cronology.title")}
          className="sticky top-[150px] z-[999] mt-[450px] md:mt-[400px] text-center text-[#000000] font-[700] font-arial text-[25px] md:text-[43px] leading-[18px] md:mb-20 mb-10"
        >
          {t("cronology.title")}
        </h1>
      </div>
      {/* Card list */}
      <div className="relative md:px-8">
        {data?.map((item, index) => (
          <div
            key={index}
            className="sticky"
            style={{
              top: `${250 + index * 20}px`,
              zIndex: "auto",
              marginBottom: window.innerWidth >= 768 ? "10rem" : "5rem",
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-[20px] bg-[#FFFFFF] rounded-[10px] shadow-[0px_4px_30px_rgba(0,0,0,0.1)] p-[20px] transform transition-all duration-300 ease-in-out hover:shadow-[0px_8px_40px_rgba(0,0,0,0.15)]">
              {/* Left side */}
              <div className="w-full md:w-[50%] flex flex-col gap-[25px]">
                <div className="flex items-start gap-[19px]">
                  <img
                    src={lineIcon}
                    alt="line image"
                    loading="lazy"
                    className="w-[30px] h-[30px] object-cover"
                  />
                  <h1
                    title={
                      i18n.language === "uz"
                        ? item.title_uz
                        : i18n.language === "ru"
                        ? item.title_ru
                        : item.title_en
                    }
                    className="text-[#000000] font-[400] font-arial text-[18px] md:text-[26px] lg:text-[28px] leading-[35px]"
                  >
                    {i18n.language === "uz"
                      ? item.title_uz
                      : i18n.language === "ru"
                      ? item.title_ru
                      : item.title_en}
                  </h1>
                </div>
                <div
                  className="text-[#000000] font-[400] font-arial text-[15px] md:text-[20px] leading-[25px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      i18n.language === "uz"
                        ? item.description_uz
                        : i18n.language === "ru"
                        ? item.description_ru
                        : item.description_en,
                  }}
                />
              </div>

              {/* Right side: Image */}
              <div className="w-full md:w-[50%] h-[250px] md:h-[300px] lg:h-[335px]">
                <img
                  src={`${_api}/${item.image}`}
                  alt={
                    i18n.language === "uz"
                      ? item.title_uz
                      : i18n.language === "ru"
                      ? item.title_ru
                      : item.title_en
                  }
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cronology;