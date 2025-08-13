"use client";

import { motion } from "framer-motion";
import bigLogo from "../assets/bigLogo.svg";
export default function AboutLog() {
  return (
    <div className="my-20 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-3 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6 "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              title="Button Agency — эволюция вашего бренда через инновационный
              маркетинг." 
              className="md:text-[45px] text-[30px] font-arial font-[700] text-[#000000] leading-[56px]">
              Button Agency — эволюция вашего бренда через инновационный
              маркетинг.
            </h1>

            <motion.p
              className="md:text-[24px] text-[20px] font-arial font-[400] text-[#000000] leading-[129%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Компания существует уже более 6 лет и на сегодняшний день
              реализовала 500+ успешных проектов в сфере маркетинга и брендинга.
            </motion.p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="overflow-hidden rounded-[25px] border border-[#94969C]/50 w-full bg-white px-10">
              <img
                src={bigLogo}
                alt="Button Agency"
                className="w-full h-full scale-75 object-contain md:h-[307px]"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
