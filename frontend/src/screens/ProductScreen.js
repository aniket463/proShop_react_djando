import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Button, Card, Image, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import axios from "axios";

function ProductScreen({ match,history }) {
  const [qty, setQty] = useState(1)


  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // const product = products.find((p) => p._id === match.params.id);
  // const [product, setProduct] = useState([]);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));

    // async function fetchProducts() {
    //   const { data } = await axios.get(`/api/products/${match.params.id}`);
    //   setProduct(data);
    // }
    // fetchProducts();
  }, [dispatch,match]);

  //Add to card functionality
  const addToCardHandler = ()=>{
    console.log('Add to card',match.params.id)
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
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

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup>
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
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xm='auto' className="my-1">
                      <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                        {
                          [...Array(product.countInStock).keys()].map((x)=>(
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))
                        }
                      </Form.Control>
                      </Col>
                    </Row>

                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                  onClick={addToCardHandler}
                    style={{ width: "100%" }}
                    disabled={product.countInStock === 0}
                    className="btn btn-block"
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
