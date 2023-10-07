import PropTypes from "prop-types";

const Input = ({
    type = "text",
    style = "",
    label,
    id,
    icon,
    value,
    onChange,
    placeholder,
    name,
    disabled = false,
    error,
    required,
}) => {
    return (
        <div className="flex flex-col gap-2.5 text-xl">
            {label ? (
                <label htmlFor={id} className="text-2xl font-medium">
                    {label}{" "}
                    {required ? <span className="text-red-500">*</span> : <></>}
                </label>
            ) : (
                <></>
            )}
            <div className="relative p-0 m-0">
                <div
                    className={
                        icon ? "p-0 m-0 absolute left-2 top-3" : "hidden"
                    }
                >
                    {icon}
                </div>
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={
                        type != "radio" && type != "checkbox"
                            ? "h-12 pl-9 border-0 border-b-2 border-blue-500 focus:border-violet-400 focus:outline-none transition rounded-md" +
                              style
                            : "w-6 h-6"
                    }
                />
            </div>
            {error ? (
                <div className="text-red-500 text-lg">{error}</div>
            ) : (
                <></>
            )}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    icon: PropTypes.element,
    value: PropTypes.any,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    required: PropTypes.bool,
};

export default Input;
