// src/screens/Profile/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../services/firebase';
import SearchRecipeCard from '../../components/SearchRecipeCard/SearchRecipeCard';
import styles from './styles';
import { Colors, Fonts, FontSizes } from '../../constants/theme';

export default function ProfileScreen() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  // activeTab: 'recipes' shows recipes owned by the user, 'saved' shows recipes saved by the user.
  const [activeTab, setActiveTab] = useState('recipes');

  const auth = getAuth();
  const currentUser = auth.currentUser;

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

  // Recipes owned by the logged in user.
  const userRecipes = allRecipes.filter(
    (r) => r.createdBy === currentUser?.uid
  );
  // Recipes saved by the logged in user.
  const savedRecipes = allRecipes.filter(
    (r) => r.savedBy && r.savedBy.includes(currentUser?.uid)
  );

  const displayedData = activeTab === 'recipes' ? userRecipes : savedRecipes;

  if (loading) {
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
            currentUser?.photoURL
              ? { uri: currentUser.photoURL }
              : require('../../../assets/images/recipes/food.jpg')
          }
          style={styles.avatar}
        />
        <Text style={styles.userName}>
          {currentUser?.displayName || 'User Name'}
        </Text>
        <Text style={styles.userRole}>Chef</Text>
        <Text style={styles.userBio}>Passionate about food and life 🍜🍔</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userRecipes.length}</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.5M</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>259</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
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

      {/* Content */}
      {displayedData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {activeTab === 'recipes'
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
