
import { useContext, useRef, useState } from "react";
import {
  FaCamera,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaShareAlt,
  FaEllipsisH,
} from "react-icons/fa";

import { Button, toast } from "@heroui/react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import PostCard from "../../Components/Posts/PostCard";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Posts");

  const tabs = ["Posts", "Saved"];

  const { token, data, userId } = useContext(AuthContext);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  // User Data
  const user = data?.data?.data?.user;

  // =========================
  // API Functions
  // =========================

  // Get My Posts
  function getMyPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userId}/posts`,
      {
        headers: { token },
      }
    );
  }

  // Get Saved Posts
  function getSavePosts() {
    return axios.get(
      "https://route-posts.routemisr.com/users/bookmarks",
      {
        headers: { token },
      }
    );
  }

  // Delete Post
  function deletePost(postId: string) {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}`,
      {
        headers: { token },
      }
    );
  }

  // Change Profile Image
  function changeProfileImage(file: File) {
    const formData = new FormData();

    formData.append("photo", file);

    return axios.put(
      "https://route-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: { token },
      }
    );
  }

  // =========================
  // Queries
  // =========================

  // My Posts Query
  const {
    data: dataMyPosts,
    isLoading: isLoadingMyPosts,
    isError: isErrorMyPosts,
  } = useQuery({
    queryKey: ["myPosts", userId],
    queryFn: getMyPosts,
    enabled: !!token && !!userId,
    staleTime: 60000,
    gcTime: 60000 * 5,
  });

  // Saved Posts Query
  const {
    data: dataSavePosts,
    isLoading: isLoadingSavePosts,
    isError: isErrorSavePosts,
  } = useQuery({
    queryKey: ["savePosts", userId],
    queryFn: getSavePosts,
    enabled: !!token,
    staleTime: 60000,
    gcTime: 60000 * 5,
  });

  // Extract Posts
  const posts = dataMyPosts?.data?.data?.posts ?? [];

  const savedPosts =
    dataSavePosts?.data?.data?.bookmarks ?? [];

  // =========================
  // Mutations
  // =========================

  // Delete Post Mutation
  const { mutate: deletePostMutate } = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      toast.success("Post deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["myPosts", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["savePosts", userId],
      });
    },

    onError: () => {
      toast.danger("Failed to delete post");
    },
  });

  // Change Profile Image Mutation
  const { mutate: changephotoMutate } = useMutation({
    mutationFn: changeProfileImage,

    onSuccess: () => {
      toast.success("Profile photo updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });
    },

    onError: () => {
      toast.danger("Failed to update profile photo");
    },
  });

  // =========================
  // JSX
  // =========================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-gray-800">
      <div className="mx-auto max-w-5xl">

        {/* Cover */}
        <div className="group relative h-56 overflow-hidden rounded-3xl border border-gray-200 shadow-sm sm:h-80">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600"
            alt="Cover"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          <Button
            isIconOnly
            aria-label="Change cover"
            className="absolute right-5 top-5 bg-white/90 text-gray-700 shadow-md"
          >
            <FaCamera />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-6 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div className="group z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end">

              {/* Profile Image */}
              <div className="group relative h-32 w-32">
                <img
                  src={user?.photo}
                  alt={user?.name ?? "Profile"}
                  className="h-full w-full rounded-full border-3 border-white object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-label="Change profile picture"
                >
                  <FaCamera className="text-2xl" />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      changephotoMutate(file);
                    }

                    e.target.value = "";
                  }}
                />
              </div>

              {/* User Name */}
              <div className="pb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.name}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  @{user?.username}
                </p>
              </div>
            </div>

            {/* Profile Actions */}
            <div className="flex gap-2 sm:pb-2">
              <Button className="bg-orbit-violet font-semibold text-white shadow-sm hover:bg-orbit-ink">
                <FaEdit />
                Edit Profile
              </Button>

              <Button
                isIconOnly
                aria-label="Share profile"
                variant="outline"
                className="border-gray-200 bg-white text-gray-600"
              >
                <FaShareAlt />
              </Button>

              <Button
                isIconOnly
                aria-label="More options"
                variant="outline"
                className="border-gray-200 bg-white text-gray-600"
              >
                <FaEllipsisH />
              </Button>
            </div>
          </div>

          {/* User Details */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-500">

            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-violet-500" />
              Cairo, Egypt
            </span>

            {user?.dateOfBirth && (
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-violet-500" />

                {new Date(user.dateOfBirth).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }
                )}
              </span>
            )}
          </div>

          {/* Statistics */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              [posts.length, "Posts"],
              [user?.followers?.length ?? 0, "Followers"],
              [user?.following?.length ?? 0, "Following"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
              >
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {number}
                </p>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-5 border-b border-gray-200">
          <div className="flex gap-7">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-4 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "text-violet-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orbit-violet" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="py-6">

          {/* My Posts */}
          {activeTab === "Posts" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

              {isLoadingMyPosts ? (
                <p>Loading posts...</p>
              ) : isErrorMyPosts ? (
                <p>Failed to load posts.</p>
              ) : posts.length > 0 ? (
                posts.map((post: any) => (
                  <PostCard
                    key={post._id}
                    postItem={post}
                    allComments={post.comments ?? []}
                    deletePost={deletePostMutate}
                  />
                ))
              ) : (
                <p>No posts yet.</p>
              )}

            </div>
          )}

          {/* Saved Posts */}
          {activeTab === "Saved" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

              {isLoadingSavePosts ? (
                <p>Loading saved posts...</p>
              ) : isErrorSavePosts ? (
                <p>Failed to load saved posts.</p>
              ) : savedPosts.length > 0 ? (
                savedPosts.map((post: any) => (
                  <PostCard
                    key={post._id}
                    postItem={post}
                    allComments={post.comments ?? []}
                    deletePost={deletePostMutate}
                  />
                ))
              ) : (
                <p>No saved posts yet.</p>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
