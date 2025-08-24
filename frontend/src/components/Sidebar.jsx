import React from 'react'
import useAuthUser from '../hooks/userAuthUser'
import HaluLogo from "/Halu-logo.png";
import { Link, useLocation } from 'react-router';
import { BellIcon, HomeIcon, UsersIcon } from 'lucide-react';

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  return (
    <aside className="w-64 bg-base-200 border border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Brand logo + name */}
      <Link to="/">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="size-12 bg-primary"
            style={{
              WebkitMaskImage: `url(${HaluLogo})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              maskImage: `url(${HaluLogo})`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: "center",
            }}
          />
          <div>
            <h1 className="text-3xl font-mono font-extrabold tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HaluChat
            </h1>
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 p-4">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>
            Home
          </span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>
            Friends
          </span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>
            Notifications
          </span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          {/* Avatar with online indicator */}
          <div className="avatar relative">
            <div className="w-10 rounded-full">
              <img src={authUser?.avatar} alt="User avatar" />
            </div>
            {/* Green dot positioned bottom-right */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-white rounded-full"></span>
          </div>

          {/* User info */}
          <div className="flex-1">
            <p className="font-semibold text-sm">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-success flex items-center gap-1">
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar