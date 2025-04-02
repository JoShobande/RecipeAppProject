// src/screens/RecipeDetail/styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayInfo: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#fff',
    fontWeight: '600',
  },
  dot: {
    marginHorizontal: 6,
    color: '#fff',
    fontWeight: '600',
  },
  timeText: {
    color: '#fff',
    fontWeight: '600',
  },
  chefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  chefAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  chefInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chefName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chefLocation: {
    fontSize: 12,
    color: '#777',
  },
  followButton: {
    backgroundColor: '#00A651',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#00A651',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#00A651',
    fontWeight: '700',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  servingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  servingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  ingredientIcon: {
    marginRight: 10,
  },
  ingredientInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  ingredientName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  ingredientQuantity: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  stepContainer: {
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
