'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminEvaluationForm() {
  const [users, setUsers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', weight: '', rank: 0 });
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/team/members');
        const data = await res.json();
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (err) {
        setUsers([]);
      }
    }
    fetchUsers();
  }, []);

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    const employee = users.find((u) => (u._id || u.id) === empId);
    setSelectedEmployee(employee || null);
  };

  const handleRankChange = (index, value) => {
    const updatedTasks = [...taskData];
    updatedTasks[index].rank = Number(value);
    setTaskData(updatedTasks);
  };

  const getScore = (rank, weight) => ((rank * weight) / 4) * 0.7;
  const totalRank = taskData.reduce((acc, item) => acc + (item.rank || 0), 0);
  const total = taskData.reduce((acc, item) => acc + getScore(item.rank || 0, item.weight || 0), 0);

  const handleAddTask = () => {
    if (!newTask.name || !newTask.weight) return;
    setTaskData([...taskData, { ...newTask, id: Date.now() }]);
    setNewTask({ name: '', weight: '', rank: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      setMessage('Please select an employee before submitting.');
      return;
    }

    if (taskData.length === 0) {
      setMessage('Please add at least one task.');
      return;
    }

    const payload = {
      title: `Leader Evaluation Tasks (${new Date().getFullYear()})`,
      description: 'Tasks for 70% leader evaluation',
      assignedTo: selectedEmployee._id || selectedEmployee.id,
      priority: 'medium',
      category: 'other',
      evaluationCriteria: taskData.map((t) => ({ criterion: t.name, weight: Number(t.weight) })),
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      maxScore: 70
    };

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create tasks');

      setMessage('Tasks created successfully!');
      setSelectedEmployee(null);
      setTaskData([]);
      setNewTask({ name: '', weight: '', rank: 0 });
    } catch (error) {
      console.error(error);
      setMessage('Error submitting evaluation.');
    } finally {
      setLoading(false);
    }
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
            Adama Science and Technology University
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Admin/Leader Task Evaluation Form (70%)
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8"
      >
        <div className="grid grid-cols-1 gap-6">
          <label className="flex flex-col text-sm font-semibold text-gray-700 w-full">
            Select Employee:
            <select
              className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none transition-all"
              onChange={handleEmployeeChange}
              value={(selectedEmployee?._id || selectedEmployee?.id) || ''}
            >
              <option value="">Choose an employee</option>
              {users.map((emp) => (
                <option key={emp._id || emp.id} value={emp._id || emp.id}>
                  {emp.fullName || emp.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedEmployee && (
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-wrap gap-4 text-sm font-medium text-gray-800">
            <span className="bg-white px-3 py-1.5 rounded-lg border border-indigo-100"><strong>Employee Name:</strong> {selectedEmployee.name || selectedEmployee.fullName}</span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-indigo-100"><strong>Year:</strong> {selectedEmployee.year || new Date().getFullYear()}</span>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b border-gray-100 pb-2">
            Task Evaluation <span className="text-[#8D92EB]">(70%)</span>
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm text-center bg-white">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-3 font-semibold text-gray-600">No.</th>
                  <th className="px-3 py-3 font-semibold text-gray-600 text-left">Task Listed</th>
                  <th className="px-3 py-3 font-semibold text-gray-600">Task Division (100%)</th>
                  <th colSpan={4} className="px-3 py-3 font-semibold text-gray-600">Task Division Out of 24</th>
                  <th className="px-3 py-3 font-semibold text-gray-600">Result Out of 70%</th>
                </tr>
                <tr className="bg-gray-100 text-xs border-b border-gray-200">
                  <th colSpan={3}></th>
                  {[1, 2, 3, 4].map((n) => (
                    <th key={`rank-header-${n}`} className="px-2 py-2 font-medium">{n}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {taskData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-3">{i + 1}</td>
                    <td className="px-2 py-3 text-left font-medium">{item.name}</td>
                    <td className="px-2 py-3">{item.weight}</td>
                    {[1, 2, 3, 4].map((num) => (
                      <td key={`rank-${item.id}-${num}`} className="px-2 py-3">
                        <input
                          type="radio"
                          name={`rank-${i}`}
                          value={num}
                          checked={item.rank === num}
                          onChange={() => handleRankChange(i, num)}
                          className="cursor-pointer accent-[#8D92EB] w-4 h-4"
                        />
                      </td>
                    ))}
                    <td className="px-2 py-3 font-bold text-[#8D92EB]">
                      {getScore(item.rank, item.weight).toFixed(2)}
                    </td>
                  </tr>
                ))}

                <tr className="bg-gray-50">
                  <td className="px-2 py-3 text-gray-500 font-bold">+</td>
                  <td className="px-2 py-3">
                    <input
                      type="text"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none text-sm"
                      placeholder="New task name"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <input
                      type="number"
                      value={newTask.weight}
                      onChange={(e) => setNewTask({ ...newTask, weight: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#8D92EB]/50 focus:border-[#8D92EB] outline-none text-sm"
                      placeholder="%"
                    />
                  </td>
                  <td colSpan={4} className="px-2 py-3">
                    <button
                      type="button"
                      onClick={handleAddTask}
                      className="text-xs bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors w-full"
                    >
                      Add Task
                    </button>
                  </td>
                  <td className="px-2 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 flex justify-between items-center text-gray-700">
              <span className="font-semibold text-sm">Total Rank</span>
              <span className="font-bold text-lg">{totalRank.toFixed(2)}</span>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4 flex justify-between items-center text-gray-700">
              <span className="font-semibold text-sm text-[#8D92EB]">Total Score (70%)</span>
              <span className="font-bold text-lg text-[#8D92EB]">{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-xl text-center font-medium text-sm ${message.includes('Error') || message.includes('Failed') || message.includes('Please') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
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