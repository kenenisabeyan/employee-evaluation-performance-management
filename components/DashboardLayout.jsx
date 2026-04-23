"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  User,
  BookOpen,
  FileText,
  History,
  GraduationCap,
  HelpCircle,
  Home,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Users,
  BarChart
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinks = [
    { name: "Profile", href: "/employee/profile", icon: User },
    { name: "Dashboard", href: "/employee/employee-dashboard", icon: Home },
    { name: "Self Evaluation", href: "/employee/self-evaluation-form", icon: FileText },
    { name: "Peer Evaluation", href: "/employee/peer-evaluation", icon: Users },
    { name: "Evaluation Results", href: "/employee/employee-result", icon: BarChart },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-slate-800">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        } bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 z-20`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-4 flex flex-col items-center justify-center border-b border-gray-100">
            <div className="relative w-20 h-20 mb-2">
              {/* Replace with actual logo if needed */}
              <div className="w-full h-full rounded-full border-2 border-red-600 flex items-center justify-center overflow-hidden bg-white">
                 <Image src="/image/astuLogo.png" alt="ASTU Logo" width={80} height={80} className="object-contain" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-[#0ea5e9] text-xs font-semibold">2025/2026 Second Semester</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href);
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`flex items-center px-6 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "text-[#0ea5e9] bg-sky-50 font-medium border-l-4 border-[#0ea5e9]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                      }`}
                    >
                      <link.icon className="w-4 h-4 mr-3" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
