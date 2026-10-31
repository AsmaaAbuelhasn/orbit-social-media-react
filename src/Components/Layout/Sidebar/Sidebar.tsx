
import {
  FaRegNewspaper,
  FaRegUser,
  FaUsers,
  FaRegBookmark,
  FaChevronRight,
} from "react-icons/fa";
import type { IconType } from "react-icons";

type TabType = "Feed" | "My Posts" | "Community" | "Saved";
type SidebarProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};
type MenuItem = {
  title: TabType;
  subtitle: string;
  icon: IconType;
};
const menuItems:MenuItem[] = [
  {
    title: "Feed",
    subtitle: "Latest posts",
    icon: FaRegNewspaper,
  },
  {
    title: "My Posts",
    subtitle: "Your publications",
    icon: FaRegUser,
  },
  {
    title: "Community",
    subtitle: "Explore people",
    icon: FaUsers,
  },
  {
    title: "Saved",
    subtitle: "Your bookmarks",
    icon: FaRegBookmark,
  },
];

export default function Sidebar({ activeTab, setActiveTab }:SidebarProps) {
  return (
    <aside className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hidden lg:block md:block">

      {/* Header */}
      <div className="mb-5 flex items-center gap-3 px-2 pt-1">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-200">
          <FaUsers className="text-lg" />
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-800">
            Your Space
          </h2>
          <p className="mt-0.5 text-xs text-gray-400">
            Explore your community
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.title;

          return (
            <button
              key={item.title}
              onClick={() => setActiveTab(item.title)}
              className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200
                ${
                  isActive
                    ? "border-violet-100 bg-violet-50 shadow-sm shadow-violet-100/50"
                    : "border-transparent hover:border-gray-100 hover:bg-gray-50"
                }`}
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-200"
                      : "bg-gray-100 text-gray-500 group-hover:bg-violet-100 group-hover:text-violet-600"
                  }`}
              >
                <Icon className="text-lg" />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-bold transition-colors
                    ${
                      isActive
                        ? "text-violet-700"
                        : "text-gray-700 group-hover:text-violet-600"
                    }`}
                >
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {item.subtitle}
                </p>
              </div>

              {/* Active indicator */}
              <FaChevronRight
                className={`shrink-0 text-xs transition-all duration-200
                  ${
                    isActive
                      ? "translate-x-0 text-violet-500 opacity-100"
                      : "-translate-x-1 text-gray-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-5 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 p-3.5">
        <p className="text-xs font-semibold text-violet-700">
          ✨ Stay connected
        </p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          Discover posts and connect with your community.
        </p>
      </div>

    </aside>
  );
}
