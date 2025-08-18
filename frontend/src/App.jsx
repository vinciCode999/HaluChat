import React from 'react'
import { 
  Homepage, 
  CallPage, 
  NotificationsPage, 
  ChatPage, 
  OnboardingPage, 
  SignupPage, 
  Loginpage 
} from './pages'
import { Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { axiosInstance } from './lib/axios';
export default function App() {

  const { data:authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async() => {
      const response = await axiosInstance.get('/auth/me');
      return response.data;
    },
    retry: false,
  });


  const authUser = authData?.user;

  return (
    <div data-theme="night" className='h-screen'>
      <Routes>
        <Route path="/" element={ authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
        <Route path="/call" element={ authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={ authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={ authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={ authUser ? <OnboardingPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}
