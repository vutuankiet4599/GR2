import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div className="flex flex-col gap-2.5 text-lg">
            {label ? (
                <label htmlFor={id} className="text-xl font-medium">
                    {label}{" "}
                    {required ? <span className="text-red-500">*</span> : <></>}
                </label>
            ) : (
                <></>
            )}
            <div className="relative p-0 m-0">
                <div
                    className={
                        icon
                            ? "p-0 m-0 absolute left-2 top-3 text-indigo-600"
                            : "hidden"
                    }
                >
                    <FontAwesomeIcon icon={icon} />
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
                            ? "h-12 pl-9 border-0 border-b-2 border-blue-500 focus:border-violet-500 hover:border-indigo-500 focus:outline-none transition ease-linear rounded-md" +
                              style
                            : "w-6 h-6 accent-indigo-500"
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
    icon: PropTypes.object,
    value: PropTypes.any,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    required: PropTypes.bool,
};

export default Input;
