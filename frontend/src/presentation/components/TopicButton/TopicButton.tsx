import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import Topic from "../../../domain/entity/topic";
import { apiUrlTopic } from "../../../utils/constant";
import { GetAllTopics, GetTopicById } from "../../../domain/api/topic";

interface IProps {
  topic: Topic;
}

var ButtonType = [
  "purpleToBlue",
  "cyanToBlue",
  "greenToBlue",
  "purpleToPink",
  "pinkToOrange",
  "tealToLime",
  "redToYellow",
];

const TopicButton = () => {
  const [topics, setTopics] = React.useState<Topic[]>([]);

  useEffect(() => {
    GetAllTopics()
      .then((res: any) => {
        setTopics(res.data as Topic[]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic: Topic) => {
          return (
            <Button
              onClick={handleClick(topic.id)}
              gradientDuoTone={
                ButtonType[Math.floor(Math.random() * ButtonType.length)]
              }
              key={topic.id}
            >
              {topic.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicButton;

function handleClick(
  id: number
): React.MouseEventHandler<HTMLButtonElement> | undefined {
  return (event) => {
    event.preventDefault();
    window.location.href = `/topic/${id}`;
  };
}