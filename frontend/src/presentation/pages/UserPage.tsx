import axios from "axios";
import React, { useEffect } from "react";
import User from "../../domain/entity/user";
import { apiUrlPost, apiUrlUser } from "../../utils/constant";
import UserCard from "../components/UserCard/UserCard";
import user, { GetUserProfileByID } from "../../domain/api/user";
import Post from "../../domain/entity/post";
import PostItem from "../components/PostItem/PostItem";
import { Tabs } from "flowbite-react";
import { AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
  GetAllFollowersOfUser,
  GetAllFollowingOfUser,
} from "../../domain/api/follow";
import Avatar from "../components/Avatar/Avatar";
interface IProps {
  userID: string;
}
const UserPage: React.FC<IProps> = (props: IProps) => {
  const [currentUser, setCurrentUser] = React.useState<User>();
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  const [allFollowers, setAllFollowers] = React.useState<User[]>([]);
  const [tempData, setTempData] = React.useState<any[]>([]);
  const [allFollowing, setAllFollowing] = React.useState<User[]>([]);

  useEffect(() => {
    GetUserProfileByID(props.userID)
      .then((res: any) => {
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
        });
        setAllPosts(res.data.posts as Post[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    GetAllFollowersOfUser(Number(props.userID))
      .then((res: any) => {
        setAllFollowers(res.data as User[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    GetAllFollowingOfUser(Number(props.userID))
      .then((res: any) => {
        setTempData(res.data as any[]);
        for (let i = 0; i < tempData.length; i++) {
          GetUserProfileByID(tempData[i].user_id).then((res: any) => {
            allFollowing.push(res.data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <>
      {currentUser !== undefined && <UserCard user={currentUser} />}
      <Tabs.Group aria-label="Tabs with icons" style="underline">
        <Tabs.Item active={true} title="Posts" icon={MdOutlineSpaceDashboard}>
          <div className="grid grid-cols-3 gap-3 mt-5">
            {allPosts.map((allPosts: Post) => {
              return <PostItem post={allPosts} key={allPosts.id}/>;
            })}
          </div>{" "}
        </Tabs.Item>
        <Tabs.Item title="Followers" icon={AiOutlineUser}>
          <div className="justify-center items-center self-center">
            {allFollowers.map((follower: any) => {
              return (
                <Avatar
                  user={{
                    id: follower.user.id,
                    name: follower.user.name,
                    email: follower.user.email,
                  }}
                key={follower.user.id}/>
              );
            })}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Following" icon={AiOutlineUsergroupAdd}>
          <div className="justify-center items-center self-center">
            {allFollowing.map((following: any) => {
              return (
                <Avatar
                  user={{
                    id: following.id,
                    name: following.name,
                    email: following.email,
                  }}
                />
              );
            })}
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
};

export default UserPage;