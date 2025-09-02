'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, UseDispatch,useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { AppStore,AppDispatch } from "@/redux/store";
import { setUserEmail, setUserLoginData } from "@/slice/loginslice";
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
export function ProfileForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [upName,setUpName] = useState<string|undefined>()
  const [upEmail,setUpEmail] = useState<string|undefined>()
  const [emailErr,setEmailErr] =useState<boolean>()
  const [upPassword,setUpPassword]=useState<string|undefined>()
  const [passErr,setPassErr] =useState<boolean>()
  const [upPhone,setUpPhone] =useState<number|null>()
  const [phoneErr,setPhoneErr]=useState<boolean>()
  const [address,setAddress]=useState<string|undefined>()
  const [age,setAge] =useState<number|null>()
 const [selector,setSelector] = useState<string|undefined>();
 const [loginUserEmail,setLoginUserEmail] = useState<string|undefined>();
 const [profileImage,setProfileImage] = useState<string|undefined>()
 const [conPassword,setConPassword] = useState<string|undefined>();
 const [confirm,setConfirm] = useState<boolean>();
 const [regLoading,setRegLoading]=useState<boolean>(false)
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

    const preventInvalidChars = async(e:any)=> {
    const invalidChars = ["e", "E", "+", "-"];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  // const handleUpdate = async(e:any)=>{
  //   e.preventDefault()
  //   if(selector!=upEmail){
  //     toast.error('Your currently Login Another Email Please Check It..')
  //   }
  //   try{
  //     //  const exits= await fetch(`http://localhost:3001/users?email=${upEmail}& password=${upPassword}`)
  //     //  if(exits.ok){
  //     //   console.log('exits',exits)
  //         const data = await fetch(`http://localhost:3001/users?email=${upEmail}&&password=${upPassword}`,{
  //       method:'PATCH',
  //       headers:{
  //         'Content-type':'application/json'
  //       },
  //       body: JSON.stringify({firstName:upName,password:upPassword,email:upEmail,address:address,age:age})
  //      })
  //   if(data.ok){
  //           const result =  await data.json()
  //           console.log('result',result)
  //   }
  //      }
      
  //     //  if(!exits.ok){
  //     //   toast.error('Invalid User!')
  //     //  }


       
  //   catch(error:any){
  //      toast.error('Error',error.message)
  //      console.log('error',error.message)
  //   }
  // }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setProfileImage(reader.result as string); 
  };
  reader.readAsDataURL(file);
};

  const handleUpdate = async (e: any) => {
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
          firstName: upName,
          password: upPassword,
          email: upEmail,
          address: address,
          age: age,
         profileImage:'http://localhost:3000/edit.png'
        }),
      }
    );

    if (!updateRes.ok) {
      console.log("Update failed!");
      setRegLoading(false)
    }

    const updatedUser = await updateRes.json();
    setTimeout(()=>{
    console.log("Updated user:", updatedUser);
    setAddress('')
    setAge()
    setUpEmail('')
    setUpName('')
    setUpPassword('')
    setUpPhone()
    

    toast.success("Profile updated successfully!");
    localStorage.setItem("userName", updatedUser.firstName);
    setRegLoading(false)
    },4000)
  } catch (error: any) {
    setTimeout(()=>{
    toast.error("Error: ",error.message);
    console.log("Update error:", error.message);
    },4000)
  }
};

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Edit Your Profile</h1>
        
        <img src="/FlipKart-Logo.jpg" alt="Flipkart Logo" width={80} className="cursor-pointer" />
      </div>
      {/* <div className="grid gap-6">
       <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" accept="image/*" onChange={(e)=>handleFileChange(e)} />
    </div>

      </div> */}
      <div className="grid gap-6">
        <div className="w-full max-w-xs">
               <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="picture">User Profile</Label>
              <Input id="picture" type="file"/>
        </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="name">UserName</Label>
          <Input id="name" type="text" placeholder="Enter the username" 
          value={upName}
            onChange={(e) => {
                    const onlyLetters = e.target.value.replace(/[^A-Za-z]/g, "");
                    setUpName(onlyLetters);
                  }}
          required
           />
        </div>

          <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    className={`no-spinner ${emailErr === true && 'border border-red-500 '}`}
                                    placeholder="m@example.com"
                                    value={upEmail}
                                    onChange={(e)=> {
                                const data = e.target.value
                                setUpEmail(data)
                                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                const correct  = valid.test(data)
                
                                if(!correct){
                                  setEmailErr(true)
                                }else{
                                  setEmailErr(false)
                                }
                              }
                              }
                                  />
                                  {emailErr===true &&(
                        <p className="text-red-500">
                         Enter the Valid Email ID 
                        </p>
                          )
                        }
                    </div>

                     <div className="grid gap-3">
                
            
                  <div className="flex items-center">
                   <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                  id="password" 
                  type="password" 
                  className={`no-spinner  ${passErr === true && 'border border-red-500 '}`}
                  placeholder="Enter the Password"
                  value={upPassword}
                  onChange={(e)=> {
                    const passValue = e.target.value;
                    setUpPassword(passValue)
                    if (passValue.length < 6){
                      setPassErr(true)
                    }else{
                      setPassErr(false)
                    }
                    
                    
                  }
                  }
                  required />
                     {passErr===true &&(
                        <p className="text-red-500">
                          Enter the Password Min 6 length
                        </p>
                          )
                          }
                </div>
                <div className="grid gap-3">
                 <div className="flex items-center">
                   <Label htmlFor="password">Confirm Password</Label>
                  </div>
                  <Input 
                  id="password" 
                  type="password" 
                  className={`no-spinner  ${confirm === true && 'border border-red-500 '}`}
                  placeholder="Enter the Password"
                  value={conPassword}
                  onChange={(e)=> {
                    const passValue = e.target.value;
                    setConPassword(passValue)
                    
                      if(conPassword===upPassword){
                        setConfirm(true)
                      }else{
                        setConfirm(false)
                      }
                    }
                    
                    
                  }
                  
                  required />
                     {confirm===true &&(
                        <p className="text-red-500 text-l">
                         Please Check the Both Password are Same or Not
                        </p>
                          )
                          }
                  </div>
                


          <div className="grid gap-3">
              <Label htmlFor="username-1">Phone</Label>
               <Input id="username-1"  className={`no-spinner  ${phoneErr === true && 'border border-red-500 '}`} name="phone"  placeholder="Enter the Phone no"
              type="number"
              onKeyDown={(e)=>preventInvalidChars(e)}
              value={upPhone ?? " "}
             onChange={(e) => {
            const value = e.target.value;

            setUpPhone(Number(value));
            if (value.length === 10 && /^\d{10}$/.test(value)) {
              setPhoneErr(false);
            } else {
              setPhoneErr(true);
            }
          }}

              />
               {phoneErr&&(
              <p className="text-red-500">
              Enter The Valid Phone no
              </p>
            )}


            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
            <Label htmlFor="address">Address</Label>
            </div>
            <Input
             id="address"
             name="address"
             type="text"
             placeholder="Enter Your Address"
             value={address}
             onChange={(e)=> setAddress(e.target.value)}
            />

            </div>

            <div className="grid gap-3">
            <div className=" flex items-center">
            <Label htmlFor="age">Age</Label>
            </div>
            <Input 
            type="number"
            id="age"
            name="age"
            placeholder="Enter the Age"
            value={age??''}
            onChange={(e)=> setAge(Number(e.target.value))}
            />
            </div>
            {regLoading ===false && (
        <Button 
        onClick={(e)=>handleUpdate(e)}
         className="w-full cursor-pointer"
         disabled={!upEmail || !upName || !upPassword || !upPhone || !age || emailErr===true || passErr===true ||  phoneErr===true}>
          Update Profile
        </Button>
            )}

        {regLoading && (
                          <div className="flex flex-col items-center justify-center gap-3 text-center">
                                {variants.map((variant) => (
                                      <div
                                        className="flex flex-col items-center justify-center gap-2"
                                          key={variant}
                                        >
                                                    <Spinner variant={variant} />
                                                    <span>please wait Your Registering...</span>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
      </div>
    </form>
  )
}
