import React, { SyntheticEvent, useState } from "react";
import { Navigate } from 'react-router-dom';

interface Props {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    const data = await response.json();
    setRedirect(true);
    console.log(data);
  };
  if (redirect) {
    return <Navigate to="/login"/>;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-cener">
      <div className="max-w-md w-full mx-auto">
        {/* <div className="text-center font-medium text-xl">Register</div> */}
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Register
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-md">
        <form onSubmit={submit} action="" className="space-y-6">
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              name="email"
              type="email"
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

          <button className="w-full py-2 px-4 bg-green-500 rounded-md text-white text-sm font-bold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;