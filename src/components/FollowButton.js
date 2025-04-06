import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Colors } from '../constants/theme';

export default function FollowButton({ targetUserId, style, textStyle }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Only show follow functionality if the target is not the current user.
  useEffect(() => {
    if (!targetUserId || targetUserId === currentUser.uid) {
      setLoading(false);
      return;
    }
    const fetchFollowStatus = async () => {
      try {
        const chefDocRef = doc(db, 'users', targetUserId);
        const chefDocSnap = await getDoc(chefDocRef);
        if (chefDocSnap.exists()) {
          const chefData = chefDocSnap.data();
          if (chefData.followers && Array.isArray(chefData.followers)) {
            setIsFollowing(chefData.followers.includes(currentUser.uid));
          }
        }
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
      setLoading(false);
    };
    fetchFollowStatus();
  }, [targetUserId, currentUser.uid]);

  const handleFollowToggle = async () => {
    if (!targetUserId || targetUserId === currentUser.uid) return;
    try {
      // Update the target user's followers list.
      const chefDocRef = doc(db, 'users', targetUserId);
      const chefDocSnap = await getDoc(chefDocRef);
      let newFollowers = [];
      if (chefDocSnap.exists()) {
        const chefData = chefDocSnap.data();
        if (chefData.followers && Array.isArray(chefData.followers)) {
          newFollowers = isFollowing
            ? chefData.followers.filter(uid => uid !== currentUser.uid)
            : [...chefData.followers, currentUser.uid];
        } else {
          newFollowers = [currentUser.uid];
        }
        await updateDoc(chefDocRef, { followers: newFollowers });
      }

      // Update the current user's following list.
      const currentUserDocRef = doc(db, 'users', currentUser.uid);
      const currentUserDocSnap = await getDoc(currentUserDocRef);
      let newFollowing = [];
      if (currentUserDocSnap.exists()) {
        const currentUserData = currentUserDocSnap.data();
        if (currentUserData.following && Array.isArray(currentUserData.following)) {
          newFollowing = isFollowing
            ? currentUserData.following.filter(uid => uid !== targetUserId)
            : [...currentUserData.following, targetUserId];
        } else {
          newFollowing = [targetUserId];
        }
        await updateDoc(currentUserDocRef, { following: newFollowing });
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="small" color={Colors.primary} />;
  }

  return (
    <TouchableOpacity onPress={handleFollowToggle} style={[defaultStyles.button, style]}>
      <Text style={[defaultStyles.text, textStyle]}>
        {isFollowing ? 'Following' : 'Follow'}
      </Text>
    </TouchableOpacity>
  );
}

const defaultStyles = {
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
};
