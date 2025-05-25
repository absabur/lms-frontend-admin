"use client";
import { getDashboard } from "@/store/Action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const dashboardData = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  // Fallback if data is still loading
  if (!dashboardData || !dashboardData.success) {
    return <div className="p-6">Loading...</div>;
  }

  // Real summary data
  const summary = {
    teachers: dashboardData.teachersCount,
    students: dashboardData.studentsCount,
    totalBooks: dashboardData.booksCount,
    teacherBorrow: dashboardData.currentBorrowTeachersCount,
    studentBorrow: dashboardData.currentBorrowStudentsCount,
  };

  const borrowRatio = [
    { name: "Teachers", value: summary.teacherBorrow },
    { name: "Students", value: summary.studentBorrow },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Teachers", value: summary.teachers },
          { label: "Students", value: summary.students },
          { label: "Total Books", value: summary.totalBooks },
          { label: "Teacher Borrow", value: summary.teacherBorrow },
          { label: "Student Borrow", value: summary.studentBorrow },
          {
            label: "Available Books",
            value:
              summary.totalBooks -
              (summary.teacherBorrow + summary.studentBorrow),
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white shadow rounded-2xl p-4 text-center border border-gray-100"
          >
            <div className="text-gray-500 text-sm font-medium">
              {item.label}
            </div>
            <div className="text-xl font-bold text-gray-800">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-2">Monthly Borrowing Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData.chartData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="teachers" fill="#8884d8" name="Teacher Borrowings" />
            <Bar dataKey="students" fill="#82ca9d" name="Student Borrowings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie and Line Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">Borrowing Ratio</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={borrowRatio}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {borrowRatio.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#0088FE" : "#00C49F"}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-2">New Users Over Time</h2>
          <div className="text-sm text-gray-500">
            * No real user registration chart data available yet.
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="teachers" stroke="#8884d8" />
              <Line type="monotone" dataKey="students" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
