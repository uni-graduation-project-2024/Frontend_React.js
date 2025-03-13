import "./FullWindowModal.css";

const ViewWindow = ({ children }) => {
    return (
        <div className="view-window-frame">
            <div className="view-window-container">
            {children}
            </div>
        </div> 
    );
};

export default ViewWindow;