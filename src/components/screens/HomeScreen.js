import React from "react";
import products from "../../products";
import { Col, Row } from "react-bootstrap";
import Product from "../Product";

const HomeScreen = () => {
  return (
    <div>
      <h1>Latest products</h1>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
