import PropTypes from "prop-types";

const Textarea = ({
    id,
    cols = 10,
    rows = 10,
    name,
    value,
    onchange,
    placeholder,
    disabled = false,
    error,
    required,
    style,
    label,
}) => {
    return (
        <div className="flex flex-col gap-2.5 text-lg w-full">
            {label ? (
                <label htmlFor={id} className="text-xl font-medium">
                    {label}{" "}
                    {required ? <span className="text-red-500">*</span> : <></>}
                </label>
            ) : (
                <></>
            )}
            <textarea
                name={name}
                id={id}
                cols={cols}
                rows={rows}
                value={value}
                onChange={onchange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`p-2.5 text-base outline-none text-gray-900 bg-gray-50 rounded-lg border-2 border-blue-500 focus:ring-indigo-500 focus:border-indigo-500 ${style}`}
            ></textarea>
            {error ? (
                <div className="text-red-500 text-lg">{error}</div>
            ) : (
                <></>
            )}
        </div>
    );
};

Textarea.propTypes = {
    id: PropTypes.string,
    cols: PropTypes.number,
    rows: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.string,
    onchange: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    required: PropTypes.bool,
    style: PropTypes.string,
    label: PropTypes.string,
};

export default Textarea;
