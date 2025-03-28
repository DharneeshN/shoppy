"use client"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"; 
import { toast } from "sonner";

export default function ContactForm() {
  const { theme } = useTheme(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);

    // ✅ Show toast notification
    toast.success("Message sent successfully!");

    reset(); 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-lg mx-auto p-6 rounded-lg shadow-md transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="mb-4">
        <label className="block font-semibold">Name</label>
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Your Name"
          className={theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name?.message as string}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Email</label>
        <Input
          type="email"
          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email" } })}
          placeholder="Your Email"
          className={theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email?.message as string}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Message</label>
        <Textarea
          {...register("message", { required: "Message is required" })}
          placeholder="Your Message"
          className={theme === "dark" ? "bg-gray-900 text-white border-gray-700" : ""}
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message?.message as string}</p>}
      </div>

      <Button type="submit" className="w-full">Send Message</Button>
    </form>
  );
}
