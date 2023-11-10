import PropTypes from "prop-types";

const Table = ({ headers = [], data = [] }) => {
    return (
        <div className="w-full overflow-visible shadow-md">
            <table className="w-full text-left text-xl text-gray-500">
                <thead className="border-b bg-gray-50 text-lg uppercase text-gray-700">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={"row-" + index} className="border-b bg-white hover:bg-gray-50">
                            {Object.keys(item).map((key, index) => (
                                <td key={`item-${index}-$key`} className="px-6 py-4">
                                    {item[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
