import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import TopnavBar from "./components/TopnavBar";

export const PublicLayout: FC = () => {
  return (
    <div>
      <TopnavBar />
      <Suspense fallback={<div></div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
