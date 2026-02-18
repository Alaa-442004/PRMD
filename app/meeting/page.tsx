"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Phone,
  Share2,
  Settings,
  Users,
  Hand,
  MessageSquare,
  Signal,
  MoreVertical,
  Copy,
  Eye,
} from "lucide-react";

export default function MeetingPage() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participantCount] = useState(4);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMeetingDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const participants = [
    { id: 1, name: "Dr. Sarah Johnson", role: "Instructor", status: "speaking", avatar: "S" },
    { id: 2, name: "John Doe", role: "Student", status: "listening", avatar: "J" },
    { id: 3, name: "Emma Wilson", role: "Student", status: "hand_raised", avatar: "E" },
    { id: 4, name: "Michael Chen", role: "Student", status: "idle", avatar: "M" },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "speaking":
        return "🎤";
      case "hand_raised":
        return "✋";
      case "idle":
        return "🔇";
      default:
        return "•";
    }
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
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Live Meeting</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced Web Development Class • Real-time collaboration
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/40 rounded-lg">
                <Signal className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="text-emerald-500 text-sm font-medium">
                  Live - {formatTime(meetingDuration)}
                </span>
              </div>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Video Area */}
            <div className="lg:col-span-3 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card-light dark:bg-card-dark rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden bg-black/40 border border-primary/20">
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 via-primary/40 to-slate-900 flex items-center justify-center relative">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

                    {/* Speaker indicator */}
                    <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2 border border-emerald-500/60 animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-emerald-400 text-xs font-semibold">
                        Currently Speaking
                      </span>
                    </div>

                    {/* Speaker avatar */}
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl ring-4 ring-primary/30">
                        <span className="text-white text-5xl md:text-6xl font-bold">S</span>
                      </div>
                      <div className="text-center">
                        <h3 className="text-white text-2xl md:text-3xl font-bold">
                          Dr. Sarah Johnson
                        </h3>
                        <p className="text-primary-foreground/90 text-sm md:text-base mt-1">
                          Instructor • 1080p • HD Audio
                        </p>
                      </div>
                    </div>

                    {/* Connection indicator */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-lg border border-primary/40">
                      <Signal className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-200 text-xs md:text-sm">
                        Excellent Connection
                      </span>
                    </div>

                    {/* Screen Share indicator */}
                    {isScreenSharing && (
                      <div className="absolute top-4 left-4 bg-purple-600/20 border border-purple-500/50 rounded-lg px-3 py-1.5 flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-200 text-xs font-medium">
                          Screen Sharing
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Participant thumbnails */}
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {participants.slice(1).map((participant) => (
                    <div
                      key={participant.id}
                      className="flex-shrink-0 w-24 h-24 rounded-xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center hover:border-primary/70 transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-sm font-bold mb-1">
                        {participant.avatar}
                      </div>
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-100 text-center px-2 truncate">
                        {participant.name.split(" ")[0]}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">
                        {getStatusLabel(participant.status)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Control Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card-light dark:bg-card-dark rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                  {/* Mic Button */}
                  <Button
                    onClick={() => setIsMicOn(!isMicOn)}
                    size="lg"
                    className={`rounded-full w-14 h-14 flex items-center justify-center transition-all shadow-md ${
                      isMicOn
                        ? "bg-primary hover:bg-primary-dark text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                  </Button>

                  {/* Camera Button */}
                  <Button
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    size="lg"
                    className={`rounded-full w-14 h-14 flex items-center justify-center transition-all shadow-md ${
                      isCameraOn
                        ? "bg-primary hover:bg-primary-dark text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {isCameraOn ? <VideoIcon className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                  </Button>

                  {/* Screen Share Button */}
                  <Button
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    size="lg"
                    variant="outline"
                    className={`rounded-full w-14 h-14 flex items-center justify-center transition-all ${
                      isScreenSharing
                        ? "border-purple-500 text-purple-600 dark:text-purple-400"
                        : ""
                    }`}
                  >
                    <Share2 className="w-6 h-6" />
                  </Button>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-700"></div>

                  {/* Hand Raise Button */}
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full w-14 h-14 flex items-center justify-center transition-all"
                  >
                    <Hand className="w-6 h-6" />
                  </Button>

                  {/* Chat Button */}
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full w-14 h-14 flex items-center justify-center transition-all"
                  >
                    <MessageSquare className="w-6 h-6" />
                  </Button>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-700"></div>

                  {/* End Call Button */}
                  <Button
                    size="lg"
                    className="rounded-full w-14 h-14 flex items-center justify-center transition-all shadow-md bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Phone className="w-6 h-6" />
                  </Button>
                </div>

                {/* Connection Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">Network</span>
                    <span className="text-emerald-500 font-bold">Excellent</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">Latency</span>
                    <span className="text-emerald-500 font-bold">18ms</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">Bitrate</span>
                    <span className="text-emerald-500 font-bold">3.2Mbps</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">Participants</span>
                    <span className="text-emerald-500 font-bold">{participantCount}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar - Participants */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-card-light dark:bg-card-dark rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Participants
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {participantCount} in meeting
                  </p>
                </div>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg max-h-[520px] overflow-y-auto">
                <div className="space-y-2 p-3">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-background-dark border border-transparent hover:border-primary/60 transition-colors"
                    >
                      {/* Avatar and Info */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {participant.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {participant.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {participant.role}
                          </p>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {participant.status === "speaking" && (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        )}
                        {participant.status === "hand_raised" && (
                          <Hand className="w-4 h-4 text-yellow-500" />
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {getStatusLabel(participant.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Meeting Link
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Gallery View
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

