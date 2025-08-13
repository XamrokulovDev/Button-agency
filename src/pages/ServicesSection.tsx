import { BrandingServiceCard } from "../components/BrandingServiceCard";
import HeadersText from "../components/HeadersText";
import PartnersSection from "../components/PartnersSection";
import { useTranslation } from "react-i18next";
import HelmetPage from "../utils/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../features/services";
import { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const _api = import.meta.env.VITE_API_URL;
  const currentLang = i18n.language as "uz" | "en" | "ru";
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const pageTitle = {
    uz: "Xizmatlar",
    ru: "Услуги",
    en: "Services",
  };

  return (
    <>
      <HeadersText title={t("servisers.title")} />
      <HelmetPage lang={currentLang} pageTitle={pageTitle[currentLang]} />
      <div className="max-w-7xl mx-auto px-4 md:py-10 py-5">
        <div className="max-w-6xl mx-auto">
          {data.map((item, index) => (
            <BrandingServiceCard
              key={item.uuid}
              index={index}
              number={String(index + 1).padStart(2, "0")}
              title={item[`title_${currentLang}` as "title_uz" | "title_en" | "title_ru"]}
              services={item.details.map(
                (d) => d[`title_${currentLang}` as "title_uz" | "title_en" | "title_ru"]
              )}
              image={`${_api}/${item.image}`}
            />
          ))}
        </div>
        <div>
          <PartnersSection />
        </div>
      </div>
    </>
  );
};

export default ServicesSection;