'use client';
import React, { useState, useEffect } from 'react';
import Container from './Container';
import Product from './Product';

const Products = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className='lg:mt-10 lg:mb-30'>
      <Container>
        <Product products={products} />
      </Container>
    </div>
  );
};

export default Products;
