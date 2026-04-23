'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PeerEvaluationForm() {
  const [year] = useState(new Date().getFullYear());
  const [typeOfWork, setTypeOfWork] = useState('');
  const [rank, setRank] = useState('');
  const [tasks, setTasks] = useState([{ no: '', task: '', score: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([]);
  const [evaluateeId, setEvaluateeId] = useState('');

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch('/api/team/members');
        const data = await res.json();
        setMembers(Array.isArray(data.users) ? data.users : []);
      } catch (_) {
        setMembers([]);
      }
    }
    loadMembers();
  }, []);

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { no: '', task: '', score: '' }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = { typeOfWork, rank, year, tasks, evaluateeId };

    try {
      const res = await fetch('/api/peer-evaluation/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMessage('Form submitted successfully!');
        setTypeOfWork('');
        setRank('');
        setTasks([{ no: '', task: '', score: '' }]);
        setEvaluateeId('');
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage(`Failed to submit form${err?.error ? `: ${err.error}` : ''}`);
      }
    } catch (err) {
      setMessage('Error submitting form.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center space-y-4">
        <Image
          src="/image/astuLogo.png"
          alt="ASTU Logo"
          width={80}
          height={80}
          className="rounded-full shadow-sm border border-gray-100"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Adama Science And Technology University
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Peer Evaluation Form for Behavioral and Task (10%)
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex flex-col text-sm font-semibold text-gray-700 w-full col-span-1 sm:col-span-2">
            Select Peer (same team)
            <select
              value={evaluateeId}
              onChange={(e) => setEvaluateeId(e.target.value)}
              className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none transition-all"
              required
            >
              <option value="">Choose team member</option>
              {members.map((m) => (
                <option key={m._id || m.id} value={m._id || m.id}>
                  {m.fullName || m.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm font-semibold text-gray-700 w-full">
            Type of Work Evaluation
            <input
              type="text"
              value={typeOfWork}
              onChange={(e) => setTypeOfWork(e.target.value)}
              placeholder="Enter type"
              className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none transition-all"
              required
            />
          </label>
          <label className="flex flex-col text-sm font-semibold text-gray-700 w-full">
            Rank
            <input
              type="text"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="Enter rank"
              className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none transition-all"
              required
            />
          </label>
        </div>

        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
          <p className="text-gray-700 font-semibold text-sm">Year of Evaluation: <span className="text-[#8D92EB]">{year}</span></p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b border-gray-100 pb-2">
            Task Evaluation <span className="text-[#8D92EB]">(10%)</span>
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm text-center bg-white">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600 w-16">No.</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 text-left">Tasks</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Out of (100%)</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.map((task, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 w-16">
                      <input
                        type="number"
                        value={task.no}
                        onChange={(e) =>
                          handleTaskChange(index, 'no', e.target.value)
                        }
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none"
                        required
                      />
                    </td>
                    <td className="px-4 py-3 text-left">
                      <input
                        type="text"
                        value={task.task}
                        onChange={(e) =>
                          handleTaskChange(index, 'task', e.target.value)
                        }
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none"
                        required
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={task.score}
                        onChange={(e) =>
                          handleTaskChange(index, 'score', e.target.value)
                        }
                        className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none"
                        required
                      />
                    </td>
                    <td className="px-4 py-3">
                      {tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTask(index)}
                          className="text-red-500 hover:text-red-700 font-semibold px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addTask}
            className="text-sm bg-gray-100 text-gray-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + Add Task
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-xl text-center font-medium text-sm ${message.includes('Error') || message.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#8D92EB] text-white font-semibold px-10 py-3 rounded-xl shadow-sm hover:bg-[#7a7fd8] transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Evaluation'}
          </button>
        </div>
      </form>
    </div>
  );
}