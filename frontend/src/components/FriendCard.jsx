import { Link } from 'react-router';
import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants';

export const FriendCard = ({ friend }) => {
  return (
   <div className="card bg-base-200 hover:shadow-md transition-shadow p-3 w-full max-w-sm">
    <div className="card-body p-0">
    {/* USER INFO */}
    <div className="flex items-center gap-3 mb-3">
      <div className="avatar w-12 h-12">
        <img src={friend.avatar} alt={friend.fullName} className="object-cover rounded-full" />
      </div>
      <h3 className="font-semibold truncate max-w-[calc(100%-3rem)]">
        {friend.fullName}
      </h3>
    </div>
  </div>

  <div className="flex flex-wrap gap-1.5 mb-3">
    <span className="badge badge-secondary text-xs">
      {getLanguageFlag(friend.nativeLanguage)}
      Native: {friend.nativeLanguage}
    </span>

    <span className="badge badge-outline text-xs">
      {getLanguageFlag(friend.learningLanguage)}
      Learning: {friend.learningLanguage}
    </span>

    <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
      Message
    </Link>
  </div>
  </div>
  )
}

export function getLanguageFlag(language) {
  if(!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if(countryCode){
    return(
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    )
  }
  
  return null;
}