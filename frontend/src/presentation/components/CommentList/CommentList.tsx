import axios from "axios";
import React, { PropsWithChildren, useEffect } from "react";
import Comment from "../../../domain/entity/comment";
import { apiUrlComment } from "../../../utils/constant";
import CommentBox from "../CommentBox/CommentBox";
import CommentCard from "../CommentCard/CommentCard";
import comment, { GetAllComments } from "../../../domain/api/comment";

interface IProps {
  postID: string;
}
const CommentList: React.FC<IProps> = ({ postID }) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  useEffect(() => {
    GetAllComments(postID).then((res: any) => {
      setComments(res.data as Comment[]);
    });
  }, []);
  return (
    <div className="w-full">
      <CommentBox postId={postID} />
      {comments.map((comments: Comment) => {
        return <CommentCard comment={comments} key={comments.id}/>;
      })}
    </div>
  );
};

export default CommentList;