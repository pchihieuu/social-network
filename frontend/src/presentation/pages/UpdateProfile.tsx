import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ErrorAlert from "../components/Alerts/ErrorAlert";
import SuccessAlert from "../components/Alerts/SuccessAlert";
import user from "../../domain/entity/user";
import { apiUrlUser } from "../../utils/constant";
import { GetUserProfile, UpdateUserProfile } from "../../domain/api/user";

const UpdateProfile = () => {
  const [currentUser, setCurrentUser] = useState<user>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    GetUserProfile()
      .then((res) => {
        setCurrentUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    UpdateUserProfile(name, email)
      .then((res) => {
        setSuccessMessage(res.data.message);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        setRedirect(false);
        setErrorMessage(err.response.data.message);
      });
  };

  if (redirect) {
    return <Navigate to="/user/profile" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-cener">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Update Your Profile
        </div>
        <br />
        {errorMessage && <ErrorAlert message={errorMessage} />}
        {successMessage && <SuccessAlert message={successMessage} />}
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
              required
              placeholder={currentUser?.name}
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
              placeholder={currentUser?.email}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="w-full py-2 px-4 bg-blue-700 rounded-md text-white text-sm font-bold">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;