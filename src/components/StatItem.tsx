import { useTranslation } from "react-i18next";
import { RootState, AppDispatch } from "../store/store";
import { fetchStatistics } from "../features/statistics";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isIntersecting };
};

const extractNumber = (amount: string): number => {
  const cleanAmount = amount.replace(/[+,]/g, "");

  if (cleanAmount.includes("M") || cleanAmount.includes("m")) {
    return parseFloat(cleanAmount.replace(/[Mm]/g, "")) * 1000000;
  } else if (cleanAmount.includes("K") || cleanAmount.includes("k")) {
    return parseFloat(cleanAmount.replace(/[Kk]/g, "")) * 1000;
  }

  return parseFloat(cleanAmount) || 0;
};

const formatNumber = (num: number, originalAmount: string): string => {
  const hasPlus = originalAmount.startsWith("+");
  const prefix = hasPlus ? "+" : "";

  if (originalAmount.includes("M") || originalAmount.includes("m")) {
    return `${prefix}${(num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1)}M`;
  } else if (originalAmount.includes("K") || originalAmount.includes("k")) {
    return `${prefix}${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}k`;
  }

  return `${prefix}${num}`;
};

interface StatisticsItem {
  amount: string;
  title_ru: string;
  title_uz: string;
  title_en: string;
  order: number;
}

const StatItem = ({
  item,
  isAnimating,
}: {
  item: StatisticsItem;
  isAnimating: boolean;
}) => {
  const { i18n } = useTranslation();
  const [count, setCount] = useState(0);
  const targetNumber = extractNumber(item.amount);

  useEffect(() => {
    if (!isAnimating) return;

    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetNumber);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetNumber, isAnimating]);

  const displayAmount = formatNumber(count, item.amount);

  return (
    <div className="w-[256px] flex flex-col items-start justify-center gap-3">
      <h1
        title={item.amount}
        className="font-arial font-[700] text-[40px] md:text-[55px] leading-[48px] text-[#E8003D]"
      >
        {displayAmount}
      </h1>
      <p className="w-[256px] text-[#FFFFFF] font-[400] font-arial text-[16px] md:text-[18px] leading-[110%]">
        {i18n.language === "uz"
          ? item.title_uz
          : i18n.language === "ru"
          ? item.title_ru
          : item.title_en}
      </p>
    </div>
  );
};

export default function Component() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.statistics);
  const { info } = useSelector((state: RootState) => state.companyInfo);
  const { ref, isIntersecting } = useIntersectionObserver(0.3);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center max-xl:px-4 px-0">
      <h1
        title={t("about.mission")}
        className="text-[#FFFFFF] font-arial font-[700] text-[32px] md:text-[40px] leading-[52px] text-center"
      >
        {t("about.mission")}
      </h1>
      <div className="max-w-[883px] text-center mt-[20px]">
        <div
          className="text-[#FFFFFF] font-inter font-[400] text-[16px] md:text-[22px] leading-[30px]"
          dangerouslySetInnerHTML={{
            __html:
              i18n.language === "uz"
                ? info?.mission_uz || ""
                : i18n.language === "ru"
                ? info?.mission_ru || ""
                : info?.mission_en || "",
          }}
        />
      </div>
      <div
        ref={ref}
        className="w-full bg-[#212121] rounded-[25px] my-[50px] p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-12">
          {data.map((item, index) => (
            <StatItem key={index} item={item} isAnimating={isIntersecting} />
          ))}
        </div>
      </div>
    </div>
  );
}