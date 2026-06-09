import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { createPost, getFeed, likePost, unlikePost } from "../services/api";

export const PostHook = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (imgUrl, caption) => {
    setLoading(true);
    const data = await createPost(imgUrl, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLike = async (postId) => {
    await likePost(postId);
    await handleGetFeed();
  };

  const handleUnlike = async (postId) => {
    await unlikePost(postId);
    await handleGetFeed();
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnlike,
  };
};
