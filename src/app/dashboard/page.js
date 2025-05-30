"use client";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { getDashboard } from "@/store/Action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
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
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    getDashboard(dispatch, setDashboardData);
  }, [dispatch]);

  if (!dashboardData || !dashboardData.success) {
    return <DashboardSkeleton />;
  }
  const summary = {
    teachers: dashboardData.teachersCount,
    students: dashboardData.studentsCount,
    uniqueBooksCount: dashboardData.uniqueBooksCount,
    availabeBooksCount: dashboardData.availabeBooksCount,
    totalBooksCount: dashboardData.totalBooksCount,
    teacherBorrow: dashboardData.currentBorrowTeachersCount,
    studentBorrow: dashboardData.currentBorrowStudentsCount,
    totalteacherBorrow: dashboardData.totalBorrowTeachersCount,
    totalstudentBorrow: dashboardData.totalBorrowStudentsCount,
  };

  const borrowRatio = [
    { name: "Teachers", value: summary.totalteacherBorrow },
    { name: "Students", value: summary.totalstudentBorrow },
  ];

  const summaryData = [
    { name: "Teachers", value: summary.teachers },
    { name: "Students", value: summary.students },
    { name: "Unique Books", value: summary.uniqueBooksCount },
    {
      name: "Total Books",
      value: summary.totalBooksCount,
    },
    { name: "Teacher Borrow", value: summary.teacherBorrow },
    { name: "Student Borrow", value: summary.studentBorrow },
    {
      name: "Available Books",
      value: summary.availabeBooksCount,
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700">
          📚 Library Dashboard
        </h1>
        <p className="text-bgd1 dark:text-bgl1 mt-2">
          Monitor borrowing, users, and book stats at a glance
        </p>
      </div>

      {/* Summary Chart */}
      <div className="rounded-2xl bg-bgl1 dark:bg-bgd1 shadow-xl p-6 mb-8 backdrop-blur-md border border-borl dark:border-bord">
        <h2 className="text-xl font-semibold text-bgd1 dark:text-bgl1 mb-4 text-center">
          📊 Library Summary
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={summaryData}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {summaryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    [
                      "#6366f1", // Indigo
                      "#10b981", // Emerald
                      "#f59e0b", // Amber
                      "#ef4444", // Red
                      "#3b82f6", // Blue
                      "#a855f7", // Purple
                      "#14b8a6", // Teal
                    ][index % 7]
                  } // Loop colors if more bars
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Two-Column Layout for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-bgl1 dark:bg-bgd1 rounded-2xl shadow-xl p-6  border border-borl dark:border-bord">
          <h2 className="text-lg font-semibold mb-4 text-indigo-600">
            🍰 Borrowing Ratio
          </h2>
          <ResponsiveContainer
            width="100%"
            height={window.innerWidth < 640 ? 220 : 300}
          >
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
                    fill={index % 2 === 0 ? "#a23ff1" : "#a8ab61"}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Department-wise Book Count */}
        <div className="bg-bgl1 dark:bg-bgd1 rounded-2xl shadow-xl p-6  border border-borl dark:border-bord">
          <h2 className="text-lg font-semibold mb-4 text-indigo-600">
            🏫 Books by Department
          </h2>
          <div className="overflow-x-auto">
            <div style={{ minWidth: "500px" }}>
              {" "}
              {/* Adjust width as needed */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(
                    dashboardData?.bookCountByDepartment || {}
                  ).map(([department, count]) => ({ department, count }))}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 80, bottom: 5 }} // more left margin for label
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey="department"
                    width={160}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {Object.entries(
                      dashboardData?.bookCountByDepartment || {}
                    ).map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          [
                            "#f59e0b",
                            "#14b8a6",
                            "#10b981",
                            "#8b5cf6",
                            "#ef4444",
                            "#3b82f6",
                            "#a855f7",
                          ][index % 7]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Borrow Trend */}
      <div className="bg-bgl1 dark:bg-bgd1 rounded-2xl shadow-xl p-6 border border-borl dark:border-bord">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          📈 Monthly Borrowing Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            // data={dashboardData.chartData || []}
            data={Array(4)
              .fill(dashboardData.chartData || [])
              .flat()}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="teachers" fill="#6366f1" name="Teacher Borrowings" />
            <Bar dataKey="students" fill="#10b981" name="Student Borrowings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
