import { axiosInstance } from '../lib/axios';
export const signup = async(signupData)=>{
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
}

export const login = async(loginData)=>{
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
}

export const getAuthUser = async() => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
}

export const completeOnBoarding = async(onBoardingData)=>{
  const response = await axiosInstance.post('/auth/onboarding', onBoardingData);
  return response.data;
}