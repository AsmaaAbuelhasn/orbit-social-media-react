
import axios, { isAxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import type { Post } from "../../Interfaces/Post";
import PostCard from "./PostCard";
import Loader from "../Loader/Loader";
import { toast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
type TabType = "Feed" | "My Posts" | "Community" | "Saved";
type PostsProps = {
  activeTab: TabType;
};

export default function Posts({ activeTab }: PostsProps) {

  const { token, userId } = useContext(AuthContext);
  const query = useQueryClient();
    // Get save posts
  function getSavePosts() {
    return axios.get(
      "https://route-posts.routemisr.com/users/bookmarks",
      {
        headers: { token },
      }
    );
  }

  // Get all posts
  function getPosts() {
    return axios.get(
      "https://route-posts.routemisr.com/posts",
      {
        headers: { token },
      }
    );
  }

  // Get my posts
  function getMyPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userId}/posts`,
      {
        headers: { token },
      }
    );
  }

  // Feed query
  const {
    data,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    enabled: activeTab === "Feed",
    staleTime: 60000,
    gcTime: 60000 * 5,
  });

  // My Posts query
  const {
    data: dataMyPosts,
    isLoading: isLoadingMyPosts,
    isError: isErrorMyPosts,
  } = useQuery({
    queryKey: ["myPosts", userId],
    queryFn: getMyPosts,
    enabled: activeTab === "My Posts" && !!userId && !!token,
    staleTime: 60000,
    gcTime: 60000 * 5,
  });

    // My save Posts query
  const {
    data: dataSavePosts,
    isLoading: isLoadingSavePosts,
    isError: isErrorSavePosts,
  } = useQuery({
    queryKey: ["savePosts", userId],
    queryFn: getSavePosts,
    enabled: activeTab === "Saved" && !!userId && !!token,
    staleTime: 60000,
    gcTime: 60000 * 5,
  });
  console.log(dataSavePosts)

  // Delete post
  function deletePost(postId:string) {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}`,
      {
        headers: { token },
      }
    );
  }

  const { mutate: deletePostMutate } = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      toast.success("Post deleted successfully");

      query.invalidateQueries({ queryKey: ["posts"] });
      query.invalidateQueries({ queryKey: ["myPosts"] });
      query.invalidateQueries({ queryKey: ["savePosts"] });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        toast.danger(
          error.response?.data?.message || "Failed to delete post"
        );
      } else {
        toast.danger("Failed to delete post");
      }
    },
  });

  //savePost 
   function savePost(postId:string) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/bookmark`,{},
      {
        headers: { token },
      }
    );
  }

  const { mutate: savePostMutate } = useMutation({
    mutationFn: savePost,

    onSuccess: () => {
      toast.success("Post saved successfully");

      query.invalidateQueries({ queryKey: ["posts"] });
      query.invalidateQueries({ queryKey: ["myPosts"] });
      query.invalidateQueries({ queryKey: ["savePosts"] });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        toast.danger(
          error.response?.data?.message || "Failed to save post"
        );
      } else {
        toast.danger("Failed to save post");
      }
    },
  });


  // Select posts according to activeTab
  let posts: Post[] = [];
  let isLoading = false;
  let isError = false;

  if (activeTab === "Feed") {
    posts = data?.data?.data?.posts ?? [];
    isLoading = isLoadingPosts;
    isError = isErrorPosts;
  } else if (activeTab === "My Posts") {
    posts = dataMyPosts?.data?.data?.posts ?? [];
    isLoading = isLoadingMyPosts;
    isError = isErrorMyPosts;
  }else if(activeTab==="Saved"){
    posts = dataSavePosts?.data?.data?.bookmarks ?? [];
    isLoading = isLoadingSavePosts;
    isError = isErrorSavePosts;
  }

  if (isLoading) {
    return (
      <>
        {[1, 2, 3].map((item) => (
          <Loader key={item} />
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
        Failed to load posts. Please try again.
      </p>
    );
  }

 
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border mt-10  border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
        No posts found.
      </div>
    );
  }

  return (
    <>
      {posts.map((postItem) => (
        <PostCard
          key={postItem._id}
          postItem={postItem}
          deletePost={deletePostMutate}
          savedPost={savePostMutate}
        />
      ))}
    </>
  );
}
