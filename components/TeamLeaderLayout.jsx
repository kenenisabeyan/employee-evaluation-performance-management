'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Home, User, Menu, Moon } from 'lucide-react'

// Layout component combining Navbar and Sidebar
export default function TeamLeaderLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState({ name: 'Team Leader', image: '/image/astuLogo.png' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const data = await res.json()
          setProfile({
            name: data.user?.fullName || 'Team Leader',
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
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#8D92EB] text-white z-50 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-1 mr-2 rounded hover:bg-white/20"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
             <Image src="/image/astuLogo.png" width={40} height={40} alt="Logo" className="object-contain" />
          </div>
          <span className="text-lg font-semibold tracking-wide">Team Leader</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/team-leader/dashboard" className="text-sm font-medium hover:text-white/80 transition-colors">
            Home
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
             <div className="bg-[#8D92EB] text-white p-4 m-2 rounded text-sm font-medium">
               Loading...
             </div>
          ) : (
            <>
              {/* Profile Card inside Sidebar */}
              <div className="bg-[#8D92EB] text-white p-4 m-2 rounded-md shadow flex flex-col items-center gap-2">
                <Image src={profile.image} width={60} height={60} alt="Profile" className="rounded-full bg-white object-cover" />
                <span className="font-semibold text-center leading-tight">{profile.name}</span>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <Link href="/team-leader/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-[#f0f4f8] hover:text-[#8D92EB] transition-colors font-medium text-sm">
                  <Home className="w-5 h-5" /> Home
                </Link>
                <Link href="/team-leader/teams" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-[#f0f4f8] hover:text-[#8D92EB] transition-colors font-medium text-sm">
                  <User className="w-5 h-5" /> Teams
                </Link>
                <Link href="/team-leader/peer-evaluation" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-[#f0f4f8] hover:text-[#8D92EB] transition-colors font-medium text-sm">
                  <User className="w-5 h-5" /> Create Peer Tasks
                </Link>
                <Link href="/team-leader/self-evaluationform" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-[#f0f4f8] hover:text-[#8D92EB] transition-colors font-medium text-sm">
                  <User className="w-5 h-5" /> Create Self Evaluation
                </Link>
              </nav>

              <div className="p-4 mt-auto">
                <button className="w-10 h-10 rounded-full bg-[#2A2E33] text-white flex items-center justify-center hover:bg-black transition-colors">
                  <Moon className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </aside>

        {/* Mobile Sidebar Overlay */}
        {menuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Main Content Area - Pushed right on desktop to account for fixed sidebar */}
        <main className="flex-1 p-6 md:p-10 w-full overflow-x-hidden md:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
