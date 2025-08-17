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