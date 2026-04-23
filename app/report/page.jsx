'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PerformanceEvaluationCreate() {
  const [reportFile, setReportFile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch('https://dummyjson.com/c/304a-4c8c-48bd-8d4d'); // Replace with your get API endpoint
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
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7fc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fc] font-sans pb-24">
      {/* Generic Top Nav for Standalone Pages */}
      <nav className="bg-[#3b41c5] text-white h-16 flex items-center px-6 shadow-md fixed top-0 w-full z-50">
        <Link href="/" className="flex items-center gap-2 hover:text-indigo-200 transition">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold tracking-wide">Back to Home</span>
        </Link>
        <div className="ml-auto font-bold tracking-wide">Performance Reports</div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-28">
        {reportFile.map((user, index) => (
          <form
            key={index}
            action="/api/evaluations"
            method="GET"
            className="bg-white w-full border border-gray-200 rounded-2xl shadow-xl overflow-hidden mb-10"
          >
            <div className="bg-gradient-to-r from-[#3b41c5] to-[#5b61e5] text-white text-center p-8 border-b border-indigo-700 relative">
              <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Official Document
              </div>
              <div className="bg-white p-2 w-24 h-24 rounded-full mx-auto mb-4 shadow-lg">
                <Image
                  src={user.employeeEvaluation?.university?.logo || '/image/astuLogo.png'}
                  height={80}
                  width={80}
                  alt="ASTU Logo"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => { e.target.src = '/image/astuLogo.png' }}
                />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">{user.employeeEvaluation?.university?.name || 'ASTU'}</h1>
              <p className="text-indigo-100 mt-2 font-medium">
                1888 &nbsp;|&nbsp;
                {user.employeeEvaluation?.university?.contact?.phone || 'N/A'} &nbsp;|&nbsp;
                {user.employeeEvaluation?.university?.contact?.email || 'N/A'}
              </p>
              <p className="text-sm font-semibold mt-1 opacity-90">{user.employeeEvaluation?.university?.department || 'N/A'}</p>
            </div>

            <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50">
              <div className="p-4 text-center font-bold text-gray-700 border-r border-gray-100">
                {user.employeeEvaluation.evaluationDetails.summary}
              </div>
              <div className="p-4 text-center font-bold text-indigo-700">
                {user.employeeEvaluation.evaluationDetails.term}
              </div>
            </div>

            <div className="p-8 border-b border-gray-100 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Employee Name</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium">{user.employeeEvaluation.employeeInfo.name}</div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Type of Work</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium">{user.employeeEvaluation.employeeInfo.typeOfWork}</div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Job Type</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium">{user.employeeEvaluation.employeeInfo.jobType}</div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Evaluation Year</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium">{user.employeeEvaluation.employeeInfo.yearOfEvaluation}</div>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-bold text-gray-700">Evaluation Leader</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium">{user.employeeEvaluation.employeeInfo.evaluationLeader}</div>
              </div>
            </div>

            <div className="p-8 border-b border-gray-100 bg-gray-50 grid md:grid-cols-4 gap-6">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Leader (70%)</label>
                <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-indigo-700 font-bold text-center text-lg shadow-sm">{user.employeeEvaluation.marks.leaderMark70}</div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Self (5%)</label>
                <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-indigo-700 font-bold text-center text-lg shadow-sm">{user.employeeEvaluation.marks.selfMark5}</div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Behavior (10%)</label>
                <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-indigo-700 font-bold text-center text-lg shadow-sm">{user.employeeEvaluation.marks.leaderMark10}</div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Peer (15%)</label>
                <div className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-indigo-700 font-bold text-center text-lg shadow-sm">{user.employeeEvaluation.marks.peerMark15}</div>
              </div>
            </div>

            <div className="p-8">
              <label className="block mb-2 text-sm font-bold text-gray-700">Evaluation Summary</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium min-h-[80px] mb-8">{user.employeeEvaluation.summary}</div>

              <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div>
                  <label className="block mb-2 text-sm font-bold text-gray-700">Approver Name</label>
                  <input type="text" name="approverName" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3b41c5] outline-none transition" required placeholder="Full Name" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-gray-700">Digital Signature</label>
                  <input type="text" name="approverSign" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3b41c5] outline-none transition" required placeholder="Type initials" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-gray-700">Approval Date</label>
                  <input type="date" name="approverDate" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3b41c5] outline-none transition" required />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 text-right border-t border-gray-200">
              <button type="submit" className="bg-[#3b41c5] text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                Submit Official Evaluation
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}