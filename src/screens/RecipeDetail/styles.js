import { StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // adjust for status bar
    paddingBottom: 10,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 999,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 14,
    color: '#000',
  },

  imageCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    marginTop: 10,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayInfo: {
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
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
    fontWeight: '700',
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

  /* ===================== MODALS ===================== */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Share Modal */
  shareModalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  shareModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  shareModalSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 15,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 14,
    color: '#00A651',
    fontWeight: '600',
    marginRight: 8,
  },
  linkCopiedText: {
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '600',
  },
  copyLinkButton: {
    backgroundColor: '#00A651',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  copyLinkButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },

  /* Rate Modal */
  rateModalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  rateModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  rateButton: {
    backgroundColor: '#00A651',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  rateButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },

  chefRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  chefInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chefAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  chefInfo: {
    marginLeft: 10,
    flexShrink: 1,
  },
  followButton: {
    backgroundColor: '#00A651',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  /* Shared close button style for both modals */
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
