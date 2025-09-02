"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import './globals.css'
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import logo from '../../public/png-transparent-flipkart-logo.png'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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
    const [login,setLogin] = useState<boolean>()
    const [loginName,setLoginName] = useState<string|undefined>()
  return (
    <NavigationMenu viewport={false} className="w-full bg-gray-400 h-15 flex ">
  <NavigationMenuList  className="flex items-center justify-space-around w-full font-roboto text-2rem      text-red-600 text-center">
      <NavigationMenuItem>
        <NavigationMenuTrigger className="mt-10">
          <Link href="/">
         <img src="/FlipKart-Logo.jpg" alt="Flipkart Logo" width={65} className="cursor-pointer" />
         </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                       Product Management
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Manage your products, categories, and inventory efficiently.

                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="All Products">
              View and manage all products in your catalog.
              </ListItem>
              <ListItem href="/docs/installation" title="Add Product">
           Add a new product with details like name, price, and category.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Categories">
                 Manage product categories and organize your catalog efficiently.
              </ListItem>
            </ul>
          </NavigationMenuContent>
          <NavigationMenuItem>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <NavigationMenuTrigger className="text-1xl font-roboto font-400 mr-28">
            <Link href='/register'>
            Register
            </Link>
            
            </NavigationMenuTrigger>
          {/* <NavigationMenuContent>
            <ul className="grid w-[150px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/register" className="flex-row items-center gap-2 ">
                    <CircleHelpIcon />
                    User's Register
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-1xl font-roboto font-400 mr-28">
            <Link href='/register'>
            Register
            </Link>
            
            </NavigationMenuTrigger>
          {/* <NavigationMenuContent>
            <ul className="grid w-[150px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/register" className="flex-row items-center gap-2 ">
                    <CircleHelpIcon />
                    User's Register
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>


    //   <NavigationMenu className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 shadow-md flex items-center justify-between ">
    //   <NavigationMenuList className="flex items-center justify-between w-full px-6 py-3 text-white font-roboto">
        

    //     <NavigationMenuItem>
    //       <Link href="/" className="flex items-center gap-2">
    //         <img
    //           src="/FlipKart-Logo.jpg"
    //           alt="Flipkart Logo"
    //           width={60}
    //           className="cursor-pointer rounded"
    //         />
    //         <span className="text-xl font-bold tracking-wide">FlipShop</span>
    //       </Link>
    //     </NavigationMenuItem>

    //     {/* Products Dropdown */}
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger className="text-lg font-medium">
    //         Products
    //       </NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-white text-gray-800 rounded-xl shadow-lg">
    //           <li className="row-span-3">
    //             <NavigationMenuLink asChild>
    //               <Link
    //                 href="/"
    //                 className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-gray-100 to-gray-200 p-6 no-underline hover:shadow-md"
    //               >
    //                 <div className="mb-2 text-lg font-semibold">
    //                   Product Management
    //                 </div>
    //                 <p className="text-sm leading-tight text-gray-600">
    //                   Manage your products, categories, and inventory efficiently.
    //                 </p>
    //               </Link>
    //             </NavigationMenuLink>
    //           </li>
    //           <li>
    //             <NavigationMenuLink asChild>
    //               <Link
    //                 href="/products"
    //                 className="block rounded-md p-3 hover:bg-blue-100"
    //               >
    //                 <div className="font-medium">All Products</div>
    //                 <p className="text-sm text-gray-600">
    //                   View and manage all products in your catalog.
    //                 </p>
    //               </Link>
    //             </NavigationMenuLink>
    //           </li>
    //           <li>
    //             <NavigationMenuLink asChild>
    //               <Link
    //                 href="/add-product"
    //                 className="block rounded-md p-3 hover:bg-blue-100"
    //               >
    //                 <div className="font-medium">Add Product</div>
    //                 <p className="text-sm text-gray-600">
    //                   Add a new product with details like name, price, and category.
    //                 </p>
    //               </Link>
    //             </NavigationMenuLink>
    //           </li>
    //           <li>
    //             <NavigationMenuLink asChild>
    //               <Link
    //                 href="/categories"
    //                 className="block rounded-md p-3 hover:bg-blue-100"
    //               >
    //                 <div className="font-medium">Categories</div>
    //                 <p className="text-sm text-gray-600">
    //                   Organize your catalog efficiently.
    //                 </p>
    //               </Link>
    //             </NavigationMenuLink>
    //           </li>
    //         </ul>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>

    //     {/* Register */}
    //     <NavigationMenuItem>
    //       <Link
    //         href="/register"
    //         className="text-lg font-medium hover:text-yellow-300 transition-colors"
    //       >
    //         Register
    //       </Link>
    //     </NavigationMenuItem>

    //     {/* Help */}
    //     <NavigationMenuItem>
    //       <Link
    //         href="/help"
    //         className="flex items-center gap-2 text-lg font-medium hover:text-yellow-300 transition-colors"
    //       >
    //         <CircleHelpIcon className="h-5 w-5" />
    //         Help
    //       </Link>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>

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



