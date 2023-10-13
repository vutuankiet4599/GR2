import PropTypes from "prop-types";

const Modal = ({ isShow = false, title = "", close, style = "", children }) => {
    return isShow ? (
        <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-slate-300 bg-opacity-50 flex items-center justify-center">
            <div
                className={
                    "bg-white w-1/3 opacity-100 flex flex-col rounded-md" +
                    " " +
                    style
                }
            >
                <div className="flex items-center justify-between p-5 border-b-2">
                    <p className="text-lg font-medium">{title}</p>
                    <span
                        className="text-lg font-medium p-2 rounded-md text-white bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 cursor-pointer"
                        onClick={close}
                    >
                        Close
                    </span>
                </div>
                <div>{children}</div>
            </div>
        </div>
    ) : (
        <></>
    );
};

Modal.propTypes = {
    isShow: PropTypes.bool,
    title: PropTypes.string,
    close: PropTypes.func,
    style: PropTypes.string,
    children: PropTypes.node,
};

export default Modal;
