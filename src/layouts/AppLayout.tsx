import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SiteFooter from "../components/ui/site-footer";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main >
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
