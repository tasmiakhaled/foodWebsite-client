import React from 'react'

const Reviews = (props) => {

    const { reviewData } = props;

    const {name , review , image} = reviewData

    return (
        <div className="review pt-5">
            <p className="user__name mb-0">{name}</p>
            <p className="feedback__text">{review}</p>
            <img src={image} alt="" className="w-50" />
        </div>

    )
}

export default Reviews