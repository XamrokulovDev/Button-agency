import { useTranslation } from "react-i18next";
import bigLogo from "../assets/bigLogo.svg";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchStatistics } from "../features/statistics";

const Counter = ({
  amount,
  inView,
}: {
  amount: string;
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);

  const extractNumber = (value: string) => {
    const clean = value.replace(/[+,]/g, "");
    if (value.includes("M")) return parseFloat(clean.replace("M", "")) * 1_000_000;
    if (value.includes("k") || value.includes("K"))
      return parseFloat(clean.replace(/[kK]/, "")) * 1000;
    return parseFloat(clean);
  };

  const format = (num: number, original: string) => {
    const prefix = original.startsWith("+") ? "+" : "";
    if (original.includes("M"))
      return `${prefix}${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M`;
    if (original.includes("k") || original.includes("K"))
      return `${prefix}${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}k`;
    return `${prefix}${num}`;
  };

  const target = extractNumber(amount);

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const duration = 2000;
    let animationFrame: number;

    const animate = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [inView, target]);

  return <span>{format(count, amount)}</span>;
};

const ButtonItem = () => {
  const { t, i18n } = useTranslation();
  const controls = useAnimation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.statistics);

  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls]);

  return (
    <div className="px-4" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto flex items-start max-md:flex-col gap-8 md:mt-30 mt-20"
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
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Left: Logo */}
        <motion.div
          className="w-full md:w-[50%] overflow-hidden rounded-[25px] border border-[#94969C]/50 bg-white px-10 mb-6"
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <img
            src={bigLogo}
            alt="Button Agency"
            className="w-full h-[200px] scale-75 object-contain md:h-[307px]"
            loading="lazy"
          />
        </motion.div>
        {/* Right: Stats */}
        <motion.div
          className="w-full md:w-[50%]"
          variants={{
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h1
            title={t("about.title")}
            className="text-[#000000] font-arial font-[700] text-[25px] md:text-[32px] leading-[30px] mb-7"
          >
            {t("about.title")}
          </h1>
          <div className="w-full grid grid-cols-2 gap-x-20 gap-10">
            {data.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col gap-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <h1 className="font-arial font-[700] text-[40px] md:text-[55px] leading-[48px] text-[#E8003D]">
                  <Counter amount={item.amount} inView={inView} />
                </h1>
                <p className="text-[#000000] font-[400] font-arial text-[14px] md:text-[18px] leading-[110%]">
                  {i18n.language === "uz"
                    ? item.title_uz
                    : i18n.language === "ru"
                    ? item.title_ru
                    : item.title_en}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ButtonItem;