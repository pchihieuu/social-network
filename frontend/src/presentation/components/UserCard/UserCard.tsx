import { Card, Dropdown } from "flowbite-react";
import React, { useEffect } from "react";
import logo from "../../../assets/logo.png";
import {
  FollowUser,
  IsFollowing,
  UnfollowUser,
} from "../../../domain/api/follow";
import user from "../../../domain/entity/user";
interface IUser {
  user: user;
}
const UserCard: React.FC<IUser> = (IUser) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  useEffect(() => {
    IsFollowing(IUser.user.id)
      .then((res: any) => {
        if (res.data) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleFollow():
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined {
    if (isFollowing) {
      return () => {
        UnfollowUser(IUser.user.id)
          .then((res: any) => {
            setIsFollowing(false);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    } else {
      return () => {
        FollowUser(IUser.user.id)
          .then((res: any) => {
            setIsFollowing(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }
  }

  return (
    <>
      <div className="max-w-md w-full mx-auto">
        <div className="max-w-sm">
          <Card>
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 h-24 w-24 rounded-full shadow-lg"
                src="https://i.pravatar.cc/128"
                alt="Avatar image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {IUser.user.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {IUser.user.email}
              </span>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <button
                  onClick={handleFollow()}
                  style={{ backgroundColor: isFollowing ? "gray" : "#1d4ed8" }}
                  className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Message
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