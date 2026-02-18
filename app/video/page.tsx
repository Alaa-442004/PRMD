"use client";

import { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Play,
  Pause,
  Volume1,
  Maximize,
  ChevronDown,
  Clock,
  Eye,
  Download,
  Share2,
  Star,
  ThumbsUp,
} from "lucide-react";

export default function VideoPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(45);
  const [volume, setVolume] = useState(80);
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "materials" | "transcript">("description");
  const [searchQuery, setSearchQuery] = useState("");

  const videos = [
    { id: 1, title: "React Hooks Deep Dive", duration: "1:45:30", views: "12.5K", instructor: "Dr. Sarah" },
    { id: 2, title: "Advanced State Management", duration: "2:15:00", views: "8.3K", instructor: "Prof. John" },
    { id: 3, title: "Performance Optimization", duration: "1:30:45", views: "15.2K", instructor: "Dr. Sarah" },
    { id: 4, title: "TypeScript Masterclass", duration: "3:00:00", views: "9.7K", instructor: "Prof. Mike" },
    { id: 5, title: "Next.js 15 Complete Guide", duration: "2:45:30", views: "22.1K", instructor: "Dr. Sarah" },
    { id: 6, title: "Testing Best Practices", duration: "1:50:00", views: "6.8K", instructor: "Prof. Emma" },
  ];

  const currentVideo = {
    title: "React Performance Optimization - Advanced Patterns",
    instructor: "Dr. Sarah Johnson",
    uploadDate: "January 15, 2024",
    views: "12,540",
    rating: 4.8,
    duration: "1:15:00",
    format: "MP4 • H.264",
    resolution: "4K (2160p)",
    fileSize: "2.8GB",
    description:
      "Learn advanced techniques for optimizing React applications. We cover memoization, lazy loading, code splitting, and profiling tools. This comprehensive course includes practical examples and real-world scenarios.",
    materials: ["Lecture Slides (PDF)", "Source Code (ZIP)", "Study Guide", "Practice Exercises"],
    tags: ["React", "Performance", "Optimization", "Advanced"],
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Video Library</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Professional learning materials and recorded sessions
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <Clock className="w-4 h-4" />
                </span>
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Video Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card-light dark:bg-card-dark rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <div
                  className={`relative rounded-2xl overflow-hidden bg-black/40 border border-primary/20 group ${
                    isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-video"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-primary/40 flex items-center justify-center relative">
                    {/* Grid background */}
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

                    {/* Play button */}
                    <div className="flex flex-col items-center justify-center gap-4">
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="w-20 h-20 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl"
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-10 h-10 text-white ml-1" />
                        ) : (
                          <Play className="w-10 h-10 text-white ml-2" />
                        )}
                      </button>
                      <span className="text-gray-200 text-sm">
                        {isVideoPlaying ? "Playing" : "Paused"}
                      </span>
                    </div>

                    {/* Quality Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-primary/30 flex items-center gap-2">
                      <span className="text-primary-foreground text-xs font-semibold">{videoQuality}</span>
                      <ChevronDown className="w-3 h-3 text-primary-foreground" />
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-primary/30 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-primary-foreground" />
                      <span className="text-primary-foreground text-xs font-semibold">
                        {currentVideo.duration}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700/50 group-hover:h-2 transition-all cursor-pointer">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-4 space-y-4">
                  {/* Timeline */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={videoProgress}
                      onChange={(e) => setVideoProgress(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {Math.floor((videoProgress * 75) / 60)}:
                        {((videoProgress * 75) % 60).toString().padStart(2, "0")}
                      </span>
                      <span>1:15:00</span>
                    </div>
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Volume */}
                      <div className="flex items-center gap-2">
                        <Volume1 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-8">{volume}%</span>
                      </div>

                      {/* Quality Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Quality:</span>
                        <div className="flex gap-1">
                          {["480p", "720p", "1080p", "2160p"].map((quality) => (
                            <button
                              key={quality}
                              onClick={() => setVideoQuality(quality)}
                              className={`text-xs px-2 py-1 rounded transition-all ${
                                videoQuality === quality
                                  ? "bg-primary text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                              }`}
                            >
                              {quality}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fullscreen Button */}
                    <Button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      variant="outline"
                      size="icon"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Video Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg space-y-4"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{currentVideo.title}</h2>
                  <div className="flex items-center gap-4 flex-wrap text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        S
                      </div>
                      <span>{currentVideo.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}
                      <span className="text-gray-600 dark:text-gray-300 ml-1">
                        ({currentVideo.rating})
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {currentVideo.views} views
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Button>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Tabs */}
                <div className="mt-4">
                  <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
                    {["description", "materials", "transcript"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() =>
                          setActiveTab(tab as "description" | "materials" | "transcript")
                        }
                        className={`py-3 px-4 text-sm font-medium transition-colors capitalize ${
                          activeTab === tab
                            ? "text-primary border-b-2 border-primary"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="mt-4 space-y-4">
                    {activeTab === "description" && (
                      <>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {currentVideo.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 mb-1">Format</p>
                            <p className="text-sm font-semibold">{currentVideo.format}</p>
                          </div>
                          <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 mb-1">Resolution</p>
                            <p className="text-sm font-semibold">{currentVideo.resolution}</p>
                          </div>
                          <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 mb-1">File Size</p>
                            <p className="text-sm font-semibold">{currentVideo.fileSize}</p>
                          </div>
                          <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 mb-1">Uploaded</p>
                            <p className="text-sm font-semibold">
                              {currentVideo.uploadDate.split(" ")[0]}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === "materials" && (
                      <div className="space-y-3">
                        {currentVideo.materials.map((material) => (
                          <div
                            key={material}
                            className="flex items-center justify-between bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary/60 transition-colors"
                          >
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              {material}
                            </span>
                            <Download className="w-4 h-4 text-primary cursor-pointer hover:text-primary/80" />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "transcript" && (
                      <div className="bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Transcript will be available after video completion.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar - Playlist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-lg font-semibold mb-1">Related Videos</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Continue learning with these modules
                </p>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg max-h-[520px] overflow-y-auto">
                <div className="space-y-2 p-3">
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        index === 0
                          ? "bg-primary/10 border-primary/40"
                          : "bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-700 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div className="w-20 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-accent/40 flex-shrink-0 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold leading-tight truncate">
                            {video.title}
                          </h4>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            {video.instructor}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                View All Courses
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

