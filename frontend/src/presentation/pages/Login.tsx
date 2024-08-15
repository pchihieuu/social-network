import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/Alerts/ErrorAlert";
import SuccessAlert from "../components/Alerts/SuccessAlert";
import { useForm, SubmitHandler } from "react-hook-form";
interface IFormInputs {
  email: string
  password: string
}
const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
      }).then((res) => {
        var data = res.data;
        console.log(data);
        console.log(data.data.token);
        localStorage.setItem("token", data.data.token);
        setRedirect(true);
      }).catch((err) => {
        setRedirect(false);
        console.log("there was an error: ", err);
        setErrorMessage(err.response.data.message);
      });
  }

  if (redirect) {
    return <Navigate to="/"/>;
  }


  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col justify-cener">
      <div className="max-w-md w-full mx-auto">
        {/* <div className="text-center font-medium text-xl">Login</div> */}
        
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Login
        </div>
        <br />
        {errorMessage && <ErrorAlert message={errorMessage} />}
        {successMessage && <SuccessAlert message={successMessage} />}
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-md">
        <form onSubmit={submit} action="" className="space-y-6">
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              name="email"
              type="text"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="/register" className="text-sm font-semibold text-gray-600 hover:text-blue-600 block text-center">
          Don't have an account? Sign up here.
          </a>
          <button className="w-full py-2 px-4 bg-blue-700 rounded-md text-white text-sm font-bold">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;