"use client";
import { useFetchProducts } from "@/lib/useFetchProducts";
import {  useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SignIn } from "@/components/auth-components";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Product from "@/components/Product";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import ContactForm from "@/components/ContactForm";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Page() {
  const { data: products, isLoading, error } = useFetchProducts();

  interface ProductType {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
  }

  if (isLoading)
    return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;

  if (error)
    return <div className="text-red-500 text-center">Error fetching products.</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
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

        {/* Product Listing with Fade-In Animation */}
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: ProductType) => (
              <FadeIn key={product.id}>
                <Product product={product} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="container mx-auto p-4 mt-16">
          <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
          <ContactForm />
        </div>

        {/* Footer */}
        <footer className="bg-black text-white text-center p-4 mt-12">
          © {new Date().getFullYear()} Shoppy Inc. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
const FadeIn = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 40 }); // Reset animation when out of view
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

