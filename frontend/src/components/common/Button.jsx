import PropTypes from "prop-types";

let variantType = {
    success: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    error: "bg-red-500 hover:bg-red-600 active:bg-red-700",
    info: "rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
    primary: "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700",
    secondary: "bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700",
    warning: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
    user: "bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700",
    outline_user:
        "bg-white text-zinc-900 hover:bg-zinc-900 active:bg-zinc-700 hover:text-white border-zinc-800",
};

const Button = ({ onclick, variant, title = "Button", type = "button", style }) => {
    return (
        <button
            type={type}
            onClick={onclick}
            className={
                "rounded-md border p-3 text-lg text-white outline-none" +
                " " +
                variantType[variant] +
                " " +
                style
            }
        >
            {title}
        </button>
    );
};

Button.propTypes = {
    onclick: PropTypes.func,
    variant: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.string,
};

export default Button;
