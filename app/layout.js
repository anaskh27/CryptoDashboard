"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <nav
            className={`fixed top-0 left-0 h-full bg-[#1B2028] text-white transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:relative sm:translate-x-0 sm:w-64 sm:z-50 z-50`}
          >
            <div className="p-4">
              <button
                className="text-white ml-2 mb-4 mt-4 block sm:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <XIcon className="w-6 h-6 transform transition-transform duration-300 ease-in-out hover:rotate-180 active:rotate-90" />
                ) : (
                  ""
                )}
              </button>
              <img src="/clogo.png" alt="d" className="mt-5" />
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="/"
                    className="block p-4 hover:bg-[#3A6FF8]  rounded-2xl"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="Reports"
                    className="block p-4 hover:bg-[#3A6FF8]  rounded-2xl"
                  >
                    Reports
                  </a>
                </li>
                <li>
                  <a
                    href="#settings"
                    className="block p-4 hover:bg-[#3A6FF8] rounded-2xl"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <div className={`flex-1 ml-0  bg-[#31353F] overflow-auto`}>
            <header className="bg-[#1B2028] text-white p-4 flex items-center justify-between sm:hidden">
              <button
                className="text-white"
                onClick={() => setIsSidebarOpen(true)}
              >
                <MenuIcon className="w-8 h-8" />
              </button>
              <img src="/clogo.png" alt="d" className="w-30 h-10" />
            </header>

            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
