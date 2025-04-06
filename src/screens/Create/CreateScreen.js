import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../services/firebase';
import { useAuthContext } from '../../context/AuthContext';
import { Colors, Fonts, FontSizes } from '../../constants/theme';
import styles from './styles';

export default function CreateScreen({ navigation }) {
  const { user } = useAuthContext();
  const auth = getAuth();
  
  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState(''); // initial category empty
  const [time, setTime] = useState('');
  const [procedure, setProcedure] = useState('');
  const [servings, setServings] = useState('');
  
  // Dropdown state for category using react-native-dropdown-picker
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Select Category', value: '' },
    { label: 'Indian', value: 'Indian' },
    { label: 'Italian', value: 'Italian' },
    { label: 'Asian', value: 'Asian' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Other', value: 'Other' },
  ]);
  
  // Ingredients state: for adding ingredients one by one.
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredients, setIngredients] = useState([]);
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Add a new ingredient to the list
  const handleAddIngredient = () => {
    if (ingredientName.trim() === '' || ingredientAmount.trim() === '') {
      Alert.alert('Validation', 'Please enter both ingredient name and amount.');
      return;
    }
    setIngredients([...ingredients, { name: ingredientName, quantity: ingredientAmount }]);
    setIngredientName('');
    setIngredientAmount('');
  };
  
  const handleSubmit = async () => {
    // Validate required fields
    if (
      name.trim() === '' ||
      category.trim() === '' ||
      time.trim() === '' ||
      procedure.trim() === '' ||
      servings.trim() === '' ||
      ingredients.length === 0
    ) {
      Alert.alert('Validation', 'Please fill out all fields, select a category, and add at least one ingredient.');
      return;
    }
    setIsSaving(true);
    try {
      const recipeData = {
        name,
        category,
        reviews: [],
        chef: user?.displayName || '',
        createdBy: auth.currentUser.uid,
        rating: 0,
        ratingCount: 0,
        ratingTotal: 0,
        savedBy: [],
        servings,
        time,
        ingredients,
        procedure,
        createdAt: new Date()
      };
      
      await addDoc(collection(db, 'recipes'), recipeData);
      Alert.alert('Success', 'Recipe created successfully!');
      // Clear form fields
      setName('');
      setCategory('');
      setTime('');
      setProcedure('');
      setServings('');
      setIngredients([]);
    } catch (error) {
      console.error('Error creating recipe:', error);
      Alert.alert('Error', 'There was an error creating your recipe.');
    }
    setIsSaving(false);
  };
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      nestedScrollEnabled={true} // Enable nested scrolling
    >
      <Text style={styles.title}>Create a New Recipe</Text>
      
      {/* Recipe Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipe name"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      {/* Category Dropdown using react-native-dropdown-picker */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <DropDownPicker
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          placeholder="Select Category"
          containerStyle={{ marginBottom: 20 }}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          listMode="SCROLLVIEW" // Use SCROLLVIEW to avoid nesting VirtualizedList inside a ScrollView
        />
      </View>
      
      {/* Time */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 30 min"
          value={time}
          onChangeText={setTime}
        />
      </View>

      {/* Servings */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Number of Servings</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 4"
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
        />
      </View>
      
      {/* Ingredients */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ingredients</Text>
        <View style={styles.ingredientRow}>
          <TextInput
            style={[styles.input, styles.ingredientInput]}
            placeholder="Ingredient"
            value={ingredientName}
            onChangeText={setIngredientName}
          />
          <TextInput
            style={[styles.input, styles.ingredientInput]}
            placeholder="Amount"
            value={ingredientAmount}
            onChangeText={setIngredientAmount}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {ingredients.length > 0 && (
          <View style={styles.ingredientsList}>
            {ingredients.map((ing, index) => (
              <Text key={index} style={styles.ingredientItem}>
                {ing.name} - {ing.quantity}
              </Text>
            ))}
          </View>
        )}
      </View>
      
      {/* Procedure */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Procedure</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter the procedure"
          value={procedure}
          onChangeText={setProcedure}
          multiline
          numberOfLines={6}
        />
      </View>
      
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSaving}>
        {isSaving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Create Recipe</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
