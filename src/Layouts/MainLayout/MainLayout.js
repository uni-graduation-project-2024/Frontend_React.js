import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./MainLayout.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import FullWindowModal from "../OverlayModal/OverlayModal";

const MainLayout = () => {
    const [ showModal, setShowModal ] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [refreshNavbar, setRefreshNavbar] = useState(false);

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(!!content);
    };

    const refreshNavbarfun = () => {
    setRefreshNavbar(prev => !prev);
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
            <Navbar refreshNavbar={{refreshNavbar}}/>
            <main>
                <div className="main-container">
                    <Outlet context={{ openModal, updateNavbar: refreshNavbarfun }}/>
                </div>
            </main>
            
        </>
    )
}

export default MainLayout;