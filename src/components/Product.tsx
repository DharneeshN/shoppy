"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function Product({ product }: { product: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="w-full sm:max-w-xs"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          className="shadow-lg hover:shadow-2xl transition-transform hover:scale-105 cursor-pointer" 
          onClick={() => setOpen(true)}
        >
          <CardHeader className="flex justify-center">
            <img src={product.image} alt={product.title} className="h-40 w-40 object-contain" />
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
          </CardContent>
        </Card>
      </motion.div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-6">
            <DialogTitle>{product.title}</DialogTitle>
          <div className="flex flex-col items-center">
            <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
            <p className="text-gray-600 text-lg">${product.price}</p>
            <p className="mt-2 text-sm text-center">{product.description}</p>
          </div>
          <Button variant="secondary" className="mt-4 w-full" onClick={() => setOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
