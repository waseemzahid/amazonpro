'use client'
import { useDispatch, useSelector } from 'react-redux'
import { ProductType, StateProps } from '../../type'
import { X } from 'lucide-react'
import { addToCart, deleteFavorite, resetFavorite } from '@/redux/proSlice'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'
import FormattedPrice from './FormattedPrice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { calculatePercentage } from '@/helpers'

const Wishlist = () => {
  const { favoriteData } = useSelector((state: StateProps) => state.pro)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleReset = () => {
    Swal.fire({
      text: 'Are you sure you want to reset your Favorite?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FCB900',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetFavorite())
        toast.success('Favorite Reset Successfully')
        router.push('/')
      }
    })
  }

  const handleAddToCart = (item: ProductType) => {
    dispatch(addToCart(item))
    dispatch(deleteFavorite(item._id)) // Remove the item from the wishlist
    toast.success(`${item.title} is added to Cart!`)
  }

  return (
    <>
      {favoriteData.length > 0 ? (
        <div className="mt-5 flex flex-col">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-zinc-950">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Saving
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {favoriteData.map((item: ProductType) => (
                <tbody key={item._id}>
                  <tr className="bg-white border-b-[1px] border-b-zinc-300">
                    <th
                      scope="row"
                      className="px-6 py-4 flex items-center gap-3"
                    >
                      <X
                        onClick={() => {
                          dispatch(deleteFavorite(item._id)),
                            toast.success(
                              `${item.title} is removed from Wishlist!`
                            )
                        }}
                        className="w-4 h-4 hover:text-designColor cursor-pointer duration-200"
                      />
                      <Image
                        src={item.image}
                        alt="product image"
                        width={500}
                        height={500}
                        className="lg:w-24 object-contain w-12"
                      />
                      <p className="lg:text-base font-medium text-black">
                        {item.title}
                      </p>
                    </th>
                    <td className="px-6 py-4">
                      <FormattedPrice className="" amount={item.price} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="bg-designColor w-20 text-sm font-semibold text-center text-white py-1 rounded-md">
                        {calculatePercentage(item.price, item.previousPrice)} %
                        save
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleAddToCart(item)} // Call handleAddToCart
                        className="bg-designColor lg:w-36 w-28 lg:py-3 py-2 lg:mt-2 rounded-md uppercase text-sm font-semibold hover:bg-zinc-950 hover:text-white duration-200"
                      >
                        Add to cart
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <button
            onClick={handleReset}
            className="bg-designColor w-36 py-3 mt-5 rounded-md uppercase text-sm font-semibold hover:bg-zinc-950 hover:text-white duration-200"
          >
            Reset Favorite
          </button>
        </div>
      ) : (
        <div className="py-10 flex flex-col gap-1 items-center justify-center">
          <p className="text-lg font-bold">Your Wishlist is Empty</p>
          <Link
            href={'/'}
            className="text-sm uppercase font-semibold underline underline-offset-2 hover:text-designColor duration-200 cursor-pointer"
          >
            Go back to Shopping
          </Link>
        </div>
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
          },
        }}
      />
    </>
  )
}

export default Wishlist
