'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { makeStore,RootState } from "@/redux/store"
import { AppStore,AppDispatch } from "@/redux/store";
import { UseSelector,useDispatch, useSelector } from "react-redux";
import { setProOffer,setProItem,setPayment } from "@/slice/loginslice";
import { Icons } from "./icons";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export  function CardPaymentMethod() {
  const [paymentName,setPaymentName] = useState<string|undefined>('paypal')
  const [city,setCity] = useState<string|undefined>()
  const [cardNo,setCardNo]=useState<Number|null>()
  const [countErr,setCountErr]=useState<boolean>();
  const [month,setMonth]=useState<string|undefined>()
  const [year,setYear]=useState<number|null>()
  const [cvc,setCvc] =useState<number|null>()
  const [cvcErr,setCvcErr]=useState<boolean>(false)
  const [regLoading,setReLoading]=useState<boolean>(true)
  const router = useRouter()
  const dispatch =useDispatch()
  //redux
  const payProName = useSelector((state:RootState)=> state.imageName.proName)
  const payProPrice = useSelector((state:RootState)=> state.imagePrice.proPrice)
  const payProItem = useSelector((state:RootState)=> state.imageCount.proCountItem)
  const payProOffer = useSelector((state:RootState)=> state.imageOffer.proOffer)


   const item = payProItem
    const price = payProPrice
    let finalPrice;

    const finalTotal = item*price
    const percent = (finalTotal*payProOffer)/100
    finalPrice=finalTotal-percent
   dispatch(setPayment(finalPrice))
 
   return (
    <div>
    <Card className="w-full md:w-[450px]  ">
      <div className="flex flex-col items-center gap-2 text-center">
        <img src="/FlipKart-Logo.jpg" alt="Flipkart Logo" width={80} className="cursor-pointer" />
      </div>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name: <p>{payProName}</p></Label>
          
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price Amount: <p>${payProPrice}</p></Label>
          
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Product Offer: <p>${payProOffer}</p></Label>
          
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Product CountItem: <p>${payProItem}</p></Label>
          
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">CalculatePrice: <p>{payProPrice}*{payProItem}/{payProOffer}</p></Label>
          
        </div>
        <div className="grid gap-2">
         <Label htmlFor="total">FinalPrice: $<p>{finalPrice}</p></Label>
        </div>

        <RadioGroup defaultValue={paymentName} className="grid grid-cols-3 gap-4" onClick={(e)=>{
           setPaymentName(e.target.value)
        }}>
          <div>
            <RadioGroupItem value="Card" id="card" className="peer sr-only" aria-label="Card" />
            <Label
              htmlFor="card"
              className="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4">
              <Icons.card className="mb-3 size-6" />
              Card
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="Paypal"
              id="paypal"
              className="peer sr-only"
              aria-label="Paypal"
            />
            <Label
              htmlFor="paypal"
              className="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4">
              <Icons.paypal className="mb-3 size-6" />
              Paypal
            </Label>
          </div>

          <div>
            <RadioGroupItem value="Apple" id="apple" className="peer sr-only" aria-label="Apple" />
            <Label
              htmlFor="apple"
              className="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4">
              <Icons.apple className="mb-3 size-6" />
              Apple
            </Label>
          </div>
        </RadioGroup>
        <div className="grid gap-2">
          <Label htmlFor="name">Name on the card</Label>
          <Input id="name" value={paymentName} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="Enter Your City"
          value={city}
          onChange={(e)=> setCity(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Card number</Label>
          <Input id="number" type="number" placeholder="Enter Card Number" 
          value={cardNo}
          onChange={(e)=> {
            const count = e.target.value;
            setCardNo(count)
            if( count.length<15 || count.length>15){
              setCountErr(true)
            }else{
              setCountErr(false)
            }
          }
        }
        required
          />
          {countErr==true&&(
            <label className="text-red-500">Enter the Valid CardNumber</label>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <div className="grid gap-2">
            <Label htmlFor="month">Expires</Label>
            <Select>
              <SelectTrigger className="w-full" id="month" aria-label="Month">
                <SelectValue placeholder="Month" defaultValue={month}
                onClick={(e)=> setMonth(e.target.value)}
                 />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select  value={year} onValueChange={(value)=> setYear(value)}>
              <SelectTrigger className="w-full" id="year" aria-label="Year">
                <SelectValue/>
  
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC"
            value={cvc??''}
            onChange={(e)=>{
              const check = e.target.value;
              setCvc(check)
              if( check.length<5){
                setCvcErr(false)
              }else{
                setCvcErr(true)
              }
            }} 
            required
            />
            
          </div>
          {cvcErr&&(
               <label className="text-red-500 text-center items-center text-g">Enter Valid CVC Digits</label>
            )}
        </div>
      </CardContent>
      <CardFooter>
      {regLoading && (

        <Button className="w-full cursor-pointer" 
        onClick={(e)=>{
          setReLoading(false)
          setTimeout(()=>{
            setReLoading(true)
            router.push('/paymentSuccess')
          },4000)
        }}
        disabled={!city || !cardNo || cvcErr || !cvc || countErr || !payProName || !payProOffer || !payProPrice||!payProItem}>Continue
        </Button>
      )}
        {!regLoading && (
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
      </CardFooter>
    </Card>
     </div>
  );
}
