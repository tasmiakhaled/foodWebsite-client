import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Col, Container, Row } from 'reactstrap';
import ProductCard from '../components/UI/product-card/ProductCard';

const AllFoods = () => {

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/foods')
      .then(res => res.json())
      .then(product => setAllProducts(product))
  }, []);

  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          <Row>
            {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};


export default AllFoods