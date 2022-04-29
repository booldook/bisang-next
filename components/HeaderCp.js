import Link from 'next/link'
import React from 'react'

const HeaderCp = () => {
  return (
    <div>
      <Link href="/about">About</Link>
      <Link href="/shop/product">Product</Link>
      <Link href="/post">Post</Link>
    </div>
  )
}

export default HeaderCp