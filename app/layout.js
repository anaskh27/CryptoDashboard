"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { MenuIcon, XIcon, UserCircleIcon } from "@heroicons/react/outline";
import "../app/styles.css";

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
              <img src="/clogo.png" alt="d" className="mt-5 w-50 h-30" />
              <ul className="mt-10 space-y-4">
                <li>
                  <div className="flex items-center gap-6 mb-10 ml-6 mr-8 ">
                    <img
                      src="/avatar.avif"
                      alt="d"
                      className="rounded-full w-12 h-12"
                    />

                    <button class="Btn">
                      <div class="sign">
                        <svg viewBox="0 0 512 512">
                          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                        </svg>
                      </div>

                      <div class="text">Logout</div>
                    </button>
                  </div>
                </li>
                <li>
                  <a
                    href="/"
                    className="block p-4 hover:bg-[#3A6FF8]  rounded-2xl"
                  >
                    Markets
                  </a>
                </li>
                <li>
                  <a
                    href="Reports"
                    className="block p-4 hover:bg-[#3A6FF8]  rounded-2xl"
                  >
                    Portfolio
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
