import { motion } from "framer-motion";

type Props = {
  index: number;
  number: string;
  title: string;
  services: string[];
  image: string;
};

export const BrandingServiceCard = ({
  index,
  number,
  title,
  services,
  image,
}: Props) => {
  const isEven = index % 2 === 1;

  return (
    <div className="w-full min-h-[300px] flex flex-col items-center md:flex-row bg-white rounded-[25px] shadow-sm gap-6 mb-20">
      {/* LEFT PART — Agar juft bo‘lsa rasm chapda, toq bo‘lsa o‘ngda */}
      {isEven && (
        <motion.div
          className="flex-1 w-full md:w-[40%] h-auto flex items-stretch"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-full h-full">
            <img
              src={image}
              alt="service"
              loading="lazy"
              className="object-cover w-full h-full rounded-[25px] shadow-md"
            />
          </div>
        </motion.div>
      )}
      {/* TEXT PART */}
      <div className="flex-1 w-full md:w-[60%] p-6">
        <div className="flex items-center gap-3 mb-5">
          <h4 title={number} className="text-[#000000] font-arial text-[20px] font-[400] leading-[32px]">{number}</h4>
          <h3 title={title} className="text-[#000000] font-arial font-[400] text-[30px] leading-[32px]">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-[10px]">
          {services.map((service, idx) => (
            <span
              key={idx}
              className="rounded-[40px] border border-[#CCCCCC] text-[14px] md:text-[16px] text-[#101010] font-arial font-[400] leading-[16px] px-[20px] md:px-[25px] py-[8px] md:py-[13px]"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      {/* RIGHT PART — Agar toq bo‘lsa rasm o‘ngda */}
      {!isEven && (
        <motion.div
          className="flex-1 w-full md:w-[40%] h-auto flex items-stretch"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-full h-full">
            <img
              src={image}
              alt="service"
              loading="lazy"
              className="object-cover w-full h-full rounded-[25px] shadow-md"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};