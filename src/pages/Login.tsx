import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import AuthContext from "../store/authContext";

const Login = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }

  const { login, signupWithGoogleAccount } = authContext;

  async function handleLoginWithGoogleAccount() {
    await signupWithGoogleAccount()
  }

  return (
    <div>
      <header className="text-center my-10">
        <h1 className="font-bold text-2xl uppercase text-orange-600">
          Welcome Back to Schedulify!
        </h1>
        <p className="mb-4 px-8 text-stone-500">
          We're glad to see you again. Log in to effortlessly manage your
          appointments and stay organized.
        </p>
      </header>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values.email, values.password);
          } catch (error) {
            console.error("Login failed:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
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
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
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
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <section className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-orange-500 px-8 py-2 rounded-md text-white font-semibold hover:bg-orange-700"
                disabled={isSubmitting}
              >
                Login
              </button>
              <p className="text-xs">
                Don't have an account?{" "}
                <Link className="text-sky-500 hover:underline" to="/signup">
                  Sign up
                </Link>
              </p>
            </section>
          </Form>
        )}
      </Formik>
      <div className="w-full h-[1px] bg-orange-600 my-2" />
      <section className="flex justify-center flex-col items-center">
        <p>OR</p>
        <button className="w-full bg-sky-500/45 py-2 mt-2 rounded-md flex items-center justify-center gap-4">
          <FcGoogle />
          <button onClick={handleLoginWithGoogleAccount}>
            Google account
          </button>
        </button>
      </section>
    </div>
  );
};

export default Login;
