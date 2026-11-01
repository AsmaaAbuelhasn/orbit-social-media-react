
import { useState } from "react";
import {
  FaBars,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";

import CreatePost from "../../Components/CreatePost/CreatePost";
import Sidebar from "../../Components/Layout/Sidebar/Sidebar";
import Posts from "../../Components/Posts/Posts";
import SuggestedFriends from "../../Components/SuggestesFriends/SuggestesFriends";

type TabType = "Feed" | "My Posts" | "Community" | "Saved";

export default function Feeds() {
  const [activeTab, setActiveTab] = useState<TabType>("Feed");

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSuggestions, setOpenSuggestions] = useState(false);

  return (
    <div className="w-full max-w-[1300px] mx-auto mt-5 px-4 lg:px-6">

      {/* Mobile Tabs */}
      <div className="flex lg:hidden gap-3 mb-4">

        <button
          onClick={() => {
            setOpenSidebar(!openSidebar);
            setOpenSuggestions(false);
          }}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl p-3 border transition
          ${openSidebar
            ? "bg-orbit-violet text-white border-orbit-violet"
            : "bg-white dark:bg-orbit-ink border-gray-200 dark:border-gray-700"
          }`}
        >
          {openSidebar ? <FaXmark /> : <FaBars />}
          <span>Menu</span>
        </button>

        <button
          onClick={() => {
            setOpenSuggestions(!openSuggestions);
            setOpenSidebar(false);
          }}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl p-3 border transition
          ${openSuggestions
            ? "bg-orbit-violet text-white border-orbit-violet"
            : "bg-white dark:bg-orbit-ink border-gray-200 dark:border-gray-700"
          }`}
        >
          {openSuggestions ? <FaXmark /> : <FaUsers />}
          <span>Suggestions</span>
        </button>

      </div>

      {/* Mobile Sidebar */}
      {openSidebar && (
        <div className="lg:hidden mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}

      {/* Mobile Suggestions */}
      {openSuggestions && (
        <div className="lg:hidden mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <SuggestedFriends />
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start h-fit">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Posts */}
        <main className="min-w-0 lg:col-span-6">
          <CreatePost />

          <div className="mt-4 flex w-full flex-col gap-4">
            <Posts activeTab={activeTab} />
          </div>
        </main>

        {/* Desktop Suggestions */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start h-fit">
          <SuggestedFriends />
        </aside>

      </div>
    </div>
  );
}
