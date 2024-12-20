import React from 'react';
import { View, Text } from 'react-native';
import app from './src/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

