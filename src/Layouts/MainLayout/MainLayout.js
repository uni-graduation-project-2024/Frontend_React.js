import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
                <DndProvider backend={HTML5Backend}>
                <div className="main-container">
                    <Outlet context={{ openModal, updateNavbar: refreshNavbarfun }}/>
                </div>
                </DndProvider>
            </main>
            
        </>
    )
}

export default MainLayout;