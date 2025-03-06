"use client";
import { register } from "@/store/Action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";

const page = () => {
  const signupEmail = useSelector((state) => state.signupEmail);
  const registerSuccess = useSelector((state) => state.registerSuccess);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!signupEmail) {
      router.push(`/auth/signup`, { scroll: false });
    }
  }, [signupEmail]);

  useEffect(() => {
    if (registerSuccess) {
      router.push("/auth/login");
    }
  }, [registerSuccess]);

  const handleSubmit = (values) => {
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'image') {
        data.append(key, value);
      } else {
        data.append(key, value);
      }
    });
    dispatch(register(data));
  };

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
        verificationCode: "",
        name: "",
        email: signupEmail || "",
        phone: "",
        nId: "",
        image: null,
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-4 p-4 max-w-md mx-auto">
          <p className="text-red-500">
            Don't refresh the page. Don't change the page. If you do, you will lose this page..
          </p>
          <div>
            <Field
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <Field
              type="password"
              name="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div>
            <Field
              type="text"
              name="verificationCode"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Verification Code"
              required
            />
          </div>
          <div>
            <Field
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <Field
              type="text"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Phone"
              required
            />
          </div>
          <div>
            <Field
              type="text"
              name="nId"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="nId"
              required
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default page;
