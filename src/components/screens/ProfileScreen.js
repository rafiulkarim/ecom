import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import Loader from "../Loader";
import Message from "./Message";
import { registration, getUserDetails } from "../../actions/userActions";
import FormContainer from "./FormContainer";

const ProfileScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPaeeword] = useState();
  const [confirmPassword, setConfirmPaeeword] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.username) {
        dispatch(getUserDetails("profile"));
      } else {
        setEmail(user.email);
        setName(user.username);
      }
    }
  }, [navigate, userInfo, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(registration(name, email, password));
    }
  };

  return (
    <div>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPaeeword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPaeeword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={3}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScreen;
