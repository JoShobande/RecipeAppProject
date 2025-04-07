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
  ActivityIndicator,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { Colors } from '../../constants/theme';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../services/firebase';
import SearchRecipeCard from '../../components/SearchRecipeCard/SearchRecipeCard';
import { toggleBookmark } from '../../services/bookmark';
import { useNavigation } from '@react-navigation/native';
import {useAuthContext} from '../../context/AuthContext'


const { width } = Dimensions.get('window');
const sideSpacing = 20; 
const interItemSpacing = 10; 
const cardWidth = (width - (2 * sideSpacing) - interItemSpacing) / 2;

const CATEGORIES = [
  { id: 'all', title: 'All' },
  { id: 'indian', title: 'Indian' },
  { id: 'italian', title: 'Italian' },
  { id: 'asian', title: 'Asian' },
  { id: 'chinese', title: 'Chinese' },
];

// --------------------------------------------------------------------
// RecipeCard (for Home view grid)
// --------------------------------------------------------------------
function RecipeCard({ item, cardWidth, onToggleBookmark, isBookmarked}) {
  const navigation = useNavigation();
  const { logOut } = useAuthContext();
  return (
    <TouchableOpacity 
      style={[styles.cardContainer, { width: cardWidth }]}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <View style={styles.cardImageWrapper}>
        <Image
          source={require('../../../assets/images/recipes/food.jpg')}
          style={styles.cardImage}
        />
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
      <View style={styles.cardBottomRow}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeLabel}>Time</Text>
          <Text style={styles.timeValue}>{item.time}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookmarkIcon}
          onPress={() => onToggleBookmark(item)}
        >
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// --------------------------------------------------------------------
// ListHeaderComponent (for Home mode)
// --------------------------------------------------------------------
function ListHeaderComponent({
  popularRecipes,
  renderPopularItem,
  selectedCategory,
  onCategorySelect,
  searchText,
  setSearchText,
  onSearchFocus,
  toggleFilterModal,
}) {

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }, (error) => {
        console.error("Error listening for user updates:", error);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <View style={{ marginTop: 40, marginBottom: 30 }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello {userData?.firstName} {userData?.lastName},</Text>
          <Text style={styles.subGreeting}>What are you cooking today?</Text>
        </View>
      </View>
      <View style={styles.searchRow}>
        <View
          style={[
            styles.searchContainer,
            { width: width - (2 * sideSpacing) - 54 },
          ]}
        >
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipe"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={onSearchFocus}
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
              contentContainerStyle={{
                paddingHorizontal: sideSpacing,
                overflow: 'visible',
              }}
              renderItem={renderPopularItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          </View>
        </>
      )}
      <Text style={[styles.sectionTitle, { marginTop: 40, marginBottom: 40 }]}>
        All Recipes
      </Text>
    </View>
  );
}

// --------------------------------------------------------------------
// SearchResultsHeader (for Search mode)
// --------------------------------------------------------------------
function SearchResultsHeader({ searchText, setSearchText, onBackPress, toggleFilterModal }) {
  return (
    <View style={{ paddingTop: 40, paddingBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={onBackPress} style={{ marginRight: 10 }}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.sectionTitle, { flex: 1, textAlign: 'center' }]}>
          Search Result
        </Text>
      </View>
      <View style={styles.searchRow}>
        <View
          style={[
            styles.searchContainer,
            { width: width - (2 * sideSpacing) - 54 },
          ]}
        >
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipe"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
          <Ionicons name="options-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --------------------------------------------------------------------
// HomeScreen Component
// --------------------------------------------------------------------
export default function HomeScreen() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search state: search mode activates when searchText is non-empty.
  const [searchText, setSearchText] = useState('');

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;


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
    return () => unsubscribe();
  }, []);

  // Apply search, category, and rating filters
  const applyFilters = (recipes) => {
    let filtered = [...recipes];
    if (searchText.trim()) {
      filtered = filtered.filter((r) =>
        r.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((r) =>
        Array.isArray(r.category)
          ? r.category.includes(selectedCategory)
          : r.category === selectedCategory
      );
    }
    if (selectedRating) {
      filtered = filtered.filter((r) => Number(r.rating || 0) >= selectedRating);
    }
    return filtered;
  };

  const displayedRecipes = applyFilters(allRecipes);

  const handleToggleBookmark = async (recipe) => {
    try {
      await toggleBookmark(recipe, currentUser.uid);
    } catch (error) {
      // Handle error as needed.
    }
  };

  // Renderers for FlatLists
  const renderPopularItem = ({ item }) => (
    <RecipeCard
      item={item}
      cardWidth={140}
      onToggleBookmark={handleToggleBookmark}
      isBookmarked={item.savedBy && item.savedBy.includes(currentUser.uid)}
    />
  );
  const renderAllRecipeItem = ({ item }) => (
    <RecipeCard
      item={item}
      cardWidth={cardWidth}
      onToggleBookmark={handleToggleBookmark}
      isBookmarked={item.savedBy && item.savedBy.includes(currentUser.uid)}
    />
  );
  const renderSearchResultItem = ({ item }) => (
    <SearchRecipeCard item={item} />
  );

  const onSearchFocus = () => {

  };

  const handleBackPress = () => {
    setSearchText('');
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const listEmptyComponent = () => (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 18, color: Colors.primary }}>No recipes found</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedRating(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {searchText.trim() !== '' ? (
        // ------------------- SEARCH MODE -------------------
        <FlatList
          data={displayedRecipes}
          keyExtractor={(item) => item.id}
          renderItem={renderSearchResultItem}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
          ListHeaderComponent={
            <SearchResultsHeader
              searchText={searchText}
              setSearchText={setSearchText}
              onBackPress={handleBackPress}
              toggleFilterModal={toggleFilterModal}
            />
          }
          ListEmptyComponent={listEmptyComponent}
          contentContainerStyle={{ paddingHorizontal: sideSpacing, paddingBottom: 100 }}
        />
      ) : (
        // ------------------- HOME MODE -------------------
        <FlatList
          data={displayedRecipes}
          keyExtractor={(item) => item.id}
          renderItem={renderAllRecipeItem}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 60,
          }}
          ListHeaderComponent={
            <ListHeaderComponent
              popularRecipes={popularRecipes}
              renderPopularItem={renderPopularItem}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              searchText={searchText}
              setSearchText={setSearchText}
              onSearchFocus={onSearchFocus}
              toggleFilterModal={toggleFilterModal}
            />
          }
          ListEmptyComponent={listEmptyComponent}
          contentContainerStyle={{ paddingHorizontal: sideSpacing, paddingBottom: 100 }}
        />
      )}

      {/* ------------------- FILTER MODAL ------------------- */}
      <Modal visible={showFilterModal} transparent animationType="fade">
        <View style={styles.filterModalContainer}>
          <View style={styles.filterModalContent}>
            <Text style={styles.filterModalTitle}>Filter Search</Text>
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <View style={styles.filterRow}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.filterChip,
                      selectedCategory === cat.id && styles.filterChipSelected,
                    ]}
                    onPress={() => setSelectedCategory(cat.id)}
                  >
                    <Text style={styles.filterChipText}>{cat.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Rating</Text>
              <View style={styles.filterRow}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <TouchableOpacity
                    key={star}
                    style={[
                      styles.filterChip,
                      selectedRating === star && styles.filterChipSelected,
                    ]}
                    onPress={() =>
                      setSelectedRating(selectedRating === star ? null : star)
                    }
                  >
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.filterChipText}>{star}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {/* Modal Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
              <TouchableOpacity
                style={[styles.filterApplyButton, { backgroundColor: '#ccc', marginRight: 10 }]}
                onPress={() => {
                  clearFilters();
                  toggleFilterModal();
                }}
              >
                <Text style={styles.filterApplyButtonText}>Clear Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterApplyButton}
                onPress={() => toggleFilterModal()}
              >
                <Text style={styles.filterApplyButtonText}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
