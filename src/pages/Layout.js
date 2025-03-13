import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./Layout.css";
import Sidebar from "../sidebar";
import NavBar from "./Home/navbar";
import FullWindowModal from "./FullWindowModal";

const Layout = () => {
    const [ showModal, setShowModal ] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(!!content);
    };

    return (
        <>
            {/* Render modal if showModal is true */}
            {showModal && (
                <FullWindowModal>
                    {modalContent}
                </FullWindowModal>
            )}

            <Sidebar/>
            <NavBar/>
            <main>
                <div className="main-container">
                    <Outlet context={{openModal}}/>
                </div>
            </main>
            
        </>
    )
}

export default Layout;