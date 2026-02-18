"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Lightbulb, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

const loginSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function QuizLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Quiz login:", data);
    // Redirect to exam page
    router.push("/exam/1");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center p-6 lg:p-12"
      >
        <div className="max-w-md text-center">
          {/* Illustration */}
          <div className="relative mb-8 flex justify-center">
            <FileText className="w-24 h-32 text-gray-600 dark:text-gray-400" />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 -right-4"
            >
              <Lightbulb className="w-12 h-12 text-yellow-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 45 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 -left-4"
            >
              <Pencil className="w-8 h-8 text-orange-400" />
            </motion.div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-800 dark:text-gray-200"
          >
            Take a Quiz
          </motion.h1>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 bg-white dark:bg-card-dark flex items-center justify-center p-6 lg:p-8"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-right mb-8">
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Form Container */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your credentials to start the exam
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Enter Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                placeholder="Enter your name"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border-2",
                  "bg-gray-100 dark:bg-gray-800",
                  "border-gray-400 dark:border-gray-600",
                  "text-gray-800 dark:text-gray-200 font-medium",
                  "focus:ring-2 focus:ring-primary focus:border-primary",
                  "focus:outline-none",
                  errors.name && "border-error"
                )}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground text-gray-600 dark:text-gray-400"
                >
                  Forget password?
                </Link>
              </div>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Enter your password"
                className={cn(
                  "w-full px-4 py-3 rounded-xl border-2",
                  "bg-gray-100 dark:bg-gray-800",
                  "border-gray-400 dark:border-gray-600",
                  "text-gray-800 dark:text-gray-200 font-medium",
                  "focus:ring-2 focus:ring-primary focus:border-primary",
                  "focus:outline-none",
                  errors.password && "border-error"
                )}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-4 px-6 rounded-lg font-semibold text-lg",
                "bg-primary text-white",
                "hover:bg-primary-dark transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "shadow-lg hover:shadow-xl"
              )}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
