'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Home, User, Menu, Moon, Users, UserPlus, Settings, BarChart3 } from 'lucide-react'

// Unified Admin Layout Component
export default function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState({ name: 'System Admin', image: '/image/astuLogo.png' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const data = await res.json()
          setProfile({
            name: data.user?.fullName || 'System Admin',
            image: data.user?.profileImage || '/image/astuLogo.png'
          })
        }
      } catch (_) {}
      setLoading(false)
    }
    fetchProfile()
  }, [])

  return (
    <div className="min-h-screen bg-[#f4f7fc] font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#3b41c5] text-white z-50 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-1 mr-2 rounded hover:bg-white/20 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
             <Image src="/image/astuLogo.png" width={40} height={40} alt="Logo" className="object-contain" />
          </div>
          <span className="text-lg font-bold tracking-wide">Admin Portal</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="text-sm font-medium hover:text-white/80 transition-colors">
            Dashboard
          </Link>
          <button className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Fixed Left Sidebar */}
        <aside 
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-[2px_0_8px_rgba(0,0,0,0.05)] z-40 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } flex flex-col`}
        >
          {loading ? (
             <div className="bg-[#3b41c5] text-white p-4 m-3 rounded-xl text-sm font-medium animate-pulse text-center">
               Loading...
             </div>
          ) : (
            <>
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-[#3b41c5] to-[#5b61e5] text-white p-5 m-3 rounded-xl shadow-sm flex flex-col items-center gap-3">
                <div className="relative w-16 h-16 rounded-full bg-white p-1">
                  <Image src={profile.image} fill alt="Profile" className="rounded-full object-cover" />
                </div>
                <div className="text-center">
                  <span className="block font-bold text-base leading-tight">{profile.name}</span>
                  <span className="block text-xs text-indigo-100 font-medium mt-0.5">Administrator</span>
                </div>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#f0f4f8] hover:text-[#3b41c5] transition-all font-semibold text-sm">
                  <Home className="w-5 h-5" /> Dashboard
                </Link>
                <Link href="/admin/dashboard/newusers" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#f0f4f8] hover:text-[#3b41c5] transition-all font-semibold text-sm">
                  <UserPlus className="w-5 h-5" /> Register Users
                </Link>
                <Link href="/employee/employee_list" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#f0f4f8] hover:text-[#3b41c5] transition-all font-semibold text-sm">
                  <Users className="w-5 h-5" /> Manage Users
                </Link>
                <Link href="/report" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#f0f4f8] hover:text-[#3b41c5] transition-all font-semibold text-sm">
                  <BarChart3 className="w-5 h-5" /> Reports
                </Link>
                <Link href="/admin/setting" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#f0f4f8] hover:text-[#3b41c5] transition-all font-semibold text-sm">
                  <Settings className="w-5 h-5" /> Settings
                </Link>
              </nav>

              <div className="p-4 mt-auto">
                <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 hover:text-gray-900 transition-colors shadow-sm">
                  <Moon className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </aside>

        {/* Mobile Sidebar Overlay */}
        {menuOpen && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden transition-opacity"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 w-full overflow-x-hidden md:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
