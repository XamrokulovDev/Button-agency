import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";
import email from "../assets/email.svg";
import phone from "../assets/phone.svg";
import location from "../assets/location.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../features/contacts";
import { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.contact);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <div className="px-4 xl:px-0">
      <div className="max-w-7xl mx-auto mb-[60px] sm:mb-[80px] lg:mb-[100px] border-t border-[#CCCCCC] pt-10 sm:pt-12 lg:pt-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <NavLink to="/" className="shrink-0">
          <img
            src={logo}
            alt="footer logo"
            loading="lazy"
            className="w-[200px] sm:w-[250px] lg:w-[318px] h-auto"
          />
        </NavLink>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 sm:gap-[60px] lg:gap-[108px]">
          <ul className="flex flex-col gap-[12px]">
            <li>
              <NavLink
                to="/portfolio"
                className="hover:text-[#E8003D] text-[16px] font-arial font-[400] leading-[100%] transition-all duration-300"
              >
                {t("nav.cases")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="hover:text-[#E8003D] text-[16px] font-arial font-[400] leading-[100%] transition-all duration-300"
              >
                {t("nav.services")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:text-[#E8003D] text-[16px] font-arial font-[400] leading-[100%] transition-all duration-300"
              >
                {t("nav.about")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="hover:text-[#E8003D] text-[16px] font-arial font-[400] leading-[100%] transition-all duration-300"
              >
                {t("nav.contacts")}
              </NavLink>
            </li>
          </ul>
          <ul className="flex flex-col gap-[15px]">
            <li className="flex items-center gap-[17px]">
              <img
                src={email}
                alt="company email"
                loading="lazy"
                className="w-[22px] sm:w-[25px] lg:w-[27px]"
              />
              {data?.email_main && data.email_main.trim() !== "" && (
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email_main}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#171717] font-[400] font-arial text-[16px] sm:text-[17px] lg:text-[18px] leading-[100%]"
                >
                  {data.email_main}
                </a>
              )}
            </li>
            <li className="flex items-center gap-[17px]">
              <img
                src={phone}
                alt="company phone"
                loading="lazy"
                className="w-[20px] sm:w-[23px] lg:w-[25px]"
              />
              {data?.phone_main && data.phone_main.trim() !== "" && (
                <a
                  href={`tel:${data.phone_main}`}
                  className="text-[#171717] font-[400] font-arial text-[16px] sm:text-[17px] lg:text-[18px] leading-[100%]"
                >
                  {data.phone_main}
                </a>
              )}
            </li>
            <li className="flex items-center gap-[17px]">
              <img
                src={location}
                alt="company location"
                loading="lazy"
                className="w-[18px] sm:w-[19px] lg:w-[20px]"
              />
              {(i18n.language === "uz" && data?.address_uz?.trim()) ||
              (i18n.language === "ru" && data?.address_ru?.trim()) ||
              (i18n.language === "en" && data?.address_en?.trim()) ? (
                <a className="text-[#171717] font-[400] font-arial text-[16px] sm:text-[17px] lg:text-[18px] leading-[100%]">
                  {i18n.language === "uz"
                    ? data.address_uz
                    : i18n.language === "ru"
                    ? data.address_ru
                    : data.address_en}
                </a>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
