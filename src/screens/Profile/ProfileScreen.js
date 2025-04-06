import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../services/firebase';
import SearchRecipeCard from '../../components/SearchRecipeCard/SearchRecipeCard';
import styles from './styles';
import { Colors } from '../../constants/theme';
import { useRoute } from '@react-navigation/native';
import FollowButton from '../../components/FollowButton';

export default function ProfileScreen() {

  const route = useRoute();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const isOtherProfile = route.params?.isOtherProfile;
  const profileUserId = route.params?.userId || currentUser?.uid;

  const [profileData, setProfileData] = useState(null);


  useEffect(() => {
    const userDocRef = doc(db, 'users', profileUserId);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setProfileData(docSnapshot.data());
      }
    });
    return () => unsubscribe();
  }, [profileUserId]);
 


  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recipes');


  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'recipes'),
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllRecipes(fetched);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);


  const userRecipes = allRecipes.filter(
    (r) => r.createdBy === profileUserId
  );
 
  const savedRecipes = allRecipes.filter(
    (r) => r.savedBy && r.savedBy.includes(profileUserId)
  );


  const displayedData = (!isOtherProfile || activeTab === 'recipes')
  ? userRecipes
  : savedRecipes;

  if (loading ) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header / Profile Info */}
      <View style={styles.headerSection}>
        <Image
          source={
            profileData?.photoURL
              ? { uri: profileData.photoURL }
              : require('../../../assets/images/recipes/food.jpg')
          }
          style={styles.avatar}
        />
        <Text style={styles.userName}>
          {`${profileData?.firstName} ${profileData.lastName}`}
        </Text>
        <Text style={styles.userRole}>
          {isOtherProfile ? 'Chef' : 'Your Chef Profile'}
        </Text>
        <Text style={styles.userBio}>
          {profileData?.bio || 'Passionate about food and life 🍜🍔'}
        </Text>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userRecipes.length}</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData?.followers?.length}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileData?.following?.length}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <View style={{marginTop:10}}>
          {isOtherProfile && currentUser.uid !== profileUserId && (
            <FollowButton targetUserId={profileUserId} />
          )}
        </View>
       
      </View>

      {/* Tabs: Only show if viewing own profile */}
      {!isOtherProfile && (
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'recipes' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('recipes')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'recipes' && styles.tabTextActive,
              ]}
            >
              Recipes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'saved' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('saved')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'saved' && styles.tabTextActive,
              ]}
            >
              Saved
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      {displayedData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {(!isOtherProfile && activeTab === 'recipes') || isOtherProfile
              ? 'No recipes created yet.'
              : 'No saved recipes yet.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchRecipeCard item={item} />}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}
