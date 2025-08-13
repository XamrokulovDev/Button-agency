import React, { Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import RouterLayout from "./layouts/RouterLayout.tsx";
import { SEOHead } from "./utils/SeoHead.tsx";

const Portfolio = React.lazy(() => import("./pages/Portfolio.tsx"));
const ProjectDetail = React.lazy(() => import("./pages/ProjectDetail.tsx"));
const ServicesSection = React.lazy(() => import("./pages/ServicesSection.tsx"));
const About = React.lazy(() => import("./pages/About.tsx"));
const Home = React.lazy(() => import("./pages/Home.tsx"));
const Contact = React.lazy(() => import("./pages/Contact.tsx"));

function App() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/portfolio", element: <Portfolio /> },
        { path: "/portfolio/:id", element: <ProjectDetail /> },
        { path: "/services", element: <ServicesSection /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
      ],
    },
    { path: "*", element: <Home /> },
  ]);

  if (showLoading) return <Loading />;

  return (
    <Suspense fallback="">
      <SEOHead />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;