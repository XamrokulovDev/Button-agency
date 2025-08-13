import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { clearMessage, submitForm } from "../features/form-contact";
import {
  FaRegCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import ReCaptcha from "../utils/ReCaptcha";

const ModalForm = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { status, message } = useSelector((state: RootState) => state.form);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
  });

  const title = t("modal_form.title");
  const highlightedTextRegex =
    /(решение вашей задачи\.?|solution to your problem\.?|yechimini topasiz\.?)$/i;

  const titleWithColor = title.replace(
    highlightedTextRegex,
    (match) => `<span style="color:#E8003D;">${match}</span>`
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitForm(formData)).then((res) => {
      if (res.type === "form/submitForm/fulfilled") {
        setFormData({ name: "", phone: "", subject: "" });
        onClose();
      }
    });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const renderIcon = () => {
    if (status === "success")
      return <FaRegCheckCircle size={20} className="text-green-500" />;
    if (status === "error")
      return <FaTimesCircle size={20} className="text-red-500" />;
    if (status === "warning")
      return <FaExclamationTriangle size={20} className="text-orange-500" />;
    return null;
  };

  return (
    <>
      <ReCaptcha />
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-screen h-screen bg-[#57575733] backdrop-blur-[15px] fixed top-0 left-0 z-[999999] flex items-center justify-center lg:px-0 p-4"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="modal-scroll bg-[#FFFFFF] max-lg:w-full max-md:h-[565px] w-[886px] h-[695px] rounded-[25px] relative overflow-y-auto pb-[15px]"
        >
          {/* Close Button */}
          <button
            className="absolute top-[12px] right-[12px] h-[37px] bg-[#E8003D33] rounded-[20px] text-[#E8003D] font-arial font-[400] text-[16px] md:text-[18px] leading-[34px] cursor-pointer px-3"
            onClick={onClose}
          >
            {t("modal_form.close")}
          </button>

          <h1
            title={title}
            className="text-[#000000] font-arial text-[21px] md:text-[36px] font-[700] leading-[100%] w-[80%] mx-auto text-center pt-[70px]"
            dangerouslySetInnerHTML={{ __html: titleWithColor }}
          />

          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-[324px] mx-auto mt-[25px] md:mt-[50px] flex flex-col gap-[20px] md:gap-[40px] px-4"
          >
            <div className="flex flex-col gap-[4px]">
              <label className="text-[#6A6A6A] font-arial font-[400] text-[18px] leading-[34px]">
                {t("modal_form.name")}
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full outline-none h-[45px] md:h-[55px] bg-[#F4F4F4] border border-[#E8003D] rounded-[50px] px-5"
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label className="text-[#6A6A6A] font-arial font-[400] text-[18px] leading-[34px]">
                {t("modal_form.phone")}
              </label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full outline-none h-[45px] md:h-[55px] bg-[#F4F4F4] border border-[#E8003D] rounded-[50px] px-5"
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label className="text-[#6A6A6A] font-arial font-[400] text-[18px] leading-[34px]">
                {t("modal_form.businessField")}
              </label>
              <input
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full outline-none h-[45px] md:h-[55px] bg-[#F4F4F4] border border-[#E8003D] rounded-[50px] px-5"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#E8003D] text-[#FFFFFF] rounded-[50px] text-[18px] font-arial font-[700] leading-[34px] h-[50px] md:h-[55px] cursor-pointer max-md:mt-5 disabled:opacity-70"
            >
              {status === "loading"
                ? t("contact.sending")
                : t("modal_form.send")}
            </button>
          </form>
        </div>
      </motion.div>
      {/* Alert */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[999999] flex items-center gap-3 px-4 py-2 mx-auto bg-white rounded-lg shadow"
        >
          {renderIcon()}
          <p className="text-[15px] font-arial">{message}</p>
        </motion.div>
      )}
    </>
  );
};

export default ModalForm;