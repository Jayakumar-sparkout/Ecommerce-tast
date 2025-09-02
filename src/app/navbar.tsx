"use client"

import {useState,useEffect} from "react"
import Link from "next/link"
import toast, { Toaster } from 'react-hot-toast';
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { UseDispatch,useSelector } from "react-redux"
import { setUserLoginData } from "@/slice/loginslice"
import { AppStore,makeStore, RootState } from "@/redux/store"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Select } from "@radix-ui/react-select"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuDemo() {

  const [selector,setSelector] = useState<String|undefined>()
  const [loginFname,setLoginFname] = useState<string|undefined>()
  const selector1 = useSelector((state:RootState)=> state.userDetail.loginName)
  
  useEffect(()=>{
    setLoginFname(selector1)
  },[selector1])


  useEffect(()=>{
   const data = localStorage.getItem('userName')
    setSelector(data)
  },[loginFname])
  
 
  const index = selector ? selector.slice(0,1).toUpperCase():''
  
  console.log('index',index)

const handleLogout =()=>{
  setTimeout(()=>{
  localStorage.removeItem("userName")
  setSelector(undefined)
  toast.success('User Successfully LogOut')
  },4000)
}

  return (
    <NavigationMenu viewport={false} 
   className=" fixed w-full flex justify-around bg-yellow-900 p-3 text-center item-center min-w-full mt-0"
    
    >
       <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <NavigationMenuList className="flex justify-between">
        <NavigationMenuItem>
            <NavigationMenuTrigger >
          <Link href="/">
         <img src="/FlipKart-Logo.jpg" alt="Flipkart Logo" width={65} className="cursor-pointer" />
         </Link>
          </NavigationMenuTrigger>
        
       </NavigationMenuItem>
   
        <NavigationMenuItem >
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            {
              selector && (
                <span className=" ml-200 hover:text-yellow-500">{selector}</span>
              )
              // ml-200
            }
             </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} >
               {!selector && (
                // ml-230 
            <Link href="/login" className=" ml-230 hover:text-yellow-500">Login</Link>
               )}
          </NavigationMenuLink>
     </NavigationMenuItem>

       {index&& (
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-1xl ml-4 border font-roboto font-400  mr-5">
            <span className=" hover:text-yellow-500">
              {index}
            </span>
            
            </NavigationMenuTrigger>
          <NavigationMenuContent className="z-index-1">
            <ul className="grid w-[150px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/profile" className=" flex-row items-center gap-2 cursor-pointer hover:text-yellow-500  text-red-500">
                    <CircleHelpIcon />
                   Edit Profile
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/" className=" flex-row items-center gap-2 cursor-pointer hover:text-yellow-500  text-red-500 " onClick={handleLogout}>
                    <CircleHelpIcon />
                   LogOut
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent> 
        </NavigationMenuItem>
       )}
        {index && (
          <NavigationMenuItem >
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link  href='/product' className="  hover:text-yellow-500">
                    Add Product
                    </Link>
                </NavigationMenuLink>
                  
        </NavigationMenuItem>

          )}

       {!index && (
       <NavigationMenuItem >
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link  href='/register' className=" ml-4  hover:text-yellow-500">
                 Register
                </Link>
             </NavigationMenuLink>
              
     </NavigationMenuItem>

       )}

     


        {/*  <NavigationMenuItem>
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Components</div>
                    <div className="text-muted-foreground">
                      Browse all components in the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Documentation</div>
                    <div className="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">Components</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">Documentation</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">Blocks</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Backlog
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    To Do
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Done
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>







  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
