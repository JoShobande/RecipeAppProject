import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../services/firebase';
import styles from './ReviewStyle'; // or define inline styles

export default function ReviewsScreen({ route, navigation }) {
  const { recipeId } = route.params;
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');

  // Listen for changes in the subcollection "recipes/{recipeId}/reviews"
  useEffect(() => {
    const reviewsRef = collection(db, 'recipes', recipeId, 'reviews');
    const q = query(reviewsRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(fetchedReviews);
    });

    return () => unsubscribe();
  }, [recipeId]);

  // Send a new comment
  const handleSend = async () => {
    if (!comment.trim()) return;

    try {
      await addDoc(collection(db, 'recipes', recipeId, 'reviews'), {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Unknown User',
        userAvatar: currentUser.photoURL || '', // if you have user avatars
        comment: comment.trim(),
        timestamp: serverTimestamp(),
      });
      setComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Render each review item
  const renderReviewItem = ({ item }) => {
    // Convert Firestore timestamp to a readable date/time
    const dateString = item.timestamp
      ? new Date(item.timestamp.toDate()).toLocaleString()
      : '';

    return (
      <View style={styles.reviewItem}>
        <Image
          source={
            item.userAvatar
              ? { uri: item.userAvatar }
              : require('../../../assets/images/recipes/food.jpg')
          }
          style={styles.reviewAvatar}
        />
        <View style={styles.reviewContent}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewUserName}>{item.userName}</Text>
            <Text style={styles.reviewDate}>{dateString}</Text>
          </View>
          <Text style={styles.reviewComment}>{item.comment}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with back arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        {/* Example: show total comments, total saves */}
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>
            {reviews.length} Comments
          </Text>
        </View>
      </View>

      {/* Reviews list */}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.listContentContainer}
        style={{ flex: 1 }}
      />

      {/* Comment input row */}
      <View style={styles.commentRow}>
        <TextInput
          style={styles.commentInput}
          placeholder="Say something..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
