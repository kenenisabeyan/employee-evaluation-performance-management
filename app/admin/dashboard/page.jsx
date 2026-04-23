'use client'

import React from 'react'
import Link from 'next/link'
import { Users, UserPlus, Settings, BarChart3, Search } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Manage employees, monitor activity, and configure the ASTU portal.
          </p>
        </div>
        
        <div className="flex items-center w-full md:max-w-md bg-white rounded-full shadow-sm border border-gray-200 px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#3b41c5]/50 focus-within:border-[#3b41c5] transition-all">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            id="search"
            type="text"
            placeholder="Search employees or departments..."
            className="w-full bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400 font-medium"
          />
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/dashboard/newusers"
          className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <UserPlus size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-5 group-hover:text-indigo-600 transition-colors">Register User</h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Onboard new employees securely.
          </p>
        </Link>

        <Link
          href="/employee/employee_list"
          className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-green-100 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <Users size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-5 group-hover:text-green-600 transition-colors">Manage Users</h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            View or update account access.
          </p>
        </Link>

        <Link
          href="/report"
          className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-amber-100 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
            <BarChart3 size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-5 group-hover:text-amber-600 transition-colors">Analytics</h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Track evaluation metrics.
          </p>
        </Link>

        <Link
          href="/admin/setting"
          className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-purple-100 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Settings size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-5 group-hover:text-purple-600 transition-colors">Settings</h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            System configs and roles.
          </p>
        </Link>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-[#3b41c5] to-[#5b61e5] rounded-2xl p-8 shadow-md text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back to the Admin Portal</h2>
        <p className="text-indigo-100 font-medium max-w-2xl leading-relaxed">
          Ensure that performance evaluations are tracked and managed properly across the university. From here you have full access to generate reports, update access lists, and create overarching systemic configurations.
        </p>
      </div>

    </div>
  )
}
