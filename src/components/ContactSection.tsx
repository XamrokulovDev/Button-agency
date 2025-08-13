import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import Instagram from "../assets/socellmedia/instagram.svg";
import Facebook from "../assets/socellmedia/facebook.svg";
import Youtube from "../assets/socellmedia/youtube.svg";
import TelegramIcon from "../assets/socellmedia/telegram.svg";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../features/contacts";
import { RootState, AppDispatch } from "../store/store";
import Form from "./Form";

export default function ContactSection() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.contact);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const socialLinks = [
    { icon: Instagram, href: data?.instagram },
    { icon: Facebook, href: data?.facebook },
    { icon: Youtube, href: data?.youtube },
    { icon: TelegramIcon, href: data?.telegram },
  ].filter((link) => typeof link.href === "string" && link.href.trim() !== "");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="contacts" className="py-5 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto md:my-[100px] my-[50px]">
        <motion.div
          className="grid lg:grid-cols-2 bg-[#E8003D] rounded-[25px] gap-12 items-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {/* Left Side */}
          <motion.div
            className="px-7 pt-7 lg:p-12 text-white relative"
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <h2
              title={t("contact.title")}
              className="font-arial text-[30px] md:text-[35px] lg:text-[45px] font-[700] leading-[40px] md:leading-[56px] md:mb-2"
            >
              {t("contact.title")}
            </h2>
            <h2
              title={t("contact.subtitle")}
              className="font-arial text-[30px] md:text-[35px] lg:text-[45px] font-[700] leading-[40px] md:leading-[56px] md:mb-8 mb-5"
            >
              {t("contact.subtitle")}
            </h2>
            <div className="flex items-center flex-wrap gap-4">
              {data?.email_main && data.email_main.trim() !== "" && (
                <a
                  href={`tel:${data?.phone_main}`}
                  rel="noopener noreferrer"
                  className="flex items-center gap-[17px]"
                >
                  <p className="w-[215px] h-[45px] font-arial text-[18px] md:text-[22px] leading-[100%] font-[700] border border-[#FFFFFF] rounded-[50px] flex items-center justify-center transition-colors">
                    {data?.phone_main}
                  </p>
                </a>
              )}
              {/* ✅ Faqat mavjud social iconlar ko‘rinadi */}
              <span className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[35.86px] h-[35.86px] bg-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <img
                      src={Icon}
                      alt="Social icon"
                      className="w-[22.07px] h-[22.07px]"
                    />
                  </a>
                ))}
              </span>
            </div>
          </motion.div>
          {/* Right Side (Form) */}
          <Form />
        </motion.div>
      </div>
    </section>
  );
}