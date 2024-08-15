import React, { useEffect } from "react";
import { SearchPosts } from "../../domain/api/post";
import Post from "../../domain/entity/post";
import PostItem from "../components/PostItem/PostItem";
interface IProps {
  searchValue: string;
}

const Search: React.FC<IProps> = (IProps) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  useEffect(() => {
    SearchPosts(IProps.searchValue)
      .then((res: any) => {
        setPosts(res.data as Post[]);
        console.log(posts);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container px-4 mx-auto">
        <div id="title" className="text-center my-10">
          <h1 className="font-bold text-4xl text-black">Search results for</h1>
          <p className="text-light text-gray-500 text-xl">
            {IProps.searchValue}
          </p>
          <br />
          <div className="flex-wrap columns-4 gap-3">
            {posts.map((post: Post) => {
              return (
                <>
                  <PostItem post={post} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;