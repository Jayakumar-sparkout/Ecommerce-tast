import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { GalleryVerticalEnd } from "lucide-react"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ProfileForm } from "@/components/ProfileEdit"

export default function page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 z-ndex-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        
        <div className="flex justify-center gap-2 md:justify-center mt-10 ">
             
             <Avatar className='item-center text-center mt-10 flex justify-center '>
           <AvatarImage src="https://github.com/leerob.png" alt="@leerob" className='flex justify-center text-center item-center '/>
         <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        
        </div>
        <div className="flex flex-1 items-center justify-center">
            <ProfileForm />
          </div>
      
      </div>
     
        <div className="flex flex-1 items-center justify-center-40">
        <img
          src='/edit1.jpg'
          alt="Image"
                />
      </div>
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale item-center text-center ml-150">
        
     
       
      </div>
    </div>
  )
}
