import React from "react";

const Post = ({ user, post, handleLike, handleUnlike }) => {
  return (
    <div>
      <div>
        <div className="post bg-purple-900 rounded-2xl shadow p-4 flex flex-col gap-3">
          <div className="user flex items-center gap-4">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={user?.profileImage}
              alt="Hannan"
            />
            <p className="font-semibold">{user?.username}</p>
          </div>
          <img
            className="w-full h-60 rounded-2xl object-cover"
            src={post?.imgUrl}
            alt="post1"
          />
          <div className="bottom">
            <div>
              <button>
                <i
                  onClick={() =>
                    post.isLiked ? handleUnlike(post._id) : handleLike(post._id)
                  }
                  className={`${
                    post.isLiked
                      ? "ri-heart-fill text-red-800 bg-red-800 rounded-full"
                      : "ri-heart-line"
                  }`}
                ></i>
              </button>
            </div>
            <p>{post?.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
