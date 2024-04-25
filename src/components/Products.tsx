'use client';
import React, { useState, useEffect } from 'react';
import Container from './Container';
import { BookmarkCheck, PcCase, ScanFace, Smartphone, Watch } from 'lucide-react';
import Product from './Product';
import { getProducts, getPhones, getPhoneCases, getWatches, getAccessories } from '@/helpers';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products when component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async (category = null) => {
    let fetchedProducts = [];

      switch (category) {
          case 'all':
              fetchedProducts = await getProducts();
              break;
          case 'phones':
              fetchedProducts = await getPhones();
              break;
          case 'phonecases':
              fetchedProducts = await getPhoneCases();
              break;
          case 'watches':
              fetchedProducts = await getWatches();
              break;
          case 'accessories':
              fetchedProducts = await getAccessories();
              break;
          default:
              fetchedProducts = await getProducts();
              break;
      }

    setProducts(fetchedProducts);
    setSelectedCategory(category);
  };

  return (
    <div className='lg:mt-10 lg:mb-30'>
      <Container>
        <div className="flex flex-col gap-2 items-center">
          <h2 className="lg:text-3xl font-semibold text-xl">Choose a category</h2>
          <p className="lg:text-lg text-center text-sm">
            Explore dozens of customized layouts made by our brilliant
            designers.
          </p>
          <div className="text-zinc-500 flex items-center gap-1 lg:gap-6 mt-5">
          <div onClick={() => fetchProducts('all')} className={`flex items-center gap-1 lg:gap-2 hover:text-designColor cursor-pointer duration-200 ${selectedCategory === 'all' ? 'text-designColor' : ''}`}>
              <BookmarkCheck />
              <p className='text-sm lg:text-lg'>All</p>
            </div>
            <div className="h-7 w-[1px] bg-designColor inline-flex" />
            <div onClick={() => fetchProducts('watches')} className={`flex items-center gap-1 lg:gap-2 hover:text-designColor cursor-pointer duration-200 ${selectedCategory === 'watches' ? 'text-designColor' : ''}`}>
              <Watch />
              <p className='text-sm lg:text-lg'>Watches</p>
            </div>
            <div className="h-7 w-[1px] bg-designColor inline-flex" />
            <div onClick={() => fetchProducts('phones')} className={`flex items-center gap-1 lg:gap-2 hover:text-designColor cursor-pointer duration-200 ${selectedCategory === 'phones' ? 'text-designColor' : ''}`}>
              <Smartphone />
              <p className='text-sm lg:text-lg'>Phone</p>
            </div>
            <div className="h-7 w-[1px] bg-designColor inline-flex" />
            <div onClick={() => fetchProducts('phonecases')} className={`flex items-center gap-1 lg:gap-2 hover:text-designColor cursor-pointer duration-200 ${selectedCategory === 'phonecases' ? 'text-designColor' : ''}`}>
              <PcCase />
              <p className='text-sm lg:text-lg'>Phone Case</p>
            </div>
            <div className="h-7 w-[1px] bg-designColor inline-flex" />
            
            <div onClick={() => fetchProducts('accessories')} className={`flex items-center gap-1 lg:gap-2 hover:text-designColor cursor-pointer duration-200 ${selectedCategory === 'accessories' ? 'text-designColor' : ''}`}>
              <ScanFace />
              <p className='text-sm lg:text-lg'>Accessories</p>
            </div>
          </div>
        </div>
        <Product products={products} />
      </Container>
    </div>
  );
};

export default Products;
