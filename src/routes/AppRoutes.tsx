import Home from "@/pages/home/Home";
import { ReactNode, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const suspended = (lazyNode: ReactNode) => (
  <Suspense fallback={null}>{lazyNode}</Suspense>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={suspended(<Home />)} />
    </Routes>
  );
};
