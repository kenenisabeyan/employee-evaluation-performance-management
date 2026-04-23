'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PeerAndSelfReportPage() {
  const [reportFile, setReportFile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch(''); // Replace with your get API endpoint
        const data = await res.json();
        setReportFile(Array.isArray(data) ? data : []);
      } catch (err) {
        setReportFile([]);
      }
      setLoading(false);
    }
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
        Peer & Self Evaluation Reports
      </h1>
      
      <div className="flex flex-col gap-8">
        {reportFile.map((user, index) => (
          <div
            key={index}
            className="bg-white w-full rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Report Header */}
            <div className="bg-[#8D92EB] text-white text-center p-6 border-b border-gray-100">
              <Image
                src={user.employeeEvaluation?.university?.logo || '/image/astuLogo.png'}
                height={80}
                width={80}
                alt="ASTU Logo"
                className="mx-auto w-20 h-20 mb-3 rounded-full bg-white p-1 object-contain"
                sizes="80px"
                onError={(e) => {
                  e.target.src = '/image/astuLogo.png'
                }}
              />
              <h2 className="text-2xl font-bold tracking-tight">{user.employeeEvaluation?.university?.name || 'ASTU'}</h2>
              <p className="text-sm mt-2 opacity-90">
                1888 &nbsp;|&nbsp; 
                {user.employeeEvaluation?.university?.contact?.phone || 'N/A'} &nbsp;|&nbsp; 
                {user.employeeEvaluation?.university?.contact?.fax || 'N/A'} &nbsp;|&nbsp; 
                {user.employeeEvaluation?.university?.contact?.email || 'N/A'}
              </p>
              <p className="text-xs italic mt-1 font-medium">{user.employeeEvaluation?.university?.department || 'N/A'}</p>
            </div>

            {/* Summary & Term Headers */}
            <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50 text-gray-700">
              <div className="p-3 text-center font-bold border-r border-gray-100 text-sm">
                {user.employeeEvaluation?.evaluationDetails?.summary || 'N/A'}
              </div>
              <div className="p-3 text-center font-bold text-sm">
                {user.employeeEvaluation?.evaluationDetails?.term || 'N/A'}
              </div>
            </div>

            {/* Main Info Form Grid */}
            <div className="p-6 border-b border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Employee Name</label>
                <div className="bg-gray-50 border border-gray-200 w-full p-2.5 rounded-lg text-gray-800 text-sm font-medium">
                  {user.employeeEvaluation?.employeeInfo?.name || 'N/A'}
                </div>
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Type of work</label>
                <div className="bg-gray-50 border border-gray-200 w-full p-2.5 rounded-lg text-gray-800 text-sm font-medium">
                  {user.employeeEvaluation?.employeeInfo?.typeOfWork || 'N/A'}
                </div>
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Job type</label>
                <div className="bg-gray-50 border border-gray-200 w-full p-2.5 rounded-lg text-gray-800 text-sm font-medium">
                  {user.employeeEvaluation?.employeeInfo?.jobType || 'N/A'}
                </div>
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Year of evaluation</label>
                <div className="bg-gray-50 border border-gray-200 w-full p-2.5 rounded-lg text-gray-800 text-sm font-medium">
                  {user.employeeEvaluation?.employeeInfo?.yearOfEvaluation || 'N/A'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 col-span-1 sm:col-span-2">
                <div>
                  <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Signature</label>
                  <div className="bg-gray-50 border border-gray-200 w-full p-2.5 rounded-lg text-gray-800 text-sm italic">
                    {user.employeeEvaluation?.employeeInfo?.sign || 'Not signed'}
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">Date</label>
                  <div className="bg-gray-50 border border-gray-200 w-full p-2.5 rounded-lg text-gray-800 text-sm font-medium">
                    {user.employeeEvaluation?.employeeInfo?.date || 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Marks Grid */}
            <div className="p-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Self mark (5%)</span>
                <span className="text-2xl font-black text-[#8D92EB]">{user.employeeEvaluation?.marks?.selfMark5 || '0'}</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Peer mark (15%)</span>
                <span className="text-2xl font-black text-[#8D92EB]">{user.employeeEvaluation?.marks?.peerMark15 || '0'}</span>
              </div>
            </div>
          </div>
        ))}

        {reportFile.length === 0 && (
          <div className="py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200 border-dashed">
            No evaluation reports available.
          </div>
        )}
      </div>
    </div>
  );
}