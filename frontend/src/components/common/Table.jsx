import PropTypes from "prop-types";

const Table = ({ headers = [], data = [] }) => {
    return (
        <div className="relative overflow-x-auto shadow-md w-full">
            <table className="w-full text-xl text-left text-gray-500">
                <thead className="text-lg text-gray-700 uppercase bg-gray-50 border-b">
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
                        <tr
                            key={"row-" + index}
                            className="bg-white border-b hover:bg-gray-50"
                        >
                            {Object.keys(item).map((key, index) => (
                                <td
                                    key={`item-${index}-$key`}
                                    className="px-6 py-4"
                                >
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
