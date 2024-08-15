import React, { useEffect } from "react";
import Post from "../../domain/entity/post";
import PostCard from "../components/PostCard/PostCard";
import CommentList from "../components/CommentList/CommentList";
import { GetPostById } from "../../domain/api/post";

interface IProps {
  postId: string;
}

const PostDetails: React.FC<IProps> = (IProps) => {
  const [post, setPost] = React.useState<Post>();
  useEffect(() => {
    GetPostById(Number(IProps.postId)).then((res: any) => {
      setPost(res.data as Post);
    });
  }, []);
  return (
    <>
      <div className="container flex items-center flex-col w-full">
        {post !== undefined && <PostCard post={post} />}
        <br />
        <CommentList postID={IProps.postId} />
      </div>
    </>
  );
};

export default PostDetails;