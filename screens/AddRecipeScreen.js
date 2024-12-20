// /screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase';
import { useNavigation } from '@react-navigation/native';

const AddRecipeScreen = () => {
    const [title, setTitle] = useState('');

    const navigation = useNavigation();


    const handleAddRecipe = async () => {
        if (!title) return alert('Please enter a recipe name');

        try {
            await addDoc(collection(db, 'recipes'), {
                title: title,
                createdAt: new Date()
            });
            alert('Recipe added Successfully');
            setTitle('');
            navigation.goBack();
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
            value={title}
            onChangeText={(text) => setTitle(text)}
            />
            <Button title="Add Recipe" onPress={handleAddRecipe} />

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
