
import { useContext, useState } from "react";
import {
  FaHouse,
  FaCompass,
  FaBell,
  FaPlus,
  FaBars,
  FaXmark,
  FaUser,
  FaGear,
  FaRightFromBracket,
} from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import CreatePost from "../../CreatePost/CreatePost";
import { Button, Modal } from "@heroui/react";
import logo from "../../../assets/orbit-logo-full.svg";
import userimage from "../../../assets/default-profile.png"



export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { removeToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const links = [
    { name: "Home", icon: FaHouse, link: "/" },
    { name: "Profile", icon: FaCompass, link: "/profile" },
    { name: "Notifications", icon: FaBell, link: "/notification" },
  ];

  function handleLogout() {
    removeToken();
    navigate("/auth/login");
    setMenuOpen(false);
  }

  function handleLinkClick(name:string) {
    setActive(name);
    setMenuOpen(false);
    setDropOpen(false);
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 px-3 py-3 shadow-sm backdrop-blur-xl sm:px-4 md:px-8">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">

          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link to="/">
              <img
                src={logo}
                className="h-12 sm:h-14 md:h-17"
                alt="Orbit Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 sm:flex">
            {links.map(({ name, icon: Icon, link }) => (
              <Link
                to={link}
                key={name}
                onClick={() => setActive(name)}
                className={`relative flex items-center gap-2 rounded-xl px-2 py-3 text-xs font-semibold transition-all duration-300 md:px-4 md:text-sm ${
                  active === name
                    ? "bg-violet-50 text-orbit-violet"
                    : "text-gray-500 hover:bg-gray-100 hover:text-orbit-violet"
                }`}
              >
                <Icon className="text-lg" />
                <span>{name}</span>

                {name === "Notifications" && (
                  <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 sm:flex">

            {/* Create Post */}
            <Button
  variant="secondary"
  onPress={() => setOpenModel(true)}
                  className="flex items-center gap-2 rounded-xl bg-orbit-violet px-3 py-3 text-xs font-bold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-orbit-ink md:px-4 md:text-sm"

>
  Create Post
  <FaPlus />
</Button>
            

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="flex items-center justify-center gap-2 rounded-full p-2 ring-2 ring-violet-200 transition hover:ring-violet-500"
                aria-label="Open profile"
                onClick={() => setDropOpen(!dropOpen)}
              >
                <img
                  src={userimage}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <FaBars />
              </button>

              {dropOpen && (
                <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">

                  <Link
                    to="/profile"
                    onClick={() => setDropOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-violet-50 hover:text-orbit-violet"
                  >
                    <FaUser />
                    Profile
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setDropOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-violet-50 hover:text-orbit-violet"
                  >
                    <FaGear />
                    Settings
                  </Link>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <FaRightFromBracket />
                    Logout
                  </button>

                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex shrink-0 items-center justify-center rounded-xl p-3 text-xl text-gray-700 transition hover:bg-violet-50 hover:text-orbit-ink sm:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 sm:hidden">

            {links.map(({ name, icon: Icon, link }) => (
              <Link
                to={link}
                key={name}
                onClick={() => handleLinkClick(name)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active === name
                    ? "bg-violet-50 text-orbit-ink"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="text-lg" />
                {name}
              </Link>
            ))}

            <Link
              to="/settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-violet-50 hover:text-orbit-ink"
            >
              <FaGear />
              Settings
            </Link>

            <div className="my-1 border-t border-gray-100" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <FaRightFromBracket />
              Logout
            </button>

            {/* Mobile Create Post */}
            <Button
              onPress={() => {
                setMenuOpen(false);
                setOpenModel(true);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orbit-violet px-4 py-3 font-bold text-white transition hover:bg-orbit-ink"
            >
              <FaPlus />
              Create Post
            </Button>

          </div>
        )}
      </nav>

      {/* Shared Modal for Desktop and Mobile */}
      <Modal isOpen={openModel} onOpenChange={setOpenModel}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="max-h-[90vh] overflow-auto sm:max-w-[700px]">
              <Modal.CloseTrigger />
              <CreatePost onClose={() => setOpenModel(false)} />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
