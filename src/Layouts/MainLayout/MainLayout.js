import { useState } from "react";
import { Outlet } from "react-router-dom";

import "./MainLayout.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import FullWindowModal from "../OverlayModal/OverlayModal";

const MainLayout = () => {
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
            <Navbar/>
            <main>
                <div className="main-container">
                    <Outlet context={{openModal}}/>
                </div>
            </main>
            
        </>
    )
}

export default MainLayout;