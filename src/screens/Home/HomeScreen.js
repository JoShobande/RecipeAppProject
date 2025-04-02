// src/screens/Home/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { Colors } from '../../constants/theme';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';

const { width } = Dimensions.get('window');
const sideSpacing = 20; // used in FlatList contentContainerStyle for consistent horizontal padding
const interItemSpacing = 10; // space between columns in grid
const cardWidth = (width - (2 * sideSpacing) - interItemSpacing) / 2;


const CATEGORIES = [
  { id: 'all', title: 'All' },
  { id: 'indian', title: 'Indian' },
  { id: 'italian', title: 'Italian' },
  { id: 'asian', title: 'Asian' },
  { id: 'chinese', title: 'Chinese' },
];

// RecipeCard component used for both Popular and All Recipes
function RecipeCard({ item, cardWidth }) {
  return (
    <TouchableOpacity style={[styles.cardContainer, { width: cardWidth }]}>
      <View style={styles.cardImageWrapper}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      {/* Bottom row for time and bookmark, absolutely positioned */}
      <View style={styles.cardBottomRow}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeLabel}>Time</Text>
          <Text style={styles.timeValue}>{item.time}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkIcon}>
          <Ionicons name="bookmark-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const filterButtonWidth = 44;
const searchContainerWidth = width - (2 * sideSpacing) - filterButtonWidth - 10;

function ListHeaderComponent({ popularRecipes, renderPopularItem, selectedCategory, onCategorySelect }) {

  const [showFilterModal, setShowFilterModal] = useState(false);
  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  return (
    <View style={{ marginTop: 40, marginBottom: 30 }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello Jega</Text>
          <Text style={styles.subGreeting}>What are you cooking today?</Text>
        </View>
        {/*
        <TouchableOpacity style={styles.avatarWrapper}>
          <Image source={require('../../../assets/images/avatar.png')} style={styles.avatar} />
        </TouchableOpacity>
        */}
      </View>
        <View style={styles.searchRow}>
          <View style={[styles.searchContainer, { width: searchContainerWidth }]}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search recipe"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
            <Ionicons name="options-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                item.id === selectedCategory && styles.categoryItemSelected,
              ]}
              onPress={() => onCategorySelect(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  item.id === selectedCategory && styles.categoryTextSelected,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {popularRecipes.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Popular Recipes</Text>
          <View style={{ overflow: 'visible', marginTop: 40 }}>
            <FlatList
              data={popularRecipes}
              horizontal
              removeClippedSubviews={false}
              style={{ overflow: 'visible' }}
              contentContainerStyle={{ paddingHorizontal: sideSpacing, overflow: 'visible' }}
              renderItem={renderPopularItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          </View>
        </>
      )}
      <Text style={[styles.sectionTitle, {marginTop:40, marginBottom:40}]}>All Recipes</Text>
      <Modal visible={showFilterModal} transparent animationType="fade">
        <View style={styles.filterModalContainer}>
          <View style={styles.filterModalContent}>
            <Text style={styles.filterModalTitle}>Filter Search</Text>
            {/* Filter Content (Time, Rate, Category, etc.) */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Time</Text>
              <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterChipText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterChipText}>Newest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterChipText}>Oldest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterChipText}>Popularity</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Example: Rate */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Rate</Text>
              <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterChip}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.filterChipText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.filterChipText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.filterChipText}>3</Text>
                </TouchableOpacity>
                {/* ... */}
              </View>
            </View>

            {/* Example: Category */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterChipText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterChipText}>Cereal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterChipText}>Vegetables</Text>
                </TouchableOpacity>
                {/* ... */}
              </View>
            </View>

            <TouchableOpacity style={styles.filterApplyButton} onPress={toggleFilterModal}>
              <Text style={styles.filterApplyButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function HomeScreen() {

  const [allRecipes, setAllRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'recipes'),
      (snapshot) => {
        const fetchedRecipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllRecipes(fetchedRecipes);
        const popular = fetchedRecipes.filter(
          (recipe) => recipe.saved && recipe.saved > 5
        );
        setPopularRecipes(popular);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    );
  
    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const filteredRecipes =
  selectedCategory === 'all'
    ? allRecipes
    : allRecipes.filter(recipe =>
        Array.isArray(recipe.category)
          ? recipe.category.includes(selectedCategory)
          : recipe.category === selectedCategory
      );

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const listEmptyComponent = () => (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 18, color: Colors.primary }}>No recipes found</Text>
    </View>
  );

  const renderPopularItem = ({ item }) => (
    <RecipeCard item={item} cardWidth={140} />
  );
  const renderAllRecipeItem = ({ item }) => (
    <RecipeCard item={item} cardWidth={cardWidth} />
  );

  return (

    <FlatList
      data={filteredRecipes}
      keyExtractor={(item) => item.id}
      renderItem={renderAllRecipeItem}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginBottom: 60, // vertical gap between rows
      }}
      ListHeaderComponent={
        <ListHeaderComponent
          popularRecipes={popularRecipes}
          renderPopularItem={renderPopularItem}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      }
      ListEmptyComponent={listEmptyComponent}
      contentContainerStyle={{ paddingHorizontal: sideSpacing, paddingBottom: 100 }}
    />
  );
}
