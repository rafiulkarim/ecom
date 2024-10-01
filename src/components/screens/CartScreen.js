import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "./Message";
import { addToCart } from "../../actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get("qty");
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return <div>CartScreen</div>;
};

export default CartScreen;
