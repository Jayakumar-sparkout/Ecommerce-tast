'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { File } from "node:buffer"
import { RootState,makeStore } from "@/redux/store"
import { setUserEmail,setUserLoginData } from "@/slice/loginslice"
import { useDispatch, UseDispatch,useSelector } from "react-redux"
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
export  function ProductComponent() {
    const [productName,setProductName] = useState<string|undefined>();
    const [description,setDescription] = useState<string|undefined>();
    const [price,setPrice]= useState<number|null>()
    const [selectFile,setSelectFile] = useState<File>()
   const [rating,setRating] = useState<string|undefined>()
   const [offer,setOffer] = useState<number|null>();
   const [comment,setComment]=useState<string|undefined>()
   const [selector,setSelector]=useState<string|undefined>()
   const [loginUserEmail,setLoginUserEmail]=useState<string|undefined>()
  const [regLoading,setRegLoading] =useState<boolean>(false);
  const [imageName,setImageName] = useState<string|undefined>()

   const selector1 = useSelector((state:RootState)=> state.userEmailDetails.loginEmail)

   const loginCheck = useSelector((state:RootState)=> state.userEmailDetails.loginEmail)
  
   const dispatch = useDispatch()
  useEffect(()=>{
    setLoginUserEmail(selector1)
  },[selector1])

  useEffect(()=>{
    const userData = localStorage.getItem("userEmail")
    setSelector(userData)
    dispatch(setUserEmail(userData))
  },[loginUserEmail])


  

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(`http://localhost:3000/${file.name}`); // store file name
     
    }
  };
 
    const handleProduct = async (e: any) => {
      setRegLoading(true)
  e.preventDefault();

  if (selector !== loginCheck) {
    toast.error("Your logged in with another email. Please check it.");
    setRegLoading(false)
    return;
  }



  try {

    const res = await fetch(
      `http://localhost:3001/users?email=${loginCheck}`
    );
    const users = await res.json();
     const newProducts = {
      Name:productName,
          Amount: price,
          Description: description,
          Offer: offer,
          Rating: rating,
          image:imageName
  }

 const updateProduct=[
  ...(users.products||[]),
  newProducts
 ]


    if (users.length === 0) {
      toast.error("Invalid user! Email or password incorrect.");
      setRegLoading(false)
      return;
    }

    const user = users[0]; 
    console.log("User to update:", user);

    const updateRes = await fetch(
      `http://localhost:3001/users/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products:updateProduct
      })
    }
    );

    if (!updateRes.ok) {
      console.log("Update failed!");
      setRegLoading(false)
    }
      const updatedUser = await updateRes.json();
    setTimeout(()=>{
      setRegLoading(false)
    console.log("Updated user:", updatedUser);
    setComment('')
    setRating()
    setProductName('')
    setDescription('')
    setOffer()
    setPrice()

    toast.success("Product upload  successfully!");
    },4000)
  } catch (error: any) {
    setTimeout(()=>{
      setRegLoading(false)
    toast.error("Error: ",error.message);
    console.log("Update error:", error.message);
    },4000)
  }
};

  return (
    <Card className="w-full max-w-2xl flex justify-center">
        <Toaster
      
        />
         <img src="/FlipKart-Logo.jpg" alt="Flipkart Logo" width={80} className="cursor-pointer ml-45" />
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Fill out the form to add a new product to your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" placeholder="Enter product name" 
            value={productName}
            onChange={(e)=> setProductName(e.target.value)}
            type="text"
            required
            name="name"
            
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description"
             placeholder="Enter product description"
             value={description}
             onChange={(e)=> setDescription(e.target.value)}
             name="description"
             required
              />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="Enter product price" 
            value={price??''}
            onChange={(e)=> setPrice(Number(e.target.value))}
            required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Product Image</Label>
            <Input id="image" type="file"  onChange={(e)=>handleImage(e)}
             />
          </div>
          <div className=" flex justify-between">
          <div className="grid gap-2 flex">
            <Label htmlFor="offer">Offer</Label>
            <Input id="offer" type="number" placeholder="Offer %" 
            className="w-30"
            value={offer??''}
            onChange={(e)=> setOffer(Number(e.target.value))}
            required
            />
            
          </div>

          <div className="grid gap-2 flex">
            <Label htmlFor="rating">Rating</Label>
            <Input id="rating" type="number" placeholder=" Rating"
            className="w-30" 
            value={rating??''}
            onChange={(e)=> setRating(Number(e.target.value))}
            required
            />
          </div>

          <div className="grid gap-2 flex">
            <Label htmlFor="comments">Comments</Label>
            <Input id="Comments" type="text" placeholder=" Comments"
            className="w-30" 
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
            required
            />
          </div>
          </div>
          {/* <Separator /> */}
          <div className="grid gap-4">
            {/* <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Product Variants</h3>
              <Button size="sm"  className="gap-1">
                <PlusIcon className="h-4 w-4" />
                Add Variant
              </Button>
            </div> */}
            {/* <div className="grid gap-4">
              <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="variant-name-1">Variant Name</Label>
                  <Input id="variant-name-1" 
                  placeholder="Enter variant name"
                  value={varName1}
                  onChange={(e)=> setVarName1(e.target.value)}
                  name="name"
                   />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="variant-price-1">Price</Label>
                  <Input id="variant-price-1" type="number" placeholder="Enter variant price"
                  value={varPrice1??''}
                  onChange={(e)=> setVarPrice1(Number(e.target.value))} 
                  name="price"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="variant-image-1">Variant Image</Label>
                  <Input id="variant-image-1" type="file" />
                </div>
              </div>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="variant-name-2">Variant Name</Label>
                  <Input id="variant-name-2" placeholder="Enter variant name" 
                  value={varName2}
                  onChange={(e)=> setVarName2(e.target.value)}
                  name="name2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="variant-price-2">Price</Label>
                  <Input id="variant-price-2" type="number"
                   placeholder="Enter variant price"
                   value={varPrice2??''}
                   onChange={(e)=> setVarPrice2(Number(e.target.value))} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="variant-image-2">Variant Image</Label>
                  <Input id="variant-image-2" type="file" />
                </div>
              </div>
            </div> */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        {regLoading===false &&(
        <Button 
       className="cursor-pointer"
       onClick={(e)=>handleProduct(e)}
        disabled={!productName|| !description || !price  || !offer || !rating}
        >Save Product</Button>
        )}
        {regLoading && (
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                        {variants.map((variant) => (
                              <div
                                className="flex flex-col items-center justify-center gap-2"
                                  key={variant}
                                >
                                            <Spinner variant={variant} />
                                            <span>please wait Process...</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
      </CardFooter>

    </Card>
  )
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
