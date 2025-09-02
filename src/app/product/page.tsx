'use client'
import React from 'react'
import { ProductComponent } from '@/shadcncomponent/product-form'
const page = () => {
  return (
   

    <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-lg mt-25">
                <ProductComponent/>
              </div>
            </div>
  )
}

export default page