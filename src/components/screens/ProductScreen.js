import React, { useEffect, useState } from "react";
// import products from "../../products";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../Rating";
import Loader from "../Loader";
import Message from "./Message";

const ProductScreen = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  console.log(productDetails);
  const { error, loading, product } = productDetails;
  console.log(product);

  useEffect(() => {
    dispatch(listProductDetails(id.id));
  }, [dispatch]);

  // let product = {}
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>price: {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flusg">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock == 0}
                      >
                        Add to Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
