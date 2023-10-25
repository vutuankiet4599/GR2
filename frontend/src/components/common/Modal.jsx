import PropTypes from "prop-types";

const Modal = ({ isShow = false, title = "", close, style = "", children }) => {
    return isShow ? (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-300 bg-opacity-50">
            <div className={"flex w-1/3 flex-col rounded-md bg-white opacity-100" + " " + style}>
                <div className="flex items-center justify-between border-b-2 p-5">
                    <p className="text-lg font-medium">{title}</p>
                    <span
                        className="cursor-pointer rounded-md bg-zinc-500 p-2 text-lg font-medium text-white hover:bg-zinc-600 active:bg-zinc-700"
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
