"use client";
import Loading from "@/components/Loading";
import { fixdeValues } from "@/store/Action";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
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

  const isLoading = !fixedValues.countries;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {isLoading
        ? Array(9)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border p-4 rounded-lg shadow-md animate-pulse bg-light1 dark:bg-dark1"
              >
                <div className="h-4 w-2/3 bg-light1 dark:bg-dark1 rounded" />
              </div>
            ))
        : Object.entries(fixedValues).map(([key, value]) => (
            <Link href={`/dashboard/form-values/${key}`} key={key}>
              <div className="border p-4 rounded-lg bg-light1 dark:bg-dark1 shadow-md hover:bg-light1 dark:bg-dark1 transition">
                <h3 className="text-sm text-dark1 dark:text-light1 capitalize">
                  {key} ({value.length})
                </h3>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default page;
