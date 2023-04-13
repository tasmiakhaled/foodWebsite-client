import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

const FoodDetails = () => {

    const [tab, setTab] = useState("desc");
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [reviewMsg, setReviewMsg] = useState("");
    const [foodInfo, setFoodInfo] = useState([]);

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://localhost:5000/foods/${id}`)
            .then(res => res.json())
            .then(foodInfo => setFoodInfo(foodInfo))
            .catch(error => console.error(error))
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(enteredName, enteredEmail, reviewMsg);
    };

    const addToCart = () => {
        dispatch(
          cartActions.addItem({
            id,
            // title,
            // image01,
            // price,
          })
        );
      };
    

    return (
        <Helmet title="Product-details">
            <CommonSection title={foodInfo.title} />
            <section>
                <Container>
                    <Row>
                        <Col lg="4" md="4">
                            <div className="product__main-img">
                                <img src={foodInfo.image01} alt="" className="w-100" />
                            </div>
                        </Col>
                        <Col lg="6" md="6">
                            <div className="single__product-content">
                                <h2 className="product__title mb-3">{foodInfo.title}</h2>
                                <p className="product__price">
                                    {" "}
                                    Price: <span>${foodInfo.price}</span>
                                </p>
                                <p className="category mb-5">
                                    Category: <span>{foodInfo.category}</span>
                                </p>

                                <button onClick={addToCart} className="addTOCart__btn">
                                    Add to Cart
                                </button>
                            </div>
                        </Col>

                        <Col lg="12">
                            <div className="tabs d-flex align-items-center gap-5 py-3">
                                <h6
                                    className={` ${tab === "desc" ? "tab__active" : ""}`}
                                    onClick={() => setTab("desc")}
                                >
                                    Description
                                </h6>
                                <h6
                                    className={` ${tab === "rev" ? "tab__active" : ""}`}
                                    onClick={() => setTab("rev")}
                                >
                                    Review
                                </h6>
                            </div>

                            {tab === "desc" ? (
                                <div className="tab__content">
                                    <p>{foodInfo.desc}</p>
                                </div>
                            ) : (
                                <div className="tab__form mb-3">
                                    <div className="review pt-5">
                                        <p className="user__name mb-0">Jhon Doe</p>
                                        <p className="user__email">jhon1@gmail.com</p>
                                        <p className="feedback__text">great product</p>
                                    </div>

                                    <div className="review">
                                        <p className="user__name mb-0">Jhon Doe</p>
                                        <p className="user__email">jhon1@gmail.com</p>
                                        <p className="feedback__text">great product</p>
                                    </div>

                                    <div className="review">
                                        <p className="user__name mb-0">Jhon Doe</p>
                                        <p className="user__email">jhon1@gmail.com</p>
                                        <p className="feedback__text">great product</p>
                                    </div>
                                    <form className="form" onSubmit={submitHandler}>
                                        <div className="form__group">
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                onChange={(e) => setEnteredName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form__group">
                                            <input
                                                type="text"
                                                placeholder="Enter your email"
                                                onChange={(e) => setEnteredEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form__group">
                                            <textarea
                                                rows={5}
                                                type="text"
                                                placeholder="Write your review"
                                                onChange={(e) => setReviewMsg(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button type="submit" className="addTOCart__btn">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default FoodDetails;