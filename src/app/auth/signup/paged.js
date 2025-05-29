"use client";

import { signup } from "@/store/Action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
});

const page = () => {
  const signupEmail = useSelector((state) => state.signupEmail);
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (values) => {
    dispatch(signup(values.email));
  };

  useEffect(() => {
    if (signupEmail) {
      router.push("/auth/register");
    }
  }, [signupEmail, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light1 dark:bg-dark1">
      <div className="bg-light1 dark:bg-dark1 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-dark1 dark:text-light1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 border border-lborder dark:border-dborder rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-indigo-600 text-light2 dark:text-dark2 rounded-md hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
              >
                {isSubmitting ? "Loading..." : "Next"}
              </button>

              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-800">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default page;
