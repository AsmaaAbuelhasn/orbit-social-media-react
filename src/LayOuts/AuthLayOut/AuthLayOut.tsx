
import { NavLink, Outlet } from "react-router-dom";
import AppIntro from "../../Components/AppIntro/AppIntro";

export default function AuthLayOut() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-12 min-h-screen">

      {/* Intro Section */}
      <aside className="hidden md:block md:col-span-4">
        <AppIntro />
      </aside>

      {/* Authentication Section */}
      <section className="col-span-1 md:col-span-8 bg-orbit-paper
        min-h-screen flex items-center justify-center
        px-4 py-6 sm:px-6 md:px-8">

        {/* Form Card */}
        <div className="w-full max-w-[520px] bg-white
          rounded-2xl shadow-sm
          p-4 sm:p-6 md:p-8">

          {/* Login / Signup Tabs */}
          <div className="flex gap-2 mb-6 p-1.5
            bg-orbit-paper rounded-xl">

            <NavLink
              to="/auth/login"
              end
              className={({ isActive }) =>
                `flex-1 text-center rounded-lg py-3 px-2
                font-extrabold text-sm transition-all duration-300
                ${
                  isActive
                    ? "bg-orbit-ink text-orbit-paper shadow-sm"
                    : "text-orbit-lead hover:text-orbit-ink"
                }`
              }
            >
              LogIn
            </NavLink>

            <NavLink
              to="/auth/signup"
              className={({ isActive }) =>
                `flex-1 text-center rounded-lg py-3 px-2
                font-extrabold text-sm transition-all duration-300
                ${
                  isActive
                    ? "bg-orbit-ink text-orbit-paper shadow-sm"
                    : "text-orbit-lead hover:text-orbit-ink"
                }`
              }
            >
              SignUp
            </NavLink>

          </div>

          {/* Login / Register Content */}
          <Outlet />

        </div>
      </section>
    </main>
  );
}
