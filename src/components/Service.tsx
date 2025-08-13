import { useTranslation } from "react-i18next";
import ServiceItem from "./ServiceItem";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Service = () => {
  const { t } = useTranslation();
  const controls = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const rawDescription = t("service.description");

  const coloredDescription = rawDescription.replace(
    /button agency/gi,
    '<span style="color: #E8003D;">button agency</span>'
  );

  return (
    <div className="px-4" ref={ref}>
      <div className="max-w-7xl mx-auto md:mt-20 mt-0">
        {/* Title */}
        <motion.h1
          title={t("service.title")}
          className="font-arial text-[32px] md:text-[40px] font-[700] text-[#000000] text-center"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t("service.title")}
        </motion.h1>
        {/* Description */}
        <motion.p
          className="md:w-[803px] mx-auto font-inter text-[16px] md:text-[22px] font-[400] text-[#000000] text-center my-8"
          dangerouslySetInnerHTML={{ __html: coloredDescription }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        />
        {/* ServiceItem */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <ServiceItem />
        </motion.div>
      </div>
    </div>
  );
};

export default Service;