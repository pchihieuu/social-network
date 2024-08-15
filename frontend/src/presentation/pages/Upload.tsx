import React, { SyntheticEvent, useEffect, useState } from "react";
import { apiUrlPost, apiUrlTopic } from "../../utils/constant";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Topic from "../../domain/entity/topic";

const Upload = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [topic, setTopic] = React.useState(0);
  const [topicList, setTopicList] = React.useState<Topic[]>([]);
  const [seletedFile, setSeletedFile] = React.useState<File | null>(null);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    const formData: any = new FormData();
    e.preventDefault();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("topic_id", topic);
    formData.append("file", seletedFile);
    console.log(formData);
    axios
      .post(apiUrlPost, formData, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRedirect(true);
        console.log(res.data);
      })
      .catch((err) => {
        setRedirect(false);
        console.log("there was an error: ", err);
      });

  };

  useEffect(() => {
    axios
      .get(apiUrlTopic, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        console.log(res.data.data);
        setTopicList(res.data.data as Topic[]);
      });
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-cener">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Upload
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-md">
          <form onSubmit={handleSubmit} action="" className="space-y-6">
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-600 block"
              >
                Title
              </label>
              <input
                name="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-600 block"
              >
                Description
              </label>
              <input
                name="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <label
              htmlFor="topics"
              className="text-sm font-bold text-gray-600 block"
            >
              Topic
            </label>
            <select
              id="topics"
              value={topic}
              onChange={(e) => setTopic(+e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-300 dark:placeholder-gray-200 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={NaN} selected>
                Choose topic
              </option>
              {topicList.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
            <p />

            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG OR JPG
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files ? setSeletedFile(e.target.files[0]) : null
                  }
                />
              </label>
            </div>
            <br />
            <button className="w-full py-2 px-4 bg-blue-700 rounded-md text-white text-sm font-bold">
              Publish
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;