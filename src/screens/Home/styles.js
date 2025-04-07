import { StyleSheet } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../constants/theme';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    fontWeight: 700
  },
  subGreeting: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#6B7280',
    marginTop: 4,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  searchContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    // flex: 1,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  sectionTitle: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginVertical: 15,
    fontWeight:700
  },
  popularListContainer: {
    paddingBottom: 15,
  },

  cardContainer: {
    backgroundColor: '#E5E5E5',
    borderRadius: 16,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20, 
    paddingHorizontal: 10,
    position: 'relative',
    minHeight: 150,
    overflow: 'visible',
  },
  cardImageWrapper: {
    position: 'absolute',
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.white,
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 2,
    right: -2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  cardInfo: {
    marginTop: 0, 
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  cardBottomRow: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timeBlock: {
    alignItems: 'flex-start',
  },
  timeLabel: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: '#9CA3AF',
  },
  timeValue: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  bookmarkIcon: {
    padding: 4,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginLeft:5
  },
  
  filterModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
  },
  filterModalTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginBottom: 15,
  },
  filterSection: {
    marginBottom: 15,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.black,
    marginLeft: 4,
  },
  filterApplyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterApplyButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#FFF',
    width: 'auto',
    padding: 8,
    fontWeight: 700
  },
  categoryContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  categoryItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#6B7280',
  },
  categoryItemSelected:{
    backgroundColor:Colors.primary,
  },
  categoryTextSelected:{
    color:Colors.white,
    fontWeight: 700
  }
  
});
