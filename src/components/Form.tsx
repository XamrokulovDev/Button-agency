import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import {
  FaRegCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { clearMessage, submitForm } from "../features/form-contact";
import ReCaptcha, { ReCaptchaRef } from "../utils/ReCaptcha";

const Form = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { status, message } = useSelector((state: RootState) => state.form);

  const captchaRef = useRef<ReCaptchaRef>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Captcha token olish
    const token = await captchaRef.current?.execute();
    if (!token) {
      alert("Iltimos, captcha'dan o'ting");
      return;
    }

    dispatch(submitForm({ ...formData, captcha: token })).then((res) => {
      if (res.type === "form/submitForm/fulfilled") {
        setFormData({ name: "", phone: "", subject: "" });
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
      return <FaRegCheckCircle size={23} className="text-green-500" />;
    if (status === "error")
      return <FaTimesCircle size={23} className="text-red-500" />;
    if (status === "warning")
      return <FaExclamationTriangle size={23} className="text-orange-500" />;
    return null;
  };

  return (
    <>
      {/* Captcha */}
      <div className="absolute top-0 left-0">
        <ReCaptcha ref={captchaRef} />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white md:px-20 p-4 space-y-5 md:space-y-10 rounded-[25px] w-full h-full shadow-lg flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-5">
          <div className="w-full md:w-[48%]">
            <label
              htmlFor="name"
              className="block text-[#6A6A6A] font-[400] font-arial text-[18px] leading-[34px] mb-2"
            >
              {t("contact.name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full h-[50px] bg-[#F4F4F4] border border-[#E8003D] rounded-full outline-none px-4"
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="phone"
              className="block text-[#6A6A6A] font-[400] font-arial text-[18px] leading-[34px] mb-2"
            >
              {t("contact.phone")}
            </label>
            <div className="w-full h-[50px] bg-[#F4F4F4] border border-[#E8003D] rounded-full px-4 flex items-center">
              <PhoneInput
                id="phone"
                name="phone"
                defaultCountry="UZ"
                international
                withCountryCallingCode
                value={formData.phone}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: value ? String(value) : "",
                  }))
                }
                className="PhoneInputInput bg-transparent text-[14px] w-full h-[40px] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-end md:justify-between gap-5">
          <div className="w-full md:w-[48%]">
            <label
              htmlFor="subject"
              className="block text-[#6A6A6A] font-[400] font-arial text-[18px] leading-[34px] mb-2"
            >
              {t("contact.businessField")}
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full h-[50px] bg-[#F4F4F4] border border-[#E8003D] rounded-full outline-none px-4"
            />
          </div>

          <div className="w-full md:w-[48%] flex items-end">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-[50px] bg-[#E8003D] text-[#FFFFFF] font-[400] font-arial text-[18px] leading-[34px] rounded-full disabled:opacity-70 transition-all cursor-pointer"
            >
              {status === "loading" ? t("contact.sending") : t("contact.send")}
            </button>
          </div>
        </div>
      </motion.form>

      {/* Toast xabari */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white fixed top-5 left-1/2 -translate-x-1/2 px-5 py-3 z-[9999999999999] rounded-lg flex items-center gap-4 shadow-lg"
          >
            {renderIcon()}
            <p className="text-[16px] font-inter">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Form;