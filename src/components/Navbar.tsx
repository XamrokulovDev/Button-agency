import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import DarkLogo from "../assets/logo.svg";
import LightLogo from "../assets/white_logo.svg";
// import ModalForm from "./ModalForm";
import ModalRequest from "./ModalRequest";
import { MdOutlineClose } from "react-icons/md";
import menu from "../assets/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../features/contacts";
import { RootState, AppDispatch } from "../store/store";

const languages = [
  { code: "uz", label: "Uz" },
  { code: "ru", label: "Ру" },
  { code: "en", label: "En" },
];

const navItems = [
  { key: "cases", href: "/portfolio" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "contacts", href: "/contact" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.contact);

  const isAnyModalOpen = isModalOpen || isRequestOpen || isMobileMenuOpen;

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLanguageOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full fixed left-0 top-0 z-[99999] py-[25px] px-4 transition-all duration-300 bg-[#FFFFFF0D] ${
        isAnyModalOpen ? "" : "backdrop-blur-[15px]"
      } ${
        scrolledDown && location.pathname !== "/"
          ? "bg-[#0000001c]"
          : "bg-[#FFFFFF0D]"
      }`}
    >
      <div
        className={`flex items-center justify-between max-w-7xl mx-auto ${
          scrolledDown ? "bg-transparent" : "bg-transparent"
        } rounded-[50px] transition-all duration-300`}
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center md:w-[130px] md:h-[40px] w-[100px]"
        >
          <img
            src={location.pathname === "/" ? DarkLogo : LightLogo}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </NavLink>
        <div className="flex items-center">
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-[20px]">
            <div className="relative">
              <button
                className="max-lg:hidden lg:flex xl:hidden group h-[50px] bg-[#FFFFFF] rounded-full hover:bg-[#E8003D] items-center justify-center gap-2 transition-all duration-300 px-4"
                onClick={() => setIsTabletMenuOpen(!isTabletMenuOpen)}
              >
                <p className="text-black group-hover:text-[#FFFFFF] text-[16px] font-arial">
                  {(() => {
                    const currentNavItem = navItems.find(
                      (item) => item.href === location.pathname
                    );
                    if (currentNavItem) {
                      return t(`nav.${currentNavItem.key}`);
                    }
                    return t("nav.cases");
                  })()}
                </p>
                <motion.div
                  animate={{ rotate: isTabletMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-black group-hover:text-[#FFFFFF] mt-1" />
                </motion.div>
              </button>
              {/* Tablet dropdown menu */}
              <AnimatePresence>
                {isTabletMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="xl:hidden absolute top-full left-0 mt-2 bg-white rounded-[25px] shadow-lg py-4 px-4 min-w-[200px] z-50 flex flex-col gap-[15px]"
                  >
                    {navItems.map(({ key, href }) => (
                      <NavLink
                        key={key}
                        to={href}
                        onClick={() => setIsTabletMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-[18px] font-arial font-[400] transition-all duration-300 ${
                            isActive
                              ? "text-[#E8003D]"
                              : "text-black hover:text-[#E8003D]"
                          }`
                        }
                      >
                        {t(`nav.${key}`)}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="max-xl:hidden flex items-center gap-[30px] bg-white rounded-full px-4 h-[50px] max-xl:flex-col">
              {navItems.map(({ key, href }) => (
                <NavLink
                  key={key}
                  to={href}
                  className={({ isActive }) =>
                    `text-[18px] font-arial font-[400] transition-all duration-300 ${
                      isActive
                        ? "text-[#E8003D]"
                        : "text-black hover:text-[#E8003D]"
                    }`
                  }
                >
                  {t(`nav.${key}`)}
                </NavLink>
              ))}
            </div>
            <motion.a
              href={`tel:${data?.phone_main}`}
              className="w-[160px] h-[50px] group flex items-center justify-center space-x-2 py-2 bg-[#FFFFFF] hover:bg-[#E8003D] transition-all duration-300 border border-[#E8003D] rounded-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-4 h-4 bg-[#E8003D] group-hover:bg-white transition-all duration-300 rounded-full" />
              <span className="text-[#000000] group-hover:text-white transition-all duration-300 text-[16px] font-[400] font-arial">
                {t("nav.contact")}
              </span>
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group w-[150px] h-[50px] cursor-pointer bg-[#FFFFFF] hover:bg-[#E8003D] border border-[#E8003D] rounded-full flex items-center justify-center transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="text-black font-arial font-[400] text-[16px] group-hover:text-[#FFFFFF] transition-all duration-300">
                {t("nav.request")}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="max-lg:hidden group bg-[#FFFFFF] hover:bg-[#E8003D] w-[190px] h-[50px] border border-[#E8003D] flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
              onClick={() => setIsRequestOpen(true)}
            >
              <p className="text-black font-arial font-[400] text-[16px] group-hover:text-[#FFFFFF] transition-all duration-300">
                {t("nav.button")}
              </p>
            </motion.div>
            {/* Til tanlash */}
            <div className="relative">
              <motion.button
                type="button"
                className="max-lg:hidden group w-[75px] h-[50px] bg-[#FFFFFF] hover:bg-[#E8003D] border border-[#E8003D] flex items-center justify-center rounded-full cursor-pointer gap-[5px] px-3 py-2 transition-all duration-300"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-black font-medium group-hover:text-[#FFFFFF] transition-all duration-300">
                  {currentLang.label}
                </span>
                <motion.div
                  animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-black group-hover:text-[#FFFFFF] mt-1 transition-all duration-300" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[80px] z-50"
                  >
                    {languages.map(({ code, label }) => (
                      <button
                        key={code}
                        className="w-full px-3 py-2 text-[18px] text-left text-gray-700 hover:bg-gray-50 transition-all duration-300"
                        onClick={() => changeLanguage(code)}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#E8003D] rounded-full cursor-pointer"
            >
              <img
                src={menu}
                alt="menu icon"
                loading="eager"
                className="w-[25px] h-[25px] object-contain"
              />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-[#EEEEEE] h-[100vh] w-[100%] fixed top-0 right-0 z-[9998] flex flex-col items-start"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-[90vh] w-[95%] mx-auto fixed top-[55px] right-[2.5%] left-[2.5%] bg-white z-[9998] flex flex-col items-start gap-4 shadow-md rounded-[20px] lg:hidden pt-10 p-6"
            >
              <div
                className="absolute right-5 top-10 z-[999999] cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MdOutlineClose size={30} />
              </div>
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center h-[40px] mb-5"
              >
                <img
                  src={DarkLogo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </NavLink>
              <div className="flex flex-col gap-[36px] w-full">
                <div className="flex flex-col gap-[35px] items-center w-full">
                  {navItems.map(({ key, href }) => (
                    <NavLink
                      key={key}
                      to={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `text-[16px] font-arial transition-all duration-300 ${
                          isActive
                            ? "text-[#E8003D]"
                            : "text-black hover:text-[#E8003D]"
                        }`
                      }
                    >
                      {t(`nav.${key}`)}
                    </NavLink>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-[10px]">
                  <motion.a
                    href={`tel:${data?.phone_main}`}
                    className="w-full lg:w-[142px] h-[50px] group flex items-center justify-center space-x-2 px-[20px] py-[12px] bg-[#FFFFFF] hover:bg-[#E8003D] transition-all duration-300 border border-[#E8003D] rounded-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-4 h-4 bg-[#E8003D] group-hover:bg-white transition-all duration-300 rounded-full" />
                    <span className="text-[#000000] group-hover:text-white transition-all duration-300 text-[16px] font-[400] font-arial">
                      {t("nav.contact")}
                    </span>
                  </motion.a>
                  <motion.div
                    className="group w-full lg:w-[163px] h-[50px] cursor-pointer bg-[#FFFFFF] hover:bg-[#E8003D] border border-[#E8003D] rounded-full flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <p className="text-black font-arial font-[400] text-[16px] group-hover:text-white transition-all duration-300">
                      {t("nav.request")}
                    </p>
                  </motion.div>
                </div>
                <div className="grid grid-cols-2 gap-[10px]">
                  <motion.div
                    className="group bg-[#FFFFFF] hover:bg-[#E8003D] w-full lg:w-[192px] h-[50px] border border-[#E8003D] flex items-center justify-center rounded-full cursor-pointer transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsRequestOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <p className="text-black font-arial font-[400] text-[15px] sm:text-[16px] group-hover:text-white transition-all duration-300">
                      {t("nav.button")}
                    </p>
                  </motion.div>
                  {/* til tanlash */}
                  <div className="w-full relative">
                    <motion.button
                      type="button"
                      className="group w-full lg:w-[88px] h-[50px] bg-[#FFFFFF] hover:bg-[#E8003D] border border-[#E8003D] flex items-center justify-center gap-3 rounded-full cursor-pointer px-5 py-2 transition-all duration-300"
                      onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="group-hover:text-white text-black font-medium transition-all duration-300">
                        {currentLang.label}
                      </span>
                      <motion.div
                        animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="group-hover:text-white w-5 h-5 text-black mt-1 transition-all duration-300" />
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {isLanguageOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="w-full absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[80px] z-50 mt-1 py-1"
                        >
                          {languages.map(({ code, label }) => (
                            <button
                              key={code}
                              className="w-full px-3 py-2 text-[18px] text-left text-gray-700 hover:bg-white cursor-pointer transition-all duration-300"
                              onClick={() => changeLanguage(code)}
                            >
                              {label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modallar */}
      <AnimatePresence>
        {/* {isModalOpen && <ModalForm onClose={() => setIsModalOpen(false)} />} */}
        {isRequestOpen && (
          <ModalRequest onClose={() => setIsRequestOpen(false)} />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
