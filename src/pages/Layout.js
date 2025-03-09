import { Outlet } from "react-router-dom";

import "./Layout.css";
import Sidebar from "../sidebar";
import NavBar from "./Home/navbar";

const Layout = () => {
    return (
        <>
            <Sidebar/>
            <NavBar/>
            <main>
            <Outlet/>
            </main>
        </>
    )
}

export default Layout;