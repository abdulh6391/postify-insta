import axios from "axios";
const getBaseURL = () => {
  if (
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL
  ) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  return "http://localhost:3000/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});
export async function getFeed() {
  const response = await api.get("/feed");
  return response.data;
}

export async function createPost(imgUrl, caption) {
  const formData = new FormData();

  formData.append("imgUrl", imgUrl);
  formData.append("caption", caption);

  const response = await api.post("/post", formData);
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post("/like/" + postId);
  return response.data;
}

export async function unlikePost(postId) {
  const response = await api.post("/unLike/" + postId);
  return response.data;
}
