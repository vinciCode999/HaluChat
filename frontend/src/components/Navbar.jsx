import React from 'react'
import useAuthUser from '../hooks/userAuthUser'
import { Link, useLocation } from 'react-router';
import HaluLogo from "/Halu-logo.png";
import { BellIcon, LogOutIcon } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - only in the chat page */}
          {
            isChatPage && (
              <div className="pl-5">
                <Link className="flex items-center gap-2.5">
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
                </Link>
              </div>
            )
          }

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="size-6 text-base-content opacity-70"/>
              </button>
            </Link>
          </div>

          { /* TODO */ }
          <ThemeSelector />
          <div className="avatar">
            <div className="w-9 rounded-full ">
              <img src={authUser?.avatar} alt="user avatar" rel="noreferrer" />
            </div>

          </div>

          {/* LOGOUT */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="size-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar