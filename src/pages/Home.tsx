import { Suspense, lazy } from "react";
const Header = lazy(() => import("../components/Header"));
const ButtonItem = lazy(() => import("../components/ButtonItem"));
const HomeMember = lazy(() => import("../components/HomeMember"));
const Service = lazy(() => import("../components/Service"));
const Project = lazy(() => import("../components/Project"));
const PartnersSection = lazy(() => import("../components/PartnersSection"));

const Home = () => {
  return (
    <Suspense fallback="">
      <div>
        <Header />
        <ButtonItem />
        <HomeMember />
        <Service />
        <Project />
        <PartnersSection />
      </div>
    </Suspense>
  );
};

export default Home;