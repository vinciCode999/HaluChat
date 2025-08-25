import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';

export const getRecommendedUsers = async(req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const getRecommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude current user
        { _id: { $nin: currentUser.friends } }, // Exclude current user's friends
        {isOnBoarded: true} // Only include users who have completed onboarding
      ]
    })

    res.status(200).json(getRecommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers function:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyFriends = async(req, res) => {
  try {
    const user = await User.findById(req.user._id)
    .select('friends').populate('friends', 'fullName avatar nativeLanguage learningLanguage');
    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends function:",error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const sendFriendRequest = async(req, res) => { 
  try {
    const myId = req.user.id;

    //if comfortable using recipientId than actual id from params
    const { id:recipientId } = req.params;

    //prevent sending request to one self
    if(myId === recipientId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself." });
    }

    const recipient = await User.findById(recipientId);

    if(!recipient) {
      return res.status(404).json({ message: "Recipient not found." });
    }

    //check if already friends
    if(recipient.friends.includes(myId)){
      return res.status(400).json({ message: "You are already friends with this user." });
    }

    //check if request already exists
    const existingRequest = await FriendRequest.findOne({
      $or:[
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId }
      ]
    })

    if(existingRequest) {
      return res.status(400).json({ message: "Friend request already exists." });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId
    });

    res.status(200).json(friendRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest controller: ", error.message);
    return res.status(500).json({message: "Internal server error"});
  }
}


export const acceptFriendRequest = async(req, res) => {
  try {
    //rename id to requestId
    const { id:requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if(!friendRequest) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    //verify the current user is recipient
    if(friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to accept this friend request." });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    //add each user to other's friends array
    //$addToSet operator ensures no duplicates
    await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: friendRequest.recipient } });
    await User.findByIdAndUpdate(friendRequest.recipient, { $addToSet: { friends: friendRequest.sender } });

    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller: ", error.message);
    return res.status(500).json({message: "Internal server error"});
  }
}


export const getFriendRequests = async(req, res) => {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending"
    }).populate('sender', 'fullName avatar learningLanguage nativeLanguage');

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted"
    }).populate("recipient", 'fullName avatar');


    res.status(200).json({incomingReqs, acceptedReqs});


  } catch (error) {
    console.log("Error in getFriendRequests controller: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getOutgoingFriendRequests = async(req, res) => {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "pending"
    }).populate('recipient', 'fullName avatar learningLanguage nativeLanguage');

    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("Error in getOutgoingFriendRequests controller: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
    
  }
}