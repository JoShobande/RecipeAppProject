// src/screens/Favourites/FavouritesScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../services/firebase";
import SearchRecipeCard from "../../components/SearchRecipeCard/SearchRecipeCard";
import { Colors, Fonts, FontSizes } from "../../constants/theme";

const { width } = Dimensions.get("window");

const FavouritesScreen = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "recipes"),
      (snapshot) => {
        const fetchedRecipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Filter for recipes saved by the current user.
        const userSavedRecipes = fetchedRecipes.filter(
          (recipe) =>
            recipe.savedBy && Array.isArray(recipe.savedBy) && recipe.savedBy.includes(currentUser.uid)
        );
        setSavedRecipes(userSavedRecipes);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching saved recipes:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentUser.uid]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (savedRecipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You haven't saved any recipes yet.</Text>
      </View>
    );
  }

  const renderSavedRecipe = ({ item }) => <SearchRecipeCard item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Saved Recipes</Text>
      </View>
      <FlatList
        data={savedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderSavedRecipe}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || "#F8F8F8",
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.primary,
    textAlign: "center",
  },
});

export default FavouritesScreen;
