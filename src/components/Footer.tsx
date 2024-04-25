import React from 'react'
import Container from './Container'
import Logo from './Logo'
import { navigation } from '@/constants/data'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="bg-[#180735] mt-10 py-10 text-zinc-300 mobile-header">
      <Container className="lg:flex items-center sm-flex-col justify-between container-mobile">
        <Logo className="text-white" spanClassName="bg-white text-black mb-8" />
        <ul className="flex gap-6 items-center justify-center menu-items-mobile">
          {navigation.map((item) => (
            <Link href={item?.href} key={item?._id}>
              <li className="hover:text-designColor duration-200">{item?.title}</li>
            </Link>
          ))}
        </ul>
        <p className="developed-by-mobile">Developed by: <span className="text-designColor font-semibold">Waseem Zahid</span></p>
      </Container>
    </div>
  )
}

export default Footer
