'use client'
import { cn } from "@/lib/utils"
import '../app/globals.css'
import { Button } from "@/components/ui/button"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { use, useState } from "react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const [regEmail,setRegEmail] = useState<string|undefined>()
    const [regFName,setRegFName] = useState<string|undefined>()
    const [regLName,setRegLName] = useState<string|undefined>()
    const [regPhone,setRegPhone] = useState<number|null>(null)
    const [regPassword,setRegPassword] = useState<string|undefined>()
    const [emailErr,setEmailErr] = useState<boolean>();
    const [phoneErr,setPhoneErr] = useState<boolean>();
    const [passErr,setPassErr] = useState<boolean>()
    const [regLoading,setRegLoading] = useState<boolean>()
    const [registerShow,setRegisterShow] = useState<boolean>(true)

    const router = useRouter()
    const preventInvalidChars = async(e:any)=> {
    const invalidChars = ["e", "E", "+", "-"];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  const handleRegister =async()=>{
    setRegLoading(true)
    setRegisterShow(false)
try{
const result = await fetch('http://localhost:3001/users',{
  method:'POST',
  headers:{
    'Content-type':'application/type'
  },
 body:JSON.stringify({firstName:regFName,lastName:regLName,email:regEmail,phone:regPhone,password:regPassword})
})

if(result.ok){
  const data =result.json()
  console.log('registerData',data)
  setTimeout(()=>{
  toast.success('Your Data is Registed!')
  setRegisterShow(true)
  setRegEmail('')
  setRegFName('')
  setRegLName('')
  setRegPassword('')
  setRegPhone()
  setRegLoading(false)
  router.push("/login")
  },5000)
}
}catch(error:any){
console.log('errorMessage',error.message)
toast.error('error',error.message)
}

  }
  return (
    <div className={cn("flex flex-col mt-10 gap-6", className)} {...props}>
       <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              <div className="text-center item-center">
            Register Your Details
            </div>
            
            <img src="/FlipKart-Logo.jpg" alt="Flipkart Logo" width={80} className="cursor-pointer ml-30" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                {/* <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button> */}
                {/* <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button> */}
              </div>
              {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div> */}
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="firstname">FirstName <span className="text-red-500">*</span></Label>
                 <Input
                  id="FirstName"
                  value={regFName}
                  onChange={(e) => {
                    const onlyLetters = e.target.value.replace(/[^A-Za-z]/g, "");
                    setRegFName(onlyLetters);
                  }}
                  type="text"
                  placeholder="Enter the First Name..."
                  required
                />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastname">LastName</Label>
                  <Input
                id="LastName"
                value={regLName}
                onChange={(e) => {
                  const onlyLetters = e.target.value.replace(/[^A-Za-z]/g, "");
                  setRegLName(onlyLetters);
                }}
                type="text"
                placeholder="Enter the Last Name..."
                required
              />
                </div>

                <div className="grid gap-3">
                <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    className={`no-spinner ${emailErr === true && 'border border-red-500 '}`}
                                    placeholder="m@example.com"
                                    value={regEmail}
                                    onChange={(e)=> {
                                const data = e.target.value
                                setRegEmail(data)
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
              <Label htmlFor="username-1">Phone<span className="text-red-500">*</span></Label>
               <Input id="username-1"  className={`no-spinner  ${phoneErr === true && 'border border-red-500 '}`} name="phone"  placeholder="Enter the Phone no"
              type="number"
              onKeyDown={(e)=>preventInvalidChars(e)}
              value={regPhone ?? " "}
             onChange={(e) => {
            const value = e.target.value;

            setRegPhone(Number(value));
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
                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                  </div>
                  <Input 
                  id="password" 
                  type="password" 
                  className={`no-spinner  ${passErr === true && 'border border-red-500 '}`}
                  placeholder="Enter the Password"
                  value={regPassword}
                  onChange={(e)=> {
                    const passValue = e.target.value;
                    setRegPassword(passValue)
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

                {registerShow && (
                <Button 
                type="submit"
                 className="w-full"
                 disabled={!regEmail || !regFName || !regPassword || !regPhone || emailErr===true || passErr===true || phoneErr===true}
                 onClick={handleRegister}
                >
                  Create Account
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
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
