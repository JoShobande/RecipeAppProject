import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Share,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { updateDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import * as Clipboard from 'expo-clipboard';
import styles from './styles';
import { Colors } from '../../constants/theme';
import FollowButton from '../../components/FollowButton';

const { width } = Dimensions.get('window');

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const auth = getAuth();
  const currentUser = auth.currentUser;

  
  const [recipeData, setRecipeData] = useState(recipe);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [showMenu, setShowMenu] = useState(false);


  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);


  const [selectedRating, setSelectedRating] = useState(0);

  const [linkCopied, setLinkCopied] = useState(false);


  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const recipeRef = doc(db, 'recipes', recipe.id);
    const unsubscribe = onSnapshot(recipeRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setRecipeData({ id: docSnapshot.id, ...docSnapshot.data() });
      }
    });
    return () => unsubscribe();
  }, [recipe.id]);


  useEffect(() => {
    if (recipeData.createdBy && recipeData.createdBy !== currentUser.uid) {
      const chefDocRef = doc(db, 'users', recipeData.createdBy);
      getDoc(chefDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const chefData = docSnap.data();
            if (chefData.followers && Array.isArray(chefData.followers)) {
              setIsFollowing(chefData.followers.includes(currentUser.uid));
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching chef follow status:', error);
        });
    }
  }, [recipeData.createdBy, currentUser.uid]);

  // Example data
  const ingredientsData = recipeData.ingredients || [
    { name: 'Tomatoes', quantity: '500g' },
    { name: 'Cabbage', quantity: '300g' },
  ];
 

  // Determine whether the current user has saved the recipe.
  const isSaved =
    recipeData.savedBy && Array.isArray(recipeData.savedBy) && recipeData.savedBy.includes(currentUser.uid);

  // ------------------- MENU HANDLERS ------------------- //
  const handleShare = () => {
    setShowMenu(false);
    setShareModalVisible(true);
  };

  const handleRateRecipe = () => {
    setShowMenu(false);
    setRateModalVisible(true);
  };

  const handleReview = () => {
    setShowMenu(false);
    // Navigate to the Reviews screen, passing the recipe ID
    navigation.navigate('Reviews', { recipeId: recipeData.id });
  };

  // Toggle saved state: if saved, unsave; if not, save.
  const handleToggleSave = async () => {
    setShowMenu(false);
    try {
      const recipeRef = doc(db, 'recipes', recipeData.id);
      let newSavedBy = [];
      if (recipeData.savedBy && Array.isArray(recipeData.savedBy)) {
        if (isSaved) {
          newSavedBy = recipeData.savedBy.filter((uid) => uid !== currentUser.uid);
        } else {
          newSavedBy = [...recipeData.savedBy, currentUser.uid];
        }
      } else {
        newSavedBy = [currentUser.uid];
      }
      await updateDoc(recipeRef, { savedBy: newSavedBy });
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  // ------------------- FOLLOW HANDLER ------------------- //
  const handleFollowToggle = async () => {
    if (recipeData.createdBy && recipeData.createdBy !== currentUser.uid) {
      const chefDocRef = doc(db, 'users', recipeData.createdBy);
      try {
        const chefDocSnap = await getDoc(chefDocRef);
        let newFollowers = [];
        if (chefDocSnap.exists()) {
          const chefData = chefDocSnap.data();
          if (chefData.followers && Array.isArray(chefData.followers)) {
            if (isFollowing) {
              newFollowers = chefData.followers.filter(uid => uid !== currentUser.uid);
            } else {
              newFollowers = [...chefData.followers, currentUser.uid];
            }
          } else {
            newFollowers = [currentUser.uid];
          }
          await updateDoc(chefDocRef, { followers: newFollowers });
          setIsFollowing(!isFollowing);
        }
      } catch (error) {
        console.error("Error toggling follow:", error);
      }
    }
  };

  // ------------------- SHARE MODAL HANDLERS ------------------- //
  const handleCopyLink = async () => {
    const shareLink = `https://recipeapp.example.com/recipe/${recipeData.id}`;
    await Clipboard.setStringAsync(shareLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1500);
  };

  // ------------------- RATE HANDLERS ------------------- //
  const handleSelectRating = (rating) => {
    setSelectedRating(rating);
  };

  const handleRate = async () => {
    const recipeRef = doc(db, 'recipes', recipeData.id);
    const currentTotal = recipeData.ratingTotal || 0;
    const currentCount = recipeData.ratingCount || 0;
    const newTotal = currentTotal + selectedRating;
    const newCount = currentCount + 1;
    const newAverage = newTotal / newCount;
    try {
      await updateDoc(recipeRef, {
        ratingTotal: newTotal,
        ratingCount: newCount,
        rating: newAverage,
      });
      setRateModalVisible(false);
      setSelectedRating(0);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  // ------------------- RENDER ------------------- //
  return (
    <View style={styles.container}>
      {/* ---------- Top Bar (Back & Menu) ---------- */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Ionicons name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* ---------- Dropdown Menu ---------- */}
      {showMenu && (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#000" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleRateRecipe}>
            <Ionicons name="star-outline" size={20} color="#000" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Rate Recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleReview}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#000" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleToggleSave}>
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={20}
              color="#000"
              style={styles.menuIcon}
            />
            <Text style={styles.menuItemText}>{isSaved ? "Unsave" : "Save"}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ---------- Image Card ---------- */}
      <View style={styles.imageCard}>
        <Image
          source={
            recipeData?.image
              ? { uri: recipeData.image }
              : require('../../../assets/images/recipes/food.jpg')
          }
          style={styles.heroImage}
        />
        <View style={styles.overlay} />
        <View style={styles.overlayInfo}>
          <Text style={styles.recipeTitle} numberOfLines={2}>
            {recipeData?.name || 'Recipe Title'}
          </Text>
          <View style={styles.infoRow}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.ratingText}>{recipeData?.rating || 0}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.timeText}>{recipeData?.time || '20 min'}</Text>
          </View>
        </View>
      </View>

        {/* ---------- Chef / User Info ---------- */}
      <View style={styles.chefRowContainer}>
        <TouchableOpacity
          style={styles.chefInfoContainer}
          onPress={() => {
            if (recipeData.createdBy) {
              // If the chef is not the logged-in user, pass isOtherProfile: true
              if (recipeData.createdBy !== currentUser.uid) {
                navigation.navigate('Main', { 
                  screen: 'Profile', 
                  params: { userId: recipeData.createdBy, isOtherProfile: true } 
                });
              } else {
                navigation.navigate('Main', { 
                  screen: 'Profile', 
                  params: { userId: recipeData.createdBy } 
                });
              }
            }
          }}
        >
          <Image
            source={
              recipeData?.chefPhoto
                ? { uri: recipeData.chefPhoto }
                : require('../../../assets/images/avatar.jpeg')
            }
            style={styles.chefAvatar}
          />
          <View style={styles.chefInfo}>
            <Text style={styles.chefName}>{recipeData?.chef || 'Chef Name'}</Text>
          </View>
        </TouchableOpacity>
        {recipeData.createdBy !== currentUser.uid && (
          <FollowButton targetUserId={recipeData.createdBy} />
        )}
      </View>


      {/* ---------- Tab Row for Ingredients / Procedure ---------- */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'ingredients' && styles.tabButtonActive]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text style={[styles.tabText, activeTab === 'ingredients' && styles.tabTextActive]}>
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'procedure' && styles.tabButtonActive]}
          onPress={() => setActiveTab('procedure')}
        >
          <Text style={[styles.tabText, activeTab === 'procedure' && styles.tabTextActive]}>
            Procedure
          </Text>
        </TouchableOpacity>
      </View>

      {/* ---------- Content Area ---------- */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {activeTab === 'ingredients' ? (
          <View>
            <View style={styles.servingRow}>
              <Text style={styles.servingText}>Serves {recipeData?.servings}</Text>
              <Text style={styles.servingText}>{ingredientsData.length} items</Text>
            </View>
            {recipeData?.ingredients?.map((ing, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Ionicons name="checkmark-circle" size={24} color={Colors.primary} style={styles.ingredientIcon} />
                <View style={styles.ingredientInfo}>
                  <Text style={styles.ingredientName}>{ing.name}</Text>
                  <Text style={styles.ingredientQuantity}>{ing.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text>{recipeData.procedure}</Text>
          </View>
        )}
      </ScrollView>

      {/* ============== SHARE MODAL ============== */}
      <Modal visible={shareModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.shareModalContent}>
            <Text style={styles.shareModalTitle}>Recipe Link</Text>
            <Text style={styles.shareModalSubtitle}>
              Copy recipe link and share with friends and family
            </Text>
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>
                {`https://recipeapp.example.com/recipe/${recipeData.id}`}
              </Text>
              {linkCopied && <Text style={styles.linkCopiedText}>Link Copied!</Text>}
            </View>
            <TouchableOpacity style={styles.copyLinkButton} onPress={handleCopyLink}>
              <Text style={styles.copyLinkButtonText}>
                {linkCopied ? 'Copied' : 'Copy Link'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShareModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ============== RATE MODAL ============== */}
      <Modal visible={rateModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.rateModalContent}>
            <Text style={styles.rateModalTitle}>Rate recipe</Text>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((starValue) => (
                <TouchableOpacity
                  key={starValue}
                  onPress={() => handleSelectRating(starValue)}
                  style={{ marginHorizontal: 5 }}
                >
                  <Ionicons
                    name={starValue <= selectedRating ? 'star' : 'star-outline'}
                    size={32}
                    color="#FFC107"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.rateButton} onPress={handleRate}>
              <Text style={styles.rateButtonText}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setRateModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
