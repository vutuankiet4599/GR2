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
    multiple,
    isChecked = false,
}) => {
    return (
        <div className={`flex flex-col gap-2.5 text-lg ${style}`}>
            {label ? (
                <label htmlFor={id} className="text-xl font-medium">
                    {label} {required ? <span className="text-red-500">*</span> : <></>}
                </label>
            ) : (
                <></>
            )}
            <div className="relative m-0 p-0">
                {icon && (
                    <div className={"absolute left-2 top-3 m-0 p-0 text-indigo-600"}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    multiple={multiple}
                    required={required}
                    className={
                        type != "radio" && type != "checkbox"
                            ? `h-12 w-full ${
                                  icon ? "pl-9" : "px-3"
                              } rounded-md border-0 border-b-2 border-blue-500 transition ease-linear hover:border-indigo-500 focus:border-violet-500 focus:outline-none`
                            : "h-6 w-6 accent-indigo-500"
                    }
                    checked={isChecked}
                />
            </div>
            {error ? <div className="text-lg text-red-500">{error}</div> : <></>}
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
    multiple: PropTypes.bool,
    isChecked: PropTypes.bool,
};

export default Input;
