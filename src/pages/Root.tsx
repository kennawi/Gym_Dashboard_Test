import React, { useState } from "react";
import Sidebar from "../components/navegation/Sidebar";
import { Outlet } from "react-router-dom";
import store from "../store";
import { Provider } from "react-redux";
import Navbar from "../components/navegation/Navbar";

const RootLayout = () => {
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <Provider store={store}>
      <Sidebar openSidebar={openSidebar}>
        <Navbar onOpenSidebar={toggleSidebar} />

        <main className="mt-[72px] ">
          <Outlet />
        </main>
      </Sidebar>
    </Provider>
  );
};

export default RootLayout;
