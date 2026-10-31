
import { useState } from "react";
import {
  FaHeart,
  FaComment,
  FaUserPlus,
  FaAt,
  FaBell,
  FaCheckDouble,
  FaTrash,
  FaEllipsis,
} from "react-icons/fa6";

type Notification = {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  type: "like" | "comment" | "follow" | "mention";
  read: boolean;
};


export default function Notifications() {
 

  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

 



  function getIcon(type: Notification["type"]) {
    switch (type) {
      case "like":
        return <FaHeart className="text-pink-500" />;

      case "comment":
        return <FaComment className="text-blue-500" />;

      case "follow":
        return <FaUserPlus className="text-violet-600" />;

      case "mention":
        return <FaAt className="text-amber-500" />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <FaBell className="text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Notifications
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Stay updated with what's happening.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-600">
            Unread
          </div>

        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4 sm:p-6">

            <div>
              <h2 className="font-bold text-gray-900">
                Your Activity
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                You have unread notifications
              </p>
            </div>

            <button
              
              className="flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-800 disabled:opacity-40"
            >
              <FaCheckDouble />
              Mark all as read
            </button>

          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-100 px-4 sm:px-6">

            <button
              onClick={() => setActiveTab("all")}
              className={`border-b-2 py-4 text-sm font-semibold transition ${
                activeTab === "all"
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              All
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs">
              </span>
            </button>

            <button
              onClick={() => setActiveTab("unread")}
              className={`border-b-2 py-4 text-sm font-semibold transition ${
                activeTab === "unread"
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Unread
              <span className="ml-2 rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-600">
              </span>
            </button>

          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-100">

          

              <div className="flex flex-col items-center justify-center px-4 py-16 text-center">

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 text-violet-500">
                  <FaBell className="text-2xl" />
                </div>

                <h3 className="font-bold text-gray-800">
                  No notifications found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  You're all caught up!
                </p>

              </div>

            

          </div>

          {/* Footer */}
        
            <div className="border-t border-gray-100 p-4 text-center">
              <p className="text-xs text-gray-400">
                You're all caught up with your notifications.
              </p>
            </div>
          

        </div>

      </div>

    </div>
  );
}
