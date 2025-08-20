import React from 'react'
import { 
  Homepage, 
  CallPage, 
  NotificationsPage, 
  ChatPage, 
  OnboardingPage, 
  SignupPage, 
  Loginpage,
  FriendsPage
} from './pages'
import { Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast';
import { PageLoader } from './components/PageLoader';
import useAuthUser from './hooks/userAuthUser';
import Layout from './components/Layout';
import { ThemeSelector } from './components/ThemeSelector';

export default function App() {
  const {isLoading, authUser} = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnBoarded;



  if (isLoading) return <PageLoader />;

  return (
    <div data-theme="forest" className='h-screen'>
      <Routes>
        <Route path="/" element={ isAuthenticated && isOnBoarded?(
          <Layout showSidebar={true}>
            <Homepage />
          </Layout>
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
        }/>
        <Route path="/call" element={ isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={ isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/friends" element={ isAuthenticated ? <FriendsPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={ isAuthenticated ? (
          <Layout>
            <ChatPage /> 
          </Layout>
        ): <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}
