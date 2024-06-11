import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { useCanUserReviewQuery, useSubmitReviewMutation } from '../../redux/api/productsApi';
import toast from 'react-hot-toast';

const NewReview = ({ productId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [submitReview, { isLoading, error, isSuccess }] = useSubmitReviewMutation();
    const { data } = useCanUserReviewQuery(productId);
    const canReview = data?.canReview;

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }

        if (isSuccess) {
            toast.success("Review Posted");
            setRating(0);
            setComment('');
        }
    }, [error, isSuccess]);

    const submitHandler = () => {
        const reviewData = { rating, comment, productId };
        submitReview(reviewData);
    };

    return (
        <div>
            {canReview && (
                <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                >
                    Submit Your Review
                </button>
            )}

            <div className="row mt-2 mb-5">
                <div className="rating w-50">
                    <div
                        className="modal fade"
                        id="ratingModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="ratingModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ratingModalLabel">
                                        Submit Review
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="#ffb829"
                                        numberOfStars={5}
                                        name="rating"
                                        changeRating={(newRating) => setRating(newRating)}
                                    />

                                    <textarea
                                        name="review"
                                        id="review"
                                        className="form-control mt-4"
                                        placeholder="Enter your comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>

                                    <button
                                        id="new_review_btn"
                                        className="btn w-100 my-4 px-4"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={submitHandler}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewReview;
