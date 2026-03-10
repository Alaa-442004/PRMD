"use client";

import { Navbar } from "@/components/navigation/navbar";
import { motion } from "framer-motion";
import {
  Database,
  CheckCircle,
  XCircle,
  ExternalLink,
  Copy,
  RefreshCw,
  FileCode,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ConnectionStatus = {
  ok: boolean;
  message: string;
  studentCount?: number;
  error?: string;
};

export default function AdminDatabasePage() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const checkConnection = () => {
    setLoading(true);
    fetch("/api/database/test")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() =>
        setStatus({
          ok: false,
          message: "Request failed",
          error: "Could not reach the API",
        })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const copyEnv = () => {
    const env = 'DATABASE_URL="mysql://root:@localhost:3306/prmd"';
    navigator.clipboard.writeText(env);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Database className="w-8 h-8 text-primary" />
              Database Connection (XAMPP / phpMyAdmin)
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Link this app to your MySQL database and verify the connection.
            </p>
          </div>

          {/* Connection status card */}
          <div
            className={cn(
              "rounded-xl border p-6 mb-8",
              "bg-card-light dark:bg-card-dark border-gray-200 dark:border-gray-700"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Connection status</h2>
              <button
                onClick={checkConnection}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50"
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                {loading ? "Checking…" : "Test again"}
              </button>
            </div>
            {loading && !status ? (
              <p className="text-gray-500">Checking connection…</p>
            ) : status ? (
              <div className="flex items-start gap-3">
                {status.ok ? (
                  <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <p
                    className={cn(
                      "font-medium",
                      status.ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {status.message}
                  </p>
                  {status.ok && status.studentCount !== undefined && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Students in database: <strong>{status.studentCount}</strong>
                    </p>
                  )}
                  {!status.ok && status.error && (
                    <p className="text-sm text-gray-500 mt-1 font-mono">{status.error}</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* How to link */}
          <div
            className={cn(
              "rounded-xl border p-6 mb-8",
              "bg-card-light dark:bg-card-dark border-gray-200 dark:border-gray-700"
            )}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary" />
              How to link the database
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>Start <strong>Apache</strong> and <strong>MySQL</strong> in XAMPP.</li>
              <li>
                Open phpMyAdmin in your browser:{" "}
                <a
                  href="http://localhost/phpmyadmin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  http://localhost/phpmyadmin
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>Go to the <strong>SQL</strong> tab and run the script in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">database/setup.sql</code> (creates database <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">prmd</code> and tables).</li>
              <li>
                In your project root, create a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.env</code> file and add:
                <div className="mt-2 flex items-center gap-2">
                  <pre className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto">
                    DATABASE_URL="mysql://root:@localhost:3306/prmd"
                  </pre>
                  <button
                    onClick={copyEnv}
                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && (
                  <span className="text-sm text-green-600 dark:text-green-400">Copied to clipboard.</span>
                )}
              </li>
              <li>Restart the Next.js dev server (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">npm run dev</code>) and test the connection above.</li>
            </ol>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/students"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
            >
              View students
            </Link>
            <a
              href="http://localhost/phpmyadmin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Open phpMyAdmin
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
