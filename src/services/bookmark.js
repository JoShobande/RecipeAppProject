// src/services/bookmark.js
import { updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Toggles the bookmark status for a given recipe.
 * If the current user has saved the recipe, it removes the user.
 * Otherwise, it adds the user.
 *
 * @param {Object} recipe - The recipe document data.
 * @param {string} currentUserUid - The current user's UID.
 * @returns {Promise<void>}
 */
export const toggleBookmark = async (recipe, currentUserUid) => {
  try {
    const recipeRef = doc(db, 'recipes', recipe.id);
    let newSavedBy = [];
    if (recipe.savedBy && Array.isArray(recipe.savedBy)) {
      if (recipe.savedBy.includes(currentUserUid)) {
        // Unsave: remove current user UID.
        newSavedBy = recipe.savedBy.filter((uid) => uid !== currentUserUid);
      } else {
        // Save: add current user UID.
        newSavedBy = [...recipe.savedBy, currentUserUid];
      }
    } else {
      newSavedBy = [currentUserUid];
    }
    await updateDoc(recipeRef, { savedBy: newSavedBy });
  } catch (error) {
    console.error("Error updating bookmark: ", error);
    throw error;
  }
};
