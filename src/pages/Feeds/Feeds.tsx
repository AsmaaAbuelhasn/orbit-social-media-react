
import { useState } from "react";
import CreatePost from "../../Components/CreatePost/CreatePost";
import Sidebar from "../../Components/Layout/Sidebar/Sidebar";
import Posts from "../../Components/Posts/Posts";
import SuggestedFriends from "../../Components/SuggestesFriends/SuggestesFriends";

type TabType = "Feed" | "My Posts" | "Community" | "Saved";

export default function Feeds() {
  const [activeTab, setActiveTab] = useState<TabType>("Feed");

  return (
    <div className="w-full max-w-[1300px] mx-auto mt-5 px-4 lg:px-6">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start h-fit">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Posts Section */}
        <main className="min-w-0 lg:col-span-6">

          <CreatePost />

          <div className="mt-4 flex w-full flex-col gap-4">
            <Posts activeTab={activeTab} />
          </div>

        </main>

        {/* Suggested Friends */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start h-fit">
          <SuggestedFriends />
        </aside>

      </div>
    </div>
  );
}
