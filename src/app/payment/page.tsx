import React from 'react'
import { CardPaymentMethod } from '@/components/payment-method-01'
const page = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-lg mt-25">
        <CardPaymentMethod/>
        </div>
    </div>
  )
}

export default page