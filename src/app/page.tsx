"use client"
import { useEffect, useState } from "react"
import axios from 'axios';
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/app-sidebar"
import { SignIn } from "@/components/auth-components"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Page() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products")
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  console.log(products)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Shoppy Inc</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <ThemeToggle className="ml-auto" />
          <SignIn provider="google" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-10 md:grid-cols-3">
            {products.map((product, i) => (
              <motion.img
                key={i}
                src={product.image}
                alt="Product"
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-lg shadow-md"
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
