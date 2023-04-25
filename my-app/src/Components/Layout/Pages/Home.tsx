import React from 'react'
import { MenuItemsList } from '../Page/MenuItems'
import { Banner } from '../Page/Common'

const Home = () => {
  return (
    <div className='img-fluid' >
      <Banner/>
        <div className='container p-2'>
            <MenuItemsList/>
        </div>
        </div>
  )
}

export default Home