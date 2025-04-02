// src/screens/RecipeDetail/RecipeDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, FontSizes } from '../../constants/theme';
import styles from './styles';

const { width } = Dimensions.get('window');

export default function RecipeDetailScreen({ route, navigation }) {
  // Receive the recipe object via route.params
  const { recipe } = route.params;

  // State for tab selection: 'ingredients' or 'procedure'
  const [activeTab, setActiveTab] = useState('ingredients');

  // Example ingredients & procedure data
  const ingredientsData = recipe?.ingredients || [
    { name: 'Tomatoes', quantity: '500g' },
    { name: 'Cabbage', quantity: '300g' },
    // ... add more as needed
  ];

  const procedureData = recipe?.procedure || [
    'Step 1: Prepare the vegetables.',
    'Step 2: Cook on medium heat until done.',
    // ... add more as needed
  ];

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Image
          source={
            recipe?.image
              ? { uri: recipe.image }
              : require('../../../assets/images/recipes/food.jpg')
          }
          style={styles.heroImage}
        />
        <View style={styles.overlayInfo}>
          <Text style={styles.recipeTitle} numberOfLines={2}>
            {recipe?.name || 'Recipe Title'}
          </Text>
          <View style={styles.infoRow}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.ratingText}>{recipe?.rating || 0}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.timeText}>{recipe?.time || '20 min'}</Text>
          </View>
        </View>
      </View>

      {/* Chef Info */}
      <View style={styles.chefRow}>
        <Image
          source={
            recipe?.chefPhoto
              ? { uri: recipe.chefPhoto }
              : require('../../../assets/images/avatar.png')
          }
          style={styles.chefAvatar}
        />
        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>{recipe?.chefName || 'Chef Name'}</Text>
          <Text style={styles.chefLocation}>
            {recipe?.location || 'Location, Country'}
          </Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'ingredients' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'ingredients' && styles.tabTextActive,
            ]}
          >
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'procedure' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('procedure')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'procedure' && styles.tabTextActive,
            ]}
          >
            Procedure
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {activeTab === 'ingredients' ? (
          <View>
            <View style={styles.servingRow}>
              <Text style={styles.servingText}>Serves 1</Text>
              <Text style={styles.servingText}>
                {ingredientsData.length} items
              </Text>
            </View>
            {ingredientsData.map((ing, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={Colors.primary}
                  style={styles.ingredientIcon}
                />
                <View style={styles.ingredientInfo}>
                  <Text style={styles.ingredientName}>{ing.name}</Text>
                  <Text style={styles.ingredientQuantity}>{ing.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {procedureData.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <Text style={styles.stepNumber}>Step {index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
