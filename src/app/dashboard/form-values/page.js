"use client";
import Loading from "@/components/Loading";
import { fixdeValues } from "@/store/Action";
import { LOADING_END, LOADING_START } from "@/store/Constant";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const fixedValues = useSelector((state) => state.fixedValues);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fixdeValues());
  }, []);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Loading manualLoading={!fixedValues.countries}/>
      {Object.entries(fixedValues).map(([key, value]) => (
        <Link href={`/dashboard/form-values/${key}`} key={key}>
          <div className="border p-4 rounded-lg shadow-md hover:bg-gray-100 transition">
            <h3 className="text-sm text-gray-600 capitalize">
              {key} ({fixedValues[key].length})
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
