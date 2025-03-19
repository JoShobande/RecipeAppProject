import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
// import SearchNavigator from './SearchNavigator'; // or directly screens
// import SavedRecipesScreen from '../screens/Recipe/SavedRecipesScreen';
// import NotificationScreen from '../screens/Notifications/NotificationScreen';
// import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen name="Saved" component={SavedRecipesScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}
