import { motion } from "framer-motion";

const HeadersText = ({ title }: { title: string }) => {
  return (
    <div className="h-[300px] sm:h-[394px] bg-[#171717] rounded-b-[25px] text-3xl font-bold text-center md:mb-20 mb-10">
      <motion.h1
        title={title}
        className="text-[50px] sm:text-[85px] lg:text-[130px] text-[#FFFFFF] font-arial font-[700] leading-[100%] pt-[170px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {title}
      </motion.h1>
    </div>
  );
};

export default HeadersText;