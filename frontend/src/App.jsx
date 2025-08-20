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
import { PageLoader } from './components/PageLoader';
import useAuthUser from './hooks/userAuthUser';
export default function App() {

  const {isLoading, authUser} = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnBoarded;

  if (isLoading) return <PageLoader />;

  return (
    <div data-theme="night" className='h-screen'>
      <Routes>
        <Route path="/" element={ isAuthenticated && isOnBoarded?(
          <Homepage />
        ):(
          <Navigate to={!isAuthenticated? "/login" : "/onboarding"} />
        ) } />

        <Route path="/signup" element={
          !isAuthenticated ? <SignupPage /> : <Navigate to={!isOnBoarded ? "/onboarding" : "/" } 
          />} />

        <Route path="/login" element={
          !isAuthenticated ? <Loginpage /> : <Navigate to={!isOnBoarded ? "/onboarding" : "/"
        } />} />

        <Route path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnBoarded ? (<OnboardingPage />):(
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
       />
        <Route path="/call" element={ isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={ isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={ isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}
