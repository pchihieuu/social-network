import React from "react";
import User from "../../../domain/entity/user";
import { URL_USER } from "../../../utils/constant";
interface IProps {
  user: User;
}
const Avatar: React.FC<IProps> = (props: IProps) => {
  let userUrl = `${URL_USER}${props.user.id}`;
  return (
    <>
      <a href={userUrl}>
        <div className="hover:bg-gray-100 flex items-center space-x-4 p-4 ease-in duration-300">
          <img
            className="w-10 h-10 rounded-full"
            src="https://i.pravatar.cc/128"
            alt=""
          />
          <div className="font-medium dark:text-white">
            <div>{props.user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {props.user.email}
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default Avatar;