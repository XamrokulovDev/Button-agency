import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import ScrollToTop from "../components/ScrollToTop";
import Socials from "../components/Socials";
import HelmetPage from "../utils/Helmet";
import Footer from "../components/Footer";
import AnalyticsScript from "../utils/AnalyticsScript";
import ReCaptcha from "../utils/ReCaptcha";

export default function RouterLayout() {
  const location = useLocation();

  return (
    <>
      <ReCaptcha />
      <ScrollToTop />
      <Socials />
      <AnalyticsScript />
      <HelmetPage lang="uz" />
      <Navbar />
      <main>
        <Suspense fallback="">
          <Outlet />
        </Suspense>
      </main>
      {location.pathname !== "/contact" && <ContactSection />}
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}