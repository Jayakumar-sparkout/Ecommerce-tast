'use client'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { makeStore,RootState } from "@/redux/store"
import { AppStore,AppDispatch } from "@/redux/store";
import { setUploadName,setProItem } from "@/slice/loginslice";
import Link from "next/link"
import { useDispatch,useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];

import { useEffect, useState } from "react"
export  function ProductCard() {
    const [userImage,setUserImage] = useState<string|undefined>();
    const [selector,setSelector] = useState<string|undefined>();
    const [reLoading,setReLoading] = useState<boolean>(true);
    const [countItem,setCountItem]=useState<number|null>(1)
    const dispatch = useDispatch()
    const router = useRouter()

    const selector1 = useSelector((state:RootState)=> state.imageName.UpLoadImage)

    const selectName = useSelector((state:RootState)=> state.imageProName.proName)
    const selectPrice = useSelector((state:RootState)=> state.imagePrice.proPrice)
    const selectOffer = useSelector((state:RootState)=> state.imageOffer.proOffer)
    const selectRating = useSelector((state:RootState)=> state.imageRating.prorRating)
    
  
useEffect(()=>{
  setUserImage(selector1)
},[selector1])

useEffect(()=>{
const data = localStorage.getItem('proImage')
 setSelector(data)
 dispatch(setUploadName(data))
},[userImage])

const handleCard = (e:any)=>{
   console.log('counItem',countItem)
   setReLoading(false)
   setTimeout(()=>{
    router.push('/payment')
    setReLoading(true)
     dispatch(setProItem(countItem))
   //console.log('counItem',countItem)
   },4000)
}
  return (
    <div className="grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12">
      <div className="grid gap-4 items-start mt-20 ">
        <div className="flex md:hidden items-start">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
          </div>
        
          {/* <div className="text-4xl font-bold ml-auto">
            Price:$99
            </div> */}
        </div>
            
        <form className="grid gap-4 md:gap-10">
            <div className="text-4xl font-bold ">
                Product Details</div>
              <div className="text-2xl font-bold ">
                ProductName: <label  className="text-xl ">{selectName}</label></div>
              <div className="text-2xl font-bold ">
                Price: $<label  className="text-xl ">{selectPrice}</label></div>
                <div className="text-2xl font-bold ">
                Offer: <label  className="text-xl ">{selectOffer}</label>%</div>
                <div className="text-2xl font-bold ">
                Rating: <label  className="text-xl ">{selectRating}</label></div>
          <div className="grid gap-2">
            <Label htmlFor="color" className="text-base">
              Color
            </Label>
            <RadioGroup id="color" defaultValue="black" className="flex items-center gap-2">
              <Label
                htmlFor="color-black"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              >
                <RadioGroupItem id="color-black" value="black" />
                Black
              </Label>
              <Label
                htmlFor="color-white"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              >
                <RadioGroupItem id="color-white" value="white" />
                White
              </Label>
              <Label
                htmlFor="color-blue"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              >
                <RadioGroupItem id="color-blue" value="blue" />
                Blue
              </Label>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-base">
              Quantity
            </Label>
            <Select value={countItem}
            onValueChange={(value)=> setCountItem(value)}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent defaultValue='1' aria-placeholder="Choose Item"
              >
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {reLoading && (
          <Button size="lg"
          className="cursor-pointer"
          onClick={(e)=>
            handleCard(e)

            
          }
          >Add to cart</Button>
          )}
          {reLoading===false && (
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                  {variants.map((variant) => (
                    <div
                      className="flex flex-col items-center justify-center gap-2"
                      key={variant}
                    >
                      <Spinner variant={variant} />
                      <span>please wait..</span>
                    </div>
                  ))}
                </div>
          )}
        </form>
        <Separator className="border-gray-200 dark:border-gray-800" />
        <div className="grid gap-4 text-sm leading-loose">
          <p>
            Introducing the Acme Prism T-Shirt, a perfect blend of style and comfort for the modern individual. This tee
            is crafted with a meticulous composition of 60% combed ringspun cotton and 40% polyester jersey, ensuring a
            soft and breathable fabric that feels gentle against the skin.
          </p>
          <p>
            The design of the Acme Prism T-Shirt is as striking as it is comfortable. The shirt features a unique
            prism-inspired pattern that adds a modern and eye-catching touch to your ensemble.
          </p>
        </div>
      </div>
      <div className="grid gap-3 items-start mt-20">
        {/* <div className="hidden md:flex gap-4 items-start">
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              src="/placeholder.svg"
              alt="Preview "
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 1</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              src={selector}
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 2</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              src="/placeholder.svg"
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 3</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              src="/placeholder.svg"
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 4</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              src="/placeholder.svg"
              alt="Preview thumbnail"
              width={100}
              height={100}
              className="aspect-square object-cover"
            />
            <span className="sr-only">View Image 4</span>
          </button>
        </div> */}
        <div className="grid gap-4 md:gap-10 text-center item-center">
          <img
            src={selector}
            alt="Product Image"
            width={600}
            height={600}
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
          />
          <div className="flex md:hidden items-start">
            {/*<button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 1</span>
            </button>
            * <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 2</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 3</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 4</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 4</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}