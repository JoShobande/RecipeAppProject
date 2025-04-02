// src/screens/Profile/styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, FontSizes } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Header / Profile Section
  headerSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#F8F8F8',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  userName: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginBottom: 4,
    fontWeight: '700',
  },
  userRole: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: '#666',
    marginBottom: 6,
  },
  userBio: {
    fontSize: FontSizes.small,
    fontFamily: Fonts.regular,
    color: '#888',
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.bold,
    color: Colors.black,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: FontSizes.small,
    color: '#888',
  },
  // Tabs
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSizes.medium,
    color: '#888',
    fontFamily: Fonts.regular,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  // Recipe Grid
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    marginTop: 20
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.regular,
    color: '#888',
    textAlign: 'center',
  },
});
