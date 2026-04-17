'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function EmployeeProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/employee/profile')
        if (!res.ok) {
          throw new Error('Failed to load profile')
        }
        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        setError(err.message || 'Unable to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400"></div>
          <p className="mt-4 text-slate-300">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
        <div className="max-w-xl rounded-3xl bg-slate-900/90 border border-white/10 p-10 text-center shadow-2xl">
          <h1 className="text-2xl font-semibold mb-4">Profile unavailable</h1>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link href="/" className="inline-flex rounded-full bg-sky-500 px-6 py-3 text-white font-semibold hover:bg-sky-400 transition">
            Return home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-sky-400 shadow-xl">
                <Image
                  src={user.profileImage || '/image/astuLogo.png'}
                  alt={user.fullName || 'Employee profile'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white">{user.fullName || 'No Name'}</h1>
                <p className="mt-2 text-slate-400">{user.position || 'Employee'} • {user.department || 'No department assigned'}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/employee/employee_profile_edit"
                className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Edit profile
              </Link>
              <Link
                href="/employee/employee-dashboard"
                className="rounded-full border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-4">Contact</p>
              <div className="space-y-3 text-slate-100">
                <p><span className="font-semibold text-white">Email:</span> {user.email || 'N/A'}</p>
                <p><span className="font-semibold text-white">Phone:</span> {user.phone || 'N/A'}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-4">Work</p>
              <div className="space-y-3 text-slate-100">
                <p><span className="font-semibold text-white">Role:</span> {user.position || 'N/A'}</p>
                <p><span className="font-semibold text-white">Status:</span> {user.isActive ? 'Active' : 'Inactive'}</p>
                <p><span className="font-semibold text-white">Department:</span> {user.department || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-4">Location</p>
              <p className="text-slate-100">{user.country || 'Not specified'}, {user.region || 'Not specified'}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 mb-4">Emergency Contact</p>
              <p className="text-slate-100">{user.emgName || 'N/A'}</p>
              <p className="text-slate-100">{user.emgRelation || 'N/A'}</p>
              <p className="text-slate-100">{user.emgContact || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
