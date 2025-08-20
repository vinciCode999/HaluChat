import React, { useState } from 'react'
import useAuthUser from '../hooks/userAuthUser'
import toast from 'react-hot-toast';
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants';
import { useOnboarding } from '../hooks/useOnboarding';


export const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  
  const [ onBoardingData, setOnBoardingData ] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    avatar: authUser?.avatar || "",
  })

  const {onBoardingMutation, isPending, error} = useOnboarding();

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(onBoardingData);
  }

  const generateRandomAvatar = async()=>{
    const idx = Math.floor(Math.random() * 100) + 1; //1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setOnBoardingData((prev) => ({ ...prev, avatar: randomAvatar }));
    toast.success("random profile picture generated!");
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4" data-theme="forest">
      <div className="card bg-base-200 w-full max-w-2xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
          <form onSubmit={ handleSubmit } className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {onBoardingData.avatar?(
                  <img src={onBoardingData.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                ):(
                  <div className="flex items-center justify-center">
                    <CameraIcon className="size-12 text-base-content opacity-50" />
                  </div>
                )}
              </div>

              {/* Generate Random avatar Button */}
              <div className="flex items-center gap-2">
                <button type="button" className="btn btn-accent"
                onClick={generateRandomAvatar}
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* FULLNAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input type="text"
                  name="fullName"
                  value={onBoardingData.fullName}
                  onChange={(e)=>setOnBoardingData({...onBoardingData, fullName: e.target.value})}
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                />
              </div>

              {/* BIO */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea type="text"
                  name="bio"
                  className="textarea textarea-bordered h-24"
                  value={onBoardingData.bio}
                  onChange={(e)=>setOnBoardingData({...onBoardingData, bio: e.target.value})}
                  placeholder="Tell others about yourself..."
                />
              </div>

              {/* LANGUAGES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text ">
                      Native Language
                    </span>
                  </label>
                  <select
                    name="nativeLanguage"
                    value={onBoardingData.nativeLanguage}
                    className="select select-bordered w-full"
                    onChange={(e)=>setOnBoardingData({...onBoardingData, nativeLanguage: e.target.value})}
                  >
                    <option value="">Select your native language</option>
                    {LANGUAGES.map((language) => (
                      <option key={language} value={language.toLowerCase()}>
                        {language}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text ">
                      Learning Language
                    </span>
                  </label>
                  <select
                    name="learningLanguage"
                    value={onBoardingData.learningLanguage}
                    className="select select-bordered w-full"
                    onChange={(e)=>setOnBoardingData({...onBoardingData, learningLanguage: e.target.value})}
                  >
                    <option value="">Select your learning language</option>
                    {LANGUAGES.map((language) => (
                      <option key={language} value={language.toLowerCase()}>
                        {language}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

              {/* LOCATION */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                  <input type="text"
                    name="location"
                    value={onBoardingData.location}
                    onChange={(e)=>setOnBoardingData({...onBoardingData, location: e.target.value})}
                    className="input input-bordered w-full pl-10 "
                    placeholder="district, country"
                  />
                </div>
              </div>

              <button type="b" disabled={isPending} className="btn btn-primary w-full">
                {
                  !isPending? (
                    <>
                      <ShipWheelIcon className="size-5 mr-2" />
                      Completete Onboarding
                    </>
                  ) : (
                    <>
                      <LoaderIcon className="animate-spin size-5 mr-2" />
                      Onboarding ...
                    </>
                  )
                }
              </button>
          </form>
        </div>
      </div>

    </div>
  )
}
