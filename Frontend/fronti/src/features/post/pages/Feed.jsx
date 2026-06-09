import React, { useEffect } from "react";
import Post from "../components/Post";
import { PostHook } from "../hooks/PostHook";
import Nav from "../../shared/Nav";

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLike, handleUnlike } = PostHook();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }

  console.log(feed);
  return (
    <div>
      <Nav />
      <main className="flex justify-center bg-gray-100 min-h-screen p-5">
        <div className="feed w-full max-w-md flex flex-col gap-5">
          {feed.map((post) => {
            return (
              <Post
                user={post.user}
                post={post}
                loading={loading}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Feed;
