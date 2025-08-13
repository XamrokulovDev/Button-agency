import HelmetPage from "../utils/Helmet";
import HeadersText from "../components/HeadersText";
import { useTranslation } from "react-i18next";
import contact_image from "../assets/contact.svg";
import white_location from "../assets/white_location.svg";
import white_email from "../assets/white_email.svg";
import white_phone from "../assets/white_phone.svg";
import ContactForm from "../components/ContactForm";
import vector_telegram from "../assets/vector_telegram.svg";
import vector_instagram from "../assets/vector_instagram.svg";
import vector_facebook from "../assets/vector_facebook.svg";
import vector_youtube from "../assets/vector_youtube.svg";

import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../features/contacts";
import { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";

const pageTitle = {
  uz: "Kontaktlar",
  ru: "Контакты",
  en: "Contacts",
};

const Contact = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.contact);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const socialLinks = [
    { icon: vector_telegram, href: data?.instagram },
    { icon: vector_instagram, href: data?.facebook },
    { icon: vector_facebook, href: data?.youtube },
    { icon: vector_youtube, href: data?.telegram },
  ].filter((link) => typeof link.href === "string" && link.href.trim() !== "");

  const currentLang = i18n.language as "uz" | "ru" | "en";

  return (
    <>
      <HelmetPage lang={currentLang} pageTitle={pageTitle[currentLang]} />
      <HeadersText title={pageTitle[currentLang]} />
      <div className="max-w-7xl mx-auto mt-16 md:mt-28 mb-16 md:mb-42 max-xl:px-4 px-0">
        <div className="lg:h-[480px] h-[835px] bg-[#000000] py-[64px] relative overflow-hidden rounded-t-[25px]">
          <img
            src={contact_image}
            alt="contact image"
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="w-full absolute top-0 left-0 z-10 flex flex-col">
            <div className="w-full px-[20px] sm:px-[120px] pt-[64px] flex items-start max-lg:flex-col justify-between gap-y-[25px]">
              <div className="w-full">
                <h1
                  title={t("contact_page.title_1")}
                  className="text-[#FFFFFF] font-arial font-[700] lg:text-[36px] text-[25px] md:text-[35px] leading-[36px]"
                >
                  {t("contact_page.title_1")}
                </h1>
                <h1
                  title={t("contact_page.title_1")}
                  className="text-[#FFFFFF] font-arial font-[700] lg:text-[36px] text-[25px] md:text-[35px] leading-[36px] md:mt-4 mt-1"
                >
                  {t("contact_page.title_2")}
                </h1>
                <div className="flex flex-col gap-[15px] mt-10">
                  {data?.email_main && data.email_main.trim() !== "" && (
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email_main}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-[17px]"
                    >
                      <img 
                        src={white_email} 
                        alt="white email" 
                        loading="lazy" 
                        className="w-[25px] h-[25px] object-contain"
                      />
                      <p className="text-[#959595] font-[400] font-arial text-[18px] leading-[100%]">
                        {data.email_main}
                      </p>
                    </a>
                  )}
                  {data?.phone_main && data.phone_main.trim() !== "" && (
                    <a
                      href={`tel:${data.phone_main}`}
                      className="flex items-center gap-[17px]"
                    >
                      <img 
                        src={white_phone} 
                        alt="white phone" 
                        loading="lazy" 
                        className="w-[25px] h-[25px] object-contain"
                      />
                      <p className="text-[#959595] font-[400] font-arial text-[18px] leading-[100%]">
                        {data.phone_main}
                      </p>
                    </a>
                  )}
                  <a href="" className="flex items-center gap-[17px]">
                    <img
                      src={white_location}
                      alt="white location"
                      loading="lazy"
                      className="w-[25px] h-[25px] object-contain"
                    />
                    {(i18n.language === "uz" && data?.address_uz?.trim()) ||
                    (i18n.language === "ru" && data?.address_ru?.trim()) ||
                    (i18n.language === "en" && data?.address_en?.trim()) ? (
                      <a className="text-[#959595] font-[400] font-arial text-[18px] leading-[100%]">
                        {i18n.language === "uz"
                          ? data.address_uz
                          : i18n.language === "ru"
                          ? data.address_ru
                          : data.address_en}
                      </a>
                    ) : null}
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
            <div className="flex items-center justify-center mt-8">
              <div className="max-w-[410px] flex items-center gap-[40px] p-[15px]">
                {socialLinks.map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <img src={Icon} alt="Social icon" className="w-[30px] h-[30px] object-contain" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {data?.map_embed_code && (
          <div className="w-full h-[350px] sm:h-[480px] bg-[#000000] rounded-b-[25px]">
            <div className="w-full h-full rounded-[25px] border-t-[10px] border-[#E8003D] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1793.0418421324853!2d69.31674513665871!3d41.311958151857525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef51dd6189f87%3A0xd649d33ad72f9cb1!2sSultanali%20Mashkhadi%20Street%2079%2C%20100007%2C%20Tashkent%2C%20Uzbekistan!5e1!3m2!1sen!2s!4v1754129063344!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Contact;
