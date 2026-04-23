'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function DepartmentList() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch('https://dummyjson.com/c/b2d4-06cf-4b34-88c0')
        const data = await res.json()
        setDepartments(data)
      } catch (err) {
        console.error('Failed to fetch departments', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDepartments()
  }, [])

  return (
    <div className="min-h-screen bg-[#f4f7fc] font-sans pb-24">
      {/* Generic Top Nav for Standalone Pages */}
      <nav className="bg-[#3b41c5] text-white h-16 flex items-center px-6 shadow-md fixed top-0 w-full z-50">
        <Link href="/" className="flex items-center gap-2 hover:text-indigo-200 transition">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold tracking-wide">Back to Home</span>
        </Link>
        <div className="ml-auto font-bold tracking-wide">Global Departments</div>
      </nav>
      
      <div className="text-center mt-32 mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Department Directory
        </h1>
        <p className="text-gray-500 mt-2 text-lg font-medium">
          Monitor all active departments across the university.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <Card className="p-0 shadow-xl rounded-3xl bg-white border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 flex justify-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm md:text-base">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold text-left">Department Name</th>
                    <th className="px-6 py-4 font-bold text-left">Head of Department</th>
                    <th className="px-6 py-4 font-bold text-center">Employees</th>
                    <th className="px-6 py-4 font-bold text-left">Location</th>
                    <th className="px-6 py-4 font-bold text-left">Email</th>
                    <th className="px-6 py-4 font-bold text-center">Status</th>
                    <th className="px-6 py-4 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {departments.map((dept) => (
                    <tr
                      key={dept.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-gray-900">{dept.name}</td>
                      <td className="px-6 py-4 text-gray-600">{dept.head}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-900">{dept.employees}</td>
                      <td className="px-6 py-4 text-gray-600">{dept.location}</td>
                      <td className="px-6 py-4 text-[#3b41c5] font-medium hover:underline cursor-pointer">
                        {dept.email}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            dept.status === 'Active'
                              ? 'text-green-700 bg-green-100'
                              : 'text-red-700 bg-red-100'
                          }`}
                        >
                          {dept.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="px-4 py-1.5 bg-[#3b41c5]/10 text-[#3b41c5] font-bold rounded-lg text-sm hover:bg-[#3b41c5]/20 transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
