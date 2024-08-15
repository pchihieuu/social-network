import axios from "axios";
import React, { useEffect } from "react";
import User from "../../domain/entity/user";
import { apiUrlPost, apiUrlUser } from "../../utils/constant";
import { GetUserProfile } from "../../domain/api/user";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Post from "../../domain/entity/post";
import PostItem from "../components/PostItem/PostItem";
import { Tabs } from "flowbite-react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";
import { GetAllFollowersOfUser } from "../../domain/api/follow";
import Avatar from "../components/Avatar/Avatar";

const Profile: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<User>();
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  const [allFollowers, setAllFollowers] = React.useState<User[]>([]);
  useEffect(() => {
    GetUserProfile()
      .then((res: any) => {
        setCurrentUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
        });
        setAllPosts(res.data.posts as Post[]);
        GetAllFollowersOfUser(Number(res.data.id))
          .then((res: any) => {
            setAllFollowers(res.data as User[]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {currentUser !== undefined && <ProfileCard user={currentUser} />}
      <Tabs.Group aria-label="Tabs with icons" style="underline">
        <Tabs.Item title="Posts" icon={MdOutlineSpaceDashboard}>
          <div className="grid grid-cols-3 gap-3 mt-5">
            {allPosts.map((allPosts: Post) => {
              return <PostItem post={allPosts} key={allPosts.id} />;
            })}
          </div>
        </Tabs.Item>
        <Tabs.Item active={true} title="Followers" icon={AiOutlineUser}>
          <div className="justify-center items-center self-center">
            {allFollowers.map((follower: any) => {
              return (
                <Avatar
                  user={{
                    id: follower.user.id,
                    name: follower.user.name,
                    email: follower.user.email,
                  }}
                  key={follower.user.id}
                />
              );
            })}
          </div>{" "}
        </Tabs.Item>
        <Tabs.Item title="Following" icon={AiOutlineUsergroupAdd}>
          Following content
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
};

function useGetUser(): User {
  const [currentUser, setUser] = React.useState<User>();
  axios
    .get(apiUrlUser + "profile", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
    .then((res: any) => {
      console.log(res.data.data);
      setUser(res.data.data as User);
    });
  if (currentUser === undefined) {
    throw new Error("User is undefined");
  }
  return currentUser;
}

export default Profile;