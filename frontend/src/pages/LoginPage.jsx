import React, { useState } from 'react'
import HaluLogo from "/Halu-logo.png";
import { Link } from 'react-router';
import { useLogin } from '../hooks/useLogin';

export const Loginpage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const {loginMutation, isPending, error } = useLogin();

  const handleLogin = async(e)=>{
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div className="h-screen items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="absolute top-10 left-10 w-48 h-48 bg-primary/20 rounded-full "></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="border border-primary/25 backdrop-blur-xl flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
      rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col">
        {/* LOGOP */}
        {/* Brand logo + name */}
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
            <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HaluChat
            </h1>
            <p className="text-xs opacity-70 -mt-1">
              Learn languages from native speakers ✦
            </p>
          </div>
        </div>
        {/* ERROR MESSAGE DISPLAY */}
        {error && (
          <div className="alert alert-error mb-4">
            <span>
              {error.response.data.message}
            </span>
          </div>
        )}

        <div className="w-full">
          <form onSubmit={handleLogin}>
            <div className="y-space-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome Back</h2>
                <p className="text-sm opacity-70">
                  Sign in to your account to continue your language journey.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="form-control w-full space-y-2">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input 
                    type="email"
                    name="email"
                    placeholder="yourname@example.com"
                    className="input input-bordered w-full"
                    value={loginData.email}
                    onChange={(e)=>setLoginData({...loginData, email:e.target.value})}
                    required
                  />
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input 
                    type="password"
                    name="password"
                    placeholder="******"
                    className="input input-bordered w-full"
                    value={loginData.password}
                    onChange={(e)=>setLoginData({...loginData, password:e.target.value})}
                    required
                  /> 
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                  {isPending? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing in ...
                    </>
                  ):(
                    "Sign in"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account? {" "}
                    <Link to="/signup" className="text-primary hover:underline">
                      Create One
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
        </div>
        {/* Right - Illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-tr from-primary/20 to-secondary/20 items-center justify-center relative">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/hi.png" alt="welcome" className="w-full h-full drop-shadow-2xl rounded-2xl" />
            </div>
            <div className="text-center space-y-6 mt-6">
              <h2 className="text-2xl font-semibold">Welcome to HaluChat</h2>
              <p className="text-sm opacity-80">
                Connect with native speakers of Yao, Chewa, Lomwe, and other local & regional languages to learn naturally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
