import { ErrorMessage, Field, Form, Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Signup = () => (
  <div>
    <header className="text-center my-10">
      <h1 className="font-bold text-2xl uppercase text-orange-600">
        Join Schedulify Today!
      </h1>
      <p className="mb-4 px-8 text-stone-500 ">
        Create your account and experience the ease of managing your
        appointments effortlessly. Sign up now to get started!
      </p>
    </header>
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("required"),
        password: Yup.mixed().required("Password which be of mixed characters"),
      })}
      onSubmit={(value) => console.log(value)}
    >
      <Form>
        <div className="flex flex-col mb-3 gap-y-1">
          <label className="px-2" htmlFor="email">
            Email
          </label>
          <Field
            name="email"
            type="text"
            className="border py-1 px-2 rounded-md bg-white"
          />
          <ErrorMessage name="email" />
        </div>

        <div className="flex flex-col mb-3 gap-y-1">
          <label htmlFor="password" className="px-2">
            Password
          </label>
          <Field
            name="password"
            type="password"
            className="border py-1 px-2 rounded-md bg-white"
          />
          <ErrorMessage name="password" />
        </div>
        <section className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-orange-500 px-8 py-2 rounded-md text-white font-semibold hover:bg-orange-700"
          >
            Signup
          </button>
          <p className="text-xs">
            Already have an account{" "}
            <Link className="text-sky-500 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </section>
      </Form>
    </Formik>
    <div className="w-full h-[1px] bg-orange-600 my-2" />
    <section className="flex justify-center flex-col items-center">
      <p>OR</p>
      <button className="w-full bg-sky-500/45 py-2 mt-2 rounded-md flex items-center justify-center gap-4">
        <FcGoogle />
        <span>Google account</span>
      </button>
    </section>
  </div>
);

export default Signup;
