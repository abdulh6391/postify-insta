import React, { useRef, useState } from "react";
import Nav from "../../shared/Nav";
import { PostHook } from "../hooks/PostHook";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");

  const { loading, handleCreatePost } = PostHook();

  const postImageInputFieldRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];
    await handleCreatePost(file, caption);
    navigate("/w");
  }

  if (loading) {
    return (
      <main>
        <h1>creating post</h1>
      </main>
    );
  }

  return (
    <div>
      <div>
        <Nav />
        <main className="flex items-center justify-center min-h-screen">
          <div className="form-container">
            <h1 className="text-3xl">Create Post</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 w-100 h-100 bg-gray-600 p-10 rounded-2xl"
            >
              <input
                ref={postImageInputFieldRef}
                className="bg-green-500 border-none outline-none py-4 rounded-2xl"
                type="file"
                name="imgUrl"
                placeholder="Enter Image"
              />
              <input
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                className="bg-green-500 border-none outline-none py-4 rounded-2xl"
                type="text"
                name="caption"
                placeholder="Enter Caption"
              />
              <button className="bg-red-900 py-2 rounded-2xl">Create</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePost;
