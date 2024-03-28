import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="py-8 px-2 flex flex-col min-h-screen max-w-6xl mx-auto">
      <Header />
      <Footer />
      <Outlet />
    </div>
  );
}