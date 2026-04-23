"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function EmployeeProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data to match the screenshot layout until real data is hooked up
  useEffect(() => {
    // Simulate fetching user
    setTimeout(() => {
      setUser({
        fullName: "Kenenisa Beyan Habesha",
        idNumber: "UGR/30772/15",
        admissionYear: "2022/2023",
        dormitory: "B359, R-44",
        program: "Computer Science and Engineering",
        admission: "Undergraduate Regular",
        classYear: "Fourth Year",
        section: "Section 2",
        profileImage: "/image/astuLogo.png", // fallback image
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#0ea5e9]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
        {/* Teal Header */}
        <div className="bg-[#17a2b8] px-4 py-2 flex items-center text-white">
          <Calendar className="w-5 h-5 mr-2" />
          <h2 className="text-sm font-medium">Upcoming Events</h2>
        </div>

        {/* Profile Details Content */}
        <div className="p-6 flex flex-col md:flex-row gap-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-48 h-56 relative overflow-hidden rounded-md border border-gray-300 shadow-sm bg-gradient-to-b from-gray-800 to-gray-600">
              {/* If you have a real image, it goes here */}
              {user?.profileImage && (
                <Image
                  src={user.profileImage}
                  alt={user.fullName || "Profile"}
                  fill
                  className="object-cover opacity-90"
                />
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm mt-2">
            <div className="space-y-4">
              <div>
                <span className="font-bold text-gray-800">Full Name:</span>{" "}
                <span className="text-gray-600">{user?.fullName}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">ID Number:</span>{" "}
                <span className="text-gray-600">{user?.idNumber}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">Admission Year:</span>{" "}
                <span className="text-gray-600">{user?.admissionYear}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">Dormitory:</span>{" "}
                <span className="text-gray-600">{user?.dormitory}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-bold text-gray-800">Program:</span>{" "}
                <span className="text-gray-600">{user?.program}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">Admission:</span>{" "}
                <span className="text-gray-600">{user?.admission}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">Class Year:</span>{" "}
                <span className="text-gray-600">{user?.classYear}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">Section:</span>{" "}
                <span className="text-gray-600">{user?.section}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table Section */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4">
        <div className="flex items-center mb-4 text-gray-800 font-bold">
          <Calendar className="w-4 h-4 mr-2" />
          <h3 className="text-sm">Upcoming Events</h3>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-800 font-bold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Admission For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">February 16, 2026 - April 23, 2026</td>
                <td className="px-4 py-3">Add and drop Approval 2025/2026 Second Semester</td>
                <td className="px-4 py-3">Undergraduate Regular</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">February 9, 2026 - May 29, 2026</td>
                <td className="px-4 py-3">Continuous Assessment 2025/2026 Second Semester</td>
                <td className="px-4 py-3">Undergraduate Regular</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">February 9, 2026 - June 7, 2026</td>
                <td className="px-4 py-3">Grade submission 2025/2026 Second Semester</td>
                <td className="px-4 py-3">Undergraduate Regular</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
