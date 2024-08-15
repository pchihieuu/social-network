"use client";
import { Tabs } from "flowbite-react";
import React, { PropsWithChildren, useEffect } from "react";
import { Post } from "../../../domain/entity/post";
import PostItem from "../PostItem/PostItem";

import {
  GetAllPosts,
  GetTrendingPosts,
  GetFollowingPosts,
  GetSubscribedTopicPosts,
} from "../../../domain/api/post";

interface Props {
  post: Post;
}

const GalleryGrid: React.FC<PropsWithChildren> = () => {
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = React.useState<Post[]>([]);
  const [subscribedPosts, setSubscribedPosts] = React.useState<Post[]>([]);
  const [followersPosts, setFollowersPosts] = React.useState<Post[]>([]);

  useEffect(() => {
    GetAllPosts()
      .then((res: any) => {
        setAllPosts(res.data as Post[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    GetTrendingPosts()
      .then((res: any) => {
        setTrendingPosts(res.data as Post[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    GetFollowingPosts()
      .then((res: any) => {
        setSubscribedPosts(res.data as Post[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    GetSubscribedTopicPosts()
      .then((res: any) => {
        setFollowersPosts(res.data as Post[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="ease-in duration-300">
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item active={true} title="All">
            <div className="columns-4 gap-3">
              {allPosts.map((allPosts: Post) => {
                return <PostItem post={allPosts} key={allPosts.id} />;
              })}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Trending">
            <div className="columns-4 gap-3">
              {trendingPosts.map((trendingPosts: Post) => {
                return <PostItem post={trendingPosts} key={trendingPosts.id} />;
              })}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Subscribed topics">
            <div className="columns-4 gap-3">
              {subscribedPosts.map((subscribedPosts: Post) => {
                return (
                  <PostItem post={subscribedPosts} key={subscribedPosts.id} />
                );
              })}
            </div>{" "}
          </Tabs.Item>
          <Tabs.Item title="Followers"></Tabs.Item>
          <div className="columns-4 gap-3">
            {followersPosts.map((followersPosts: Post) => {
              return <PostItem post={followersPosts} key={followersPosts.id} />;
            })}
          </div>{" "}
        </Tabs.Group>
      </div>
    </>
  );
};

export default GalleryGrid;