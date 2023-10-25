import PropTypes from "prop-types";

const Select = ({
    name,
    label,
    required = false,
    id,
    titles,
    values,
    multiple = false,
    onchange,
    style,
}) => {
    return (
        <div className={`flex w-fit flex-col items-start gap-2.5 p-0 text-lg ${style}`}>
            <label htmlFor={id} className="text-xl font-medium">
                {label} {required ? <span className="text-red-600">*</span> : <></>}
            </label>
            <select
                name={name}
                id={id}
                multiple={multiple}
                required={required}
                className="w-full appearance-none rounded p-3 text-lg outline-none"
                onChange={onchange}
            >
                <option defaultChecked value="">
                    Select me
                </option>
                {titles.map((title, i) => (
                    <option key={i} value={values[i]}>
                        {title}
                    </option>
                ))}
            </select>
        </div>
    );
};

Select.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    id: PropTypes.string,
    titles: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    multiple: PropTypes.bool,
    onchange: PropTypes.func,
    style: PropTypes.string,
};

export default Select;
