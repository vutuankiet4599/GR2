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
        <div className="flex w-full flex-col gap-2.5 text-lg">
            {label ? (
                <label htmlFor={id} className="text-xl font-medium">
                    {label} {required ? <span className="text-red-500">*</span> : <></>}
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
                className={`rounded-lg border-2 border-blue-500 bg-gray-50 p-2.5 text-base text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500 ${style}`}
            ></textarea>
            {error ? <div className="text-lg text-red-500">{error}</div> : <></>}
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
