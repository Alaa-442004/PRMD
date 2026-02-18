"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const courses = [
  {
    id: 1,
    title: "Advanced JavaScript Mastery",
    students: 1250,
    status: "Published",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "React & Next.js Complete Guide",
    students: 2100,
    status: "Published",
    createdAt: "2024-02-01",
  },
  {
    id: 3,
    title: "Node.js Backend Development",
    students: 980,
    status: "Draft",
    createdAt: "2024-02-20",
  },
];

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Courses Management</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage all courses in your platform
              </p>
            </div>
            <button
              className={cn(
                "flex items-center px-4 py-2",
                "bg-primary text-white rounded-lg font-semibold",
                "hover:bg-primary-dark transition-colors"
              )}
            >
              <Plus className="w-5 h-5 mr-2" />
              New Course
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-lg border",
                  "bg-background-light dark:bg-background-dark",
                  "border-gray-300 dark:border-gray-600",
                  "focus:ring-2 focus:ring-primary focus:border-transparent"
                )}
              />
            </div>
          </div>

          {/* Courses Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Students</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Created</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      {/* Actions column left empty */}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {courses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium">{course.title}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {course.students.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            course.status === "Published"
                              ? "bg-success/20 text-success"
                              : "bg-gray-500/20 text-gray-600 dark:text-gray-300"
                          )}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {course.createdAt}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* Actions removed */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
