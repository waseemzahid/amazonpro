'use client'
import Link from 'next/link'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import { navigation } from '@/constants/data'
import { Heart, ShoppingBagIcon } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { StateProps } from '../../type'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const pathname = usePathname()
  const { data: session } = useSession()

  const { productData, favoriteData } = useSelector(
    (state: StateProps) => state.pro
  )
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="w-full h-20 border-b-[1px] border-b-zinc-500 bg-white text-zinc-600 sticky top-0 z-50 bg-white/80 backdrop-blur-2xl">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 xl:px-0">
        {/* Logo */}
        <Logo />
        
        {/* Navigation */}
        <ul
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:flex items-center gap-5 text-sm uppercase font-semibold menu`}
        >
          {navigation.map((item) => (
            <Link href={item?.href} key={item._id}>
              <li
                className={`hover:text-designColor cursor-pointer duration-200 relative overflow-hidden group ${
                  item.href === pathname && 'text-designColor'
                }`}
                onClick={() => setMobileMenuOpen(false)} // Close mobile menu on item click
              >
                {item?.title}
                <span
                  className={`absolute h-[1px] w-full bg-designColor left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500 ${
                    item.href === pathname && 'translate-x-0 bg-designColor'
                  }`}
                />
              </li>
            </Link>
          ))}
        </ul>
        {/* icons */}
        <div className="flex items-center gap-x-5">
          <Link
            href={'/wishlist'}
            className="hover:text-black cursor-pointer duration-200 relative group"
          >
            <Heart className="w-7 h-7" />
            <span className="absolute top-0 -left-1 bg-designColor text-white w-4 h-4 rounded-full text-xs flex items-center justify-center group-hover:bg-designColor font-semibold group-hover:text-white">
              {favoriteData ? favoriteData.length : 0}
            </span>
          </Link>
          <Link
            href={'/cart'}
            className="hover:text-black cursor-pointer duration-200 relative group"
          >
            <ShoppingBagIcon className="w-7 h-7" />
            <span className="absolute top-0 -left-1 bg-designColor text-white w-4 h-4 rounded-full text-xs flex items-center justify-center group-hover:bg-designColor font-semibold group-hover:text-white">
              {productData ? productData.length : 0}
            </span>
          </Link>
          {session ? (
            <Link
              href={'/profile'}
              className="hover:text-designColor cursor-pointer duration-200 relative overflow-hidden group text-sm uppercase font-semibold"
            >
              {session?.user?.name}
              <span className="absolute h-[1px] w-full bg-designColor left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
          ) : (
            <button
              onClick={() => signIn()}
              className="hover:text-designColor cursor-pointer duration-200 relative overflow-hidden group text-sm uppercase font-semibold"
            >
              Login
              <span className="absolute h-[1px] w-full bg-designColor left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          )}
        </div>
        {/* Mobile Menu Toggle */}
        <div className="md:hidden cursor-pointer" onClick={toggleMobileMenu}>
        <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-8 w-8"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#FCB900"
>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16m-7 6h7'
              }
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Navbar
