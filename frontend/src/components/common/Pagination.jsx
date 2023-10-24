import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const Pagination = ({
    pageCount,
    perPage,
    currentPage,
    handleChangePage,
    pageRange = 5,
    total,
    to,
}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-start text-base font-light text-zinc-500">
                <span>{`Page ${
                    currentPage + 1
                }/${pageCount}. ${perPage} items per page. Total ${to}/${total} items.`}</span>
            </div>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handleChangePage}
                pageRangeDisplayed={pageRange}
                previousLabel={
                    <span className="rounded-md w-15 h-10 p-2 flex gap-1 items-center justify-center bg-slate-50 text-zinc-700 hover:bg-indigo-500 hover:text-white transition-all ease-linear">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <p className="text-lg">Previous</p>
                    </span>
                }
                nextLabel={
                    <span className="rounded-md w-15 h-10 p-2 flex gap-1 items-center justify-center bg-slate-50 text-zinc-700 hover:bg-indigo-500 hover:text-white transition-all ease-linear">
                        <p className="text-lg">Next</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                }
                containerClassName="flex items-center justify-center gap-3"
                pageClassName="w-10 h-10 flex rounded-full overflow-hidden items-center justify-center text-lg bg-slate-50 text-zinc-700 hover:bg-indigo-500 hover:text-white transition-all ease-linear"
                activeClassName="active"
            />
        </div>
    );
};

Pagination.propTypes = {
    pageCount: PropTypes.number,
    perPage: PropTypes.number,
    currentPage: PropTypes.number,
    handleChangePage: PropTypes.func,
    pageRange: PropTypes.number,
    total: PropTypes.number,
    to: PropTypes.number,
};

export default Pagination;
