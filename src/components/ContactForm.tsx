import { motion /* AnimatePresence */ } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { clearMessage, submitForm } from "../features/form-contact";
import ReCaptcha, { ReCaptchaRef } from "../utils/ReCaptcha";
// import { FaRegCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

const ContactForm = () => {
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

  return (
    <>
      {/* Invisible reCAPTCHA */}
      <ReCaptcha ref={captchaRef} />

      <motion.form
        onSubmit={handleSubmit}
        className="bg-[#0000004D] md:p-[40px] rounded-[25px] md:w-[587px] w-full h-full flex flex-col items-center justify-center md:px-[50px] p-4 space-y-5 md:space-y-[22px]"
      >
        <div className="w-full flex flex-col md:flex-row items-end md:justify-between gap-5">
          <div className="w-full md:w-[210px]">
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
              className="w-full h-[40px] bg-[#F4F4F4] border border-[#E8003D] rounded-full outline-none px-4"
            />
          </div>

          <div className="w-full md:w-[210px]">
            <label
              htmlFor="phone"
              className="block text-[#6A6A6A] font-[400] font-arial text-[18px] leading-[34px] mb-2"
            >
              {t("contact.phone")}
            </label>
            <div className="w-full h-[40px] bg-[#F4F4F4] border border-[#E8003D] rounded-full px-4 flex items-center">
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
          <div className="w-full md:w-[210px]">
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
              className="w-full h-[40px] bg-[#F4F4F4] border border-[#E8003D] rounded-full outline-none px-4"
            />
          </div>

          <div className="w-full md:w-[210px]">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-[40px] bg-[#E8003D] text-[#FFFFFF] font-[400] font-arial text-[18px] leading-[34px] rounded-full disabled:opacity-70 transition-all cursor-pointer max-md:mt-4"
            >
              {status === "loading" ? t("contact.sending") : t("contact.send")}
            </button>
          </div>
        </div>
      </motion.form>
    </>
  );
};

export default ContactForm;