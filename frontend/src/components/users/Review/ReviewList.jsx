import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";
import Textarea from "../../common/Textarea";
import Button from "../../common/Button";
import ReactStars from "react-rating-star-with-type";
import ReviewService from "../../../services/ReviewService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../common/Pagination";

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const handleSendReview = () => {
        ReviewService.insert({ review: review, ratings: rating, product_id: id })
            .then((response) => {
                console.log(response);
                setReview("");
                setRating(0);
                setReviews((prev) => [response.data, ...prev]);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    };

    useEffect(() => {
        const fetchData = () => {
            ReviewService.product(currentPage, id)
                .then((response) => {
                    setReviews(response.data.data);
                    setPagination(response.data.meta);
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        };

        fetchData();
    }, [id, currentPage]);

    return (
        <div className="flex h-fit w-full flex-col items-start justify-start gap-3">
            <div className="flex h-fit w-full flex-col gap-2">
                <Textarea onchange={(e) => setReview(e.target.value)} value={review} rows={5} />
                <ReactStars
                    onChange={(value) => setRating(value)}
                    value={rating}
                    activeColors={["#FFCE00", "#FFCE00", "#FFCE00", "#FFCE00", "#FFCE00"]}
                    size={24}
                    isEdit={true}
                />
                <Button variant={"info"} title="Send review" onclick={handleSendReview} />
            </div>
            <div className="flex h-fit w-full flex-row items-center justify-start gap-3 border-b-2 border-b-orange-400 text-lg text-orange-400">
                <span>Average rating</span>
                <p>
                    <span>
                        {reviews.reduce(
                            (prev, value, index) => prev + (value.ratings - prev) / (index + 1),
                            0,
                        )}
                    </span>
                    <FontAwesomeIcon icon={faStar} className="text-amber-300" />
                </p>
            </div>
            <div className="flex h-fit w-full flex-col items-start justify-start gap-3">
                {reviews.map((value, index) => (
                    <Review
                        key={index}
                        rating={value.ratings}
                        review={value.review}
                        userImage={value.user?.avatar ? value.user.avatar : "/user.png"}
                        userName={value.user?.name}
                        date={value.createdAt}
                    />
                ))}
            </div>
            {Object.keys(pagination).length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                    pageCount={pagination.last_page}
                    perPage={pagination.per_page}
                    total={pagination.total}
                    to={pagination.to}
                    variant="user"
                />
            )}
        </div>
    );
};

export default ReviewList;
