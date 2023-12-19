import PropTypes from "prop-types";
import Image from "../../common/Image";
import ReactStars from "react-rating-star-with-type";

const Review = ({ userImage = "", userName = "", rating = 0, review = "", date }) => {
    return (
        <div className="flex h-fit w-full flex-row gap-3">
            <div className="flex flex-col gap-1">
                <Image src={userImage ? userImage : "/user.png"} style={"w-12 h-12 rounded"} />
            </div>
            <div className="flex grow flex-col gap-2 text-base">
                <p className="text-sm font-bold">
                    {userName} -{" "}
                    <span className="font-normal">
                        {new Date(date).toISOString().slice(0, 19).replace("T", " ")}
                    </span>
                </p>
                <p className="w-full break-words rounded-md bg-slate-100 px-5 py-3">{review}</p>
                <ReactStars
                    value={rating}
                    activeColors={["#FFCE00", "#FFCE00", "#FFCE00", "#FFCE00", "#FFCE00"]}
                />
            </div>
        </div>
    );
};

Review.propTypes = {
    userImage: PropTypes.string,
    userName: PropTypes.string,
    rating: PropTypes.number,
    review: PropTypes.string,
    date: PropTypes.string,
};

export default Review;
