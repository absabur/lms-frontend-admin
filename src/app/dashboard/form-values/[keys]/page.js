"use client";
import { fixdeValues } from "@/store/Action";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const { keys } = useParams();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fixed-values/${keys}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: inputValue,
          }),
        }
      );

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      dispatch({
        type: "MESSAGE",
        payload: { message: `${keys} added!`, status: "success" },
      });
      dispatch(fixdeValues());
      setInputValue("");
    } catch (error) {
      dispatch({
        type: "MESSAGE",
        payload: { message: `${keys} can't add!`, status: "error" },
      });
      console.error("API error:", error.message);
    }
  };

  const fixedValues = useSelector((state) => state.fixedValues);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fixdeValues({
        countries: true,
        languages: true,
        shelves: true,
        departments: true,
        sessions: true,
        shifts: true,
        districts: true,
        posts: true,
        upazilas: true,
      })
    );
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-bgd1 dark:text-bgl1">
        {keys?.toUpperCase()}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fixedValues[keys]?.map((item) => (
          <div key={item._id} className="w-full">
            <div className="border dark:border-bord p-4 rounded-xl shadow-sm hover:shadow-md bg-bgl1 dark:bg-bgd1 hover:bg-gray-50 transition-all duration-200">
              <h3 className="text-base font-medium text-bgd1 dark:text-bgl1 capitalize truncate">
                {item.name}
              </h3>
            </div>
          </div>
        ))}

        <div className="w-full">
          <div className="border dark:border-bord p-4 rounded-xl shadow-sm bg-bgl1 dark:bg-bgd1 hover:bg-gray-50 transition-all duration-200">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add new value"
                className="border border-borl dark:border-bord px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="submit"
                className="bg-buttonp hover:bg-buttona font-medium px-4 py-2 rounded-md hover:bg-button1 dark:bg-button3 transition"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
