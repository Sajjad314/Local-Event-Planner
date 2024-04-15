import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { uiPaths } from "../paths/uiPaths";
import { PublicLayout } from "../layout/PublicLayout";

const AppRoutes = () => {
  const HomePage = lazy(() => import("../pages/Home.page"));
  const CreatePage = lazy(() => import("../pages/EventDetails.page"));
  const DetailsPage = lazy(() => import("../pages/Details.page"));

  useEffect(() => {
    console.log("mounted");
  });

  const { EventDetails, Details } = uiPaths;
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path={EventDetails} element={<CreatePage />} />
        <Route path={Details} element={<DetailsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
