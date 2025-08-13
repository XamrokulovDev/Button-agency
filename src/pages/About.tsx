import { useTranslation } from "react-i18next";
import { Suspense, lazy } from "react";
const HelmetPage = lazy(() => import("../utils/Helmet"));
const Component = lazy(() => import("../components/StatItem"));
const TeamSection = lazy(() => import("../components/TeamMemberCard"));
const AboutHeader = lazy(() => import("../components/AboutHeader"));
const Cronology = lazy(() => import("../components/Cronology"));
const PartnersSection = lazy(() => import("../components/PartnersSection"));
const AboutSwiper = lazy(() => import("../components/AboutSwiper"));

const About = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as "uz" | "en" | "ru";

  const pageTitle = {
    uz: "Biz haqimizda",
    ru: "О нас",
    en: "About Us",
  };

  return (
    <>
      <Suspense fallback="">
        <AboutHeader />
        <HelmetPage lang={lang} pageTitle={pageTitle[lang]} />
        <div className="bg-[#000000] rounded-b-[25px]">
          <div className="max-w-7xl mx-auto max-lg:px-0 px-4">
            <TeamSection />
          </div>
          <div className="max-w-7xl mx-auto max-md:px-4">
            <Component />
          </div>
        </div>
        <div className="max-w-[1110px] mx-auto max-md:px-4 md:mt-[120px] mt-[45px]">
          <Cronology />
        </div>
        <div className="mt-20 mb-10">
          <PartnersSection />
        </div>
        <div className="w-full bg-[#FFFFFF] py-[50px] mt-20">
          <AboutSwiper />
        </div>
      </Suspense>
    </>
  );
};

export default About;