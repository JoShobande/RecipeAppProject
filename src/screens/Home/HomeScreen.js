// src/screens/Home/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { Colors } from '../../constants/theme';

const { width } = Dimensions.get('window');
const sideSpacing = 20; // used in FlatList contentContainerStyle for consistent horizontal padding
const interItemSpacing = 10; // space between columns in grid
const cardWidth = (width - (2 * sideSpacing) - interItemSpacing) / 2;

// Dummy data for Popular recipes
const POPULAR_RECIPES = [
  {
    id: '1',
    title: 'Classic Greek Salad',
    time: '15 Mins',
    rating: 4.5,
    image: require('../../../assets/images/recipes/food.jpg'),
  },
  {
    id: '2',
    title: 'Crunchy Nut Coleslaw',
    time: '10 Mins',
    rating: 4.3,
    image: require('../../../assets/images/recipes/food.jpg'),
  },
  {
    id: '3',
    title: 'Tomato Bruschetta',
    time: '12 Mins',
    rating: 4.6,
    image: require('../../../assets/images/recipes/food.jpg'),
  },
  {
    id: '4',
    title: 'Caesar Salad',
    time: '18 Mins',
    rating: 4.4,
    image: require('../../../assets/images/recipes/food.jpg'),
  },
];

// Dummy data for All Recipes (unchanged)
const ALL_RECIPES = [
  { id: '5', title: 'Steak with Tomatoes', time: '20 Mins', rating: 4.7, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '6', title: 'Pilaf Sweet Rice', time: '25 Mins', rating: 4.5, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '7', title: 'Chicken Alfredo', time: '30 Mins', rating: 4.8, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '8', title: 'Veggie Pizza', time: '15 Mins', rating: 4.2, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '9', title: 'Spaghetti Carbonara', time: '20 Mins', rating: 4.6, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '10', title: 'Margherita Pizza', time: '18 Mins', rating: 4.4, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '11', title: 'Sushi Platter', time: '35 Mins', rating: 4.9, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '12', title: 'Beef Tacos', time: '25 Mins', rating: 4.5, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '13', title: 'Quinoa Salad', time: '15 Mins', rating: 4.3, image: require('../../../assets/images/recipes/food.jpg') },
  { id: '14', title: 'Pancakes', time: '20 Mins', rating: 4.2, image: require('../../../assets/images/recipes/food.jpg') },
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
          {item.title}
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

// ListHeaderComponent: renders header, search bar, and horizontal Popular list.
// Note: The header and section titles are rendered without extra left margins.
function ListHeaderComponent({ renderPopularItem }) {

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
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipe"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
          <Ionicons name="options-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Popular Recipes</Text>
      <View style={{ overflow: 'visible', marginTop:40 }}>
        <FlatList
          data={POPULAR_RECIPES}
          horizontal
          removeClippedSubviews={false} // prevents clipping
          style={{ overflow: 'visible' }}
          contentContainerStyle={{ paddingHorizontal: sideSpacing, overflow: 'visible' }}
          renderItem={renderPopularItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>
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
  const renderPopularItem = ({ item }) => (
    <RecipeCard item={item} cardWidth={140} />
  );
  const renderAllRecipeItem = ({ item }) => (
    <RecipeCard item={item} cardWidth={cardWidth} />
  );

  return (
    <FlatList
      data={ALL_RECIPES}
      keyExtractor={(item) => item.id}
      renderItem={renderAllRecipeItem}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginBottom: 60, // vertical gap between rows
      }}
      ListHeaderComponent={<ListHeaderComponent renderPopularItem={renderPopularItem} />}
      contentContainerStyle={{ paddingHorizontal: sideSpacing, paddingBottom: 100 }}
    />
  );
}
