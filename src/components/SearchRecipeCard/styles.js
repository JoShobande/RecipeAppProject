import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../constants/theme';

const { width } = Dimensions.get('window');
// Adjust cardWidth as needed based on your design requirements
const cardWidth = (width - 60) / 2; 

export default StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Dark overlay at the bottom of the image
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50, // Adjust height for desired overlay effect
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  // Text container positioned over the overlay
  textContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
  },
  recipeTitle: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginBottom: 4,
    fontWeight: '700',
  },
  chefName: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
  },
  // New rating badge style to display the rating
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
