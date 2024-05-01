'use client'
import { getProducts } from '@/helpers'
import { ProductType } from '../../../type'
import Container from '@/components/Container'
import Image from 'next/image'
import FormattedPrice from '@/components/FormattedPrice'
import { Toaster } from 'react-hot-toast'
import AddCart from '@/components/AddCart'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const page = async ({ searchParams }: Props) => {
  const products = await getProducts()
  const _idString = searchParams?._id
  const _id = Number(_idString)
  
  const singleProduct = (_id: number) => {
    const item = products.find((product: ProductType) => product._id === _id)
    return item
  }
  const product = singleProduct(_id)
  console.log(product);
  return (
    <Container className="flex items-center flex-col md:flex-row px-4 xl:px-0">
      <div className="w-full md:w-1/2 overflow-hidden flex items-center justify-center p-10">
        <Image
          src={product?.image}
          alt="product image"
          width={500}
          height={500}
          className="transform transition-transform hover:scale-110 duration-500"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <button onClick={() => window.history.back()} className="text-designColor font-semibold mb-2 text-left">
          &larr; Back
        </button>
        {/* <Link className="text-designColor font-semibold mb-2 text-xl" href={'/'} >
          &larr; Back
        </Link> */}
        <h2 className="lg:text-3xl font-semibold uppercase text-xl">{product?.title}</h2>
        <p className="flex items-center gap-4">
        {/* <span className="text-designColor font-bold pr-2">New Price:</span> */}
        <FormattedPrice
            amount={product?.price}
            className="text-lg font-semibold"
          />
          {/* <span className="text-designColor font-bold pl-9 pr-2">Old Price:</span> */}
          <FormattedPrice
            amount={product?.previousPrice}
            className="text-zinc-500 line-through font-semibold"
          />
        </p>
        <p>
          You saved{' '}
          <span className="text-designColor font-bold">
            <FormattedPrice
              amount={product?.previousPrice - product?.price}
              className="text-base font-semibold"
            />
          </span>{' '}
          from this product.
        </p>

        <AddCart item={product} />
        
        {product?.isNew && (
          <p className="text-designColor font-semibold">New Arrival</p>
        )}
        <p>
          <span className='text-designColor font-semibold'>Brand: </span> 
          <span className="font-semibold capitalize">{product?.brand}</span>
        </p>
        <p>
          <span className='text-designColor font-semibold'>Category: </span> 
          <span className="font-semibold capitalize">{product?.category}</span>
        </p>
        <p>{product?.description}</p>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
          },
        }}
      />
    </Container>
  )
}

export default page
