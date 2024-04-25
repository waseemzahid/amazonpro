import Container from '@/components/Container'
import Title from '@/components/Title'
import Wishlist from '@/components/Wishlist'
import React from 'react'

const WishlistPage = () => {
  return (
    <Container>
      <Title title='Your Wishlist' />
      <Wishlist />
    </Container>
  )
}

export default WishlistPage