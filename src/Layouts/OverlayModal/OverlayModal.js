import "./OverlayModal.css";

const OverlayModal = ({ children }) => {
    return (
        <div className="view-window-frame">
            <div className="view-window-container">
            {children}
            </div>
        </div> 
    );
};

export default OverlayModal;