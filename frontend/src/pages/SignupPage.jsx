import React, { useState } from "react";
import HaluLogo from "/Halu-logo.png";
import { Link } from "react-router";
import { useSignup } from "../hooks/useSignup";

export const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const {signupMutation, isPending, error } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-base-200 to-base-100 relative overflow-hidden" data-theme="forest">
      {/* Decorative background blur circles */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-primary/20 rounded-full "></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-base-300">
        {/* Left - Signup form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
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

          {/*ERROR MESSAGE IF ANY */}
          {
            error && (
              <div className="alert alert-error shadow-lg mb-4">
                <span>
                  {error.response.data.message}
                </span>
              </div>
            )
          }

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold">Create an Account</h2>
              <p className="text-sm opacity-70">
                Join HaluChat and practice practical languages for work, travel, and daily life.
              </p>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                placeholder="John Doe"
                type="text"
                className="input input-bordered rounded-xl"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                placeholder="john@gmail.com"
                type="email"
                className="input input-bordered rounded-xl"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                placeholder="••••••••"
                type="password"
                className="input input-bordered rounded-xl"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
              <p className="text-xs opacity-60 mt-1">
                Password must be at least 6 characters long.
              </p>
            </div>

            {/* Terms */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" required />
                <span className="text-xs leading-tight">
                  I agree to the {" "}
                  <span className="text-primary hover:underline">
                    terms of service
                  </span>{" "}
                  and {" "}
                  <span className="text-primary hover:underline">
                    privacy policy
                  </span>
                </span>
              </label>
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full rounded-xl text-base font-semibold">
              {isPending ? (
                <span className="loading loading-spinner loading-sm">
                  <span className="sr-only">Creating Account...</span>
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-sm opacity-80 text-center">
              Already have an account? {" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
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
  );
};
