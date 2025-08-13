import { useTranslation } from "react-i18next";
import upload from "../assets/upload.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { submitResume, clearResumeMessage } from "../features/create-resume";
import {
  FaRegCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import ReCaptcha from "../utils/ReCaptcha";

const ModalRequest = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { status, message } = useSelector((state: RootState) => state.resume);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    file: null as File | null,
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setFormData((prev) => ({ ...prev, file }));
        setIsUploading(false);
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitResume(formData)).then((res) => {
      if (res.type === "resume/submitResume/fulfilled") {
        setFormData({ name: "", phone: "", message: "", file: null });
        onClose();
      }
    });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearResumeMessage());
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
        className="w-screen h-screen bg-[#57575733] backdrop-blur-[15px] fixed top-0 left-0 z-[9999] flex items-center justify-center lg:px-0 p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="modal-scroll bg-[#FFFFFF] max-lg:w-full h-full/ w-[886px] h-[815px] max-sm:h-[635px] max-md:h-[615px] rounded-[25px] relative overflow-y-auto pb-[15px]"
        >
          <button
            className="absolute top-[12px] right-[12px] h-[37px] bg-[#E8003D33] rounded-[20px] text-[#E8003D] font-arial font-[400] text-[16px] md:text-[18px] leading-[34px] cursor-pointer px-3"
            onClick={onClose}
          >
            {t("modal_form.close")}
          </button>
          <h1 className="text-[#000000] font-arial text-[18px] md:text-[36px] font-[700] leading-[100%] w-[78%] mx-auto text-center pt-[65px]">
            {t("modal_request.title")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-[700px] mx-auto lg:px-0 mt-[20px] md:mt-[45px] px-4"
          >
            <div className="w-full flex max-md:flex-col items-center justify-between md:gap-[30px]">
              <div className="w-full flex flex-col gap-[10px] md:gap-[30px]">
                <div className="flex flex-col gap-[4px]">
                  <label className="text-[#6A6A6A] font-[400] font-arial text-[18px] leading-[34px]">
                    {t("modal_request.name")}
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
                  <label className="text-[#6A6A6A] font-[400] font-arial text-[18px] leading-[34px]">
                    {t("modal_request.phone")}
                  </label>
                  <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full outline-none h-[45px] md:h-[55px] bg-[#F4F4F4] border border-[#E8003D] rounded-[50px] px-5"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-[5px] md:mt-[30px] gap-[4px]">
              <label className="text-[#6A6A6A] font-[400] font-arial text-[18px] leading-[34px]">
                {t("modal_request.textarea")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full outline-none h-[100px] md:h-[182px] bg-[#F4F4F4] border border-[#E8003D] rounded-[50px] p-5"
              ></textarea>
            </div>

            <div className="w-full flex items-center justify-between my-[15px] md:my-[30px] max-md:flex-col gap-[10px] md:gap-[30px]">
              <div className="border border-[#E8003D] w-full h-[55px] rounded-[50px] flex items-center justify-center gap-[10px] relative overflow-hidden">
                <img src={upload} alt="upload icon" loading="lazy" />
                <p className="text-[#E8003D] font-arial font-[400] text-[18px] leading-[34px]">
                  {isUploading
                    ? t("modal_request.uploading")
                    : formData.file
                    ? t("modal_request.uploaded")
                    : t("modal_request.resume-b")}
                </p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="outline-none absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#E8003D] text-[#FFFFFF] w-full h-[55px] rounded-[50px] font-arial font-[400] text-[18px] leading-[34px] cursor-pointer disabled:opacity-70 mt-[5px] md:mt-0"
              >
                {status === "loading"
                  ? t("contact.sending")
                  : t("modal_request.send")}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
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

export default ModalRequest;
