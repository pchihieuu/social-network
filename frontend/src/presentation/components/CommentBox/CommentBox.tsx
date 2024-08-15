import axios from "axios";
import React, { SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import { apiUrlComment, LOCAL_URL } from "../../../utils/constant";

interface IProps {
  postId: string;
}
const CommentBox: React.FC<IProps> = (IProps) => {
  const [comment, setComment] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  var urlPost = LOCAL_URL + "post/" + IProps.postId;
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    axios
      .post(
        apiUrlComment + IProps.postId,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setRedirect(true);
        console.log(res.data);
      })
      .catch((err) => {
        setRedirect(false);
        console.log("there was an error: ", err);
      });
  };
  if (redirect) {
    window.location.reload();
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="mb-4 mx-auto max-w-md bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
      >
        <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={4}
            className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            onClick={() => {
              console.log(comment);
            }}
          >
            Post comment
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentBox;