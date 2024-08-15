import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import Post from "../../domain/entity/post";
import { GetTopicById } from "../../domain/api/topic";
import { GetAllPostsByTopicId } from "../../domain/api/post";
import {
  SubscribeTopic,
  UnsubscribeTopic,
  CountSubscribersOfTopic,
  IsSubscribed,
} from "../../domain/api/subscribe";
import PostItem from "../components/PostItem/PostItem";
interface IProps {
  topicId: string;
}
const Topic: React.FC<IProps> = (IProps) => {
  const [topicName, setTopicName] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [CountSubscribers, setCountSubscribers] = React.useState(0);
  const [isSubscribed, setIsSubscribed] = React.useState<boolean>(false);
  useEffect(() => {
    GetAllPostsByTopicId(IProps.topicId).then((res: any) => {
      setPosts(res.data as Post[]);
    });
  }, []);

  useEffect(() => {
    GetTopicById(IProps.topicId).then((res: any) => {
      setTopicName(res.data.title as string);
    });
  }, []);

  useEffect(() => {
    IsSubscribed(IProps.topicId)
      .then((res: any) => {
        if (res.data) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    CountSubscribersOfTopic(IProps.topicId).then((res: any) => {
      console.log(res);
      setCountSubscribers(res.data as number);
    });
  }, []);

  function handleSubscribe(
    topicId: string
  ): React.MouseEventHandler<HTMLButtonElement> | undefined {
    return (event) => {
      if (isSubscribed) {
        UnsubscribeTopic(IProps.topicId)
          .then((res: any) => {
            console.log("unsubscribed");
            CountSubscribersOfTopic(IProps.topicId).then((res: any) => {
              setCountSubscribers(res.data as number);
            });
            setIsSubscribed(false);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        SubscribeTopic(IProps.topicId)
          .then((res: any) => {
            console.log("subscribed");
            CountSubscribersOfTopic(IProps.topicId).then((res: any) => {
              setCountSubscribers(res.data as number);
            });
            setIsSubscribed(true);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    };
  }

  return (
    <>
      <div className="container px-4 mx-auto">
        <div id="title" className="text-center my-10">
          <h1 className="font-bold text-4xl text-black">{topicName}</h1>
          <p className="text-light text-gray-500 text-xl">
            {CountSubscribers} subscribers
          </p>
          <br />
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              style={
                isSubscribed
                  ? { backgroundColor: "gray" }
                  : { backgroundColor: "#1d4ed8" }
              }
              onClick={handleSubscribe(IProps.topicId)}
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-wrap columns-4 gap-3">
        {posts.map((post: Post) => {
          return (
            <>
              <PostItem post={post} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Topic;