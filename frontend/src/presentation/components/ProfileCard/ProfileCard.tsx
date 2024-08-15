import { Card, Dropdown } from "flowbite-react";
import React from "react";
import logo from "../../../assets/logo.png";
import user from "../../../domain/entity/user";
import { LOCAL_URL } from "../../../utils/constant";
interface IUser {
  user: user;
}
const UserCard: React.FC<IUser> = (IUser) => {
  let UserUrl = "http://localhost:3000/user/" + IUser.user.id;

  return (
    <>
      <div className="max-w-md w-full mx-auto">
        <div className="max-w-sm">
          <Card>
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <a href={UserUrl}>
                <img
                  className="mb-3 h-24 w-24 rounded-full shadow-lg"
                  src="https://i.pravatar.cc/128"
                  alt="Avatar image"
                />
              </a>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {IUser.user.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {IUser.user.email}
              </span>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <a
                  href={LOCAL_URL + "user/profile/update"}
                  className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update Profile
                </a>
                <a
                  href="/logout"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Log Out
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserCard;