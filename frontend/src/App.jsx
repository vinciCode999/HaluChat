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
import { Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div data-theme="night" className='h-screen'>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Loginpage />} />
      </Routes>
      <Toaster />
    </div>
  )
}
