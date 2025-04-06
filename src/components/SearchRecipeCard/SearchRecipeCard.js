import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const defaultRecipeImage = require('../../../assets/images/recipes/food.jpg');

const SearchRecipeCard = ({ item}) => {
  const chefName = item.chef || 'Unknown';
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
      <View style={styles.imageContainer}>
        <Image source={defaultRecipeImage} style={styles.cardImage} />
        {/* Rating badge at the top-right */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        {/* Dark overlay at the bottom */}
        <View style={styles.overlay} />
        {/* Text container on top of overlay */}
        <View style={styles.textContainer}>
          <Text style={styles.recipeTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.chefName}>By Chef {chefName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchRecipeCard;
