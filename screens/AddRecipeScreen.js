import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase';
import { useNavigation } from '@react-navigation/native';


const AddRecipeScreen = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const navigation = useNavigation();

    const handleAddRecipe = async () => {
        if (!name) return alert('Please enter a recipe name');

      const ingredientArray = ingredients.split(',').map(item => item.trim());
      
      try {
            await addDoc(collection(db, 'recipes'), {
                name: name,
                ingredients: ingredientArray,
                instructions: instructions,
                createdAt: new Date(),
            });
            alert('Recipe added Successfully');
            setName('');
            setIngredients('');
            setInstructions('');
      } catch (error) {
          console.error('Error adding recipe:', error);
      }
  
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add a New Recipe</Text>
            <TextInput
            style={styles.input}
            placeholder='Recipe Name'
            value={name}
            onChangeText={(text) => setName(text)}
            />
            <TextInput 
            style={styles.input}
            placeholder='Ingredients (seperate with comma)'
            value={ingredients}
            onChangeText={(text) => setIngredients(text)}
            />
            <TextInput
            style={styles.input}
            placeholder='Instructions'
            value={instructions}
            onChangeText={(text) => setInstructions(text)}
            />
            <Button 
                title="Add Recipe" 
                onPress={() => {
                    handleAddRecipe();
                    navigation.goBack();
                }}
            />
        </View>
  );
    
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      padding: 20,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginVertical: 20,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: '#FFF',
    }
  });

export default AddRecipeScreen;
