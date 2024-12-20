import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const RecipeDetailsScreen = ({ route }) => {
    const { recipe } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.name}> {recipe.name}</Text>
            <Text style={styles.sectionHeader}>Ingredients</Text>
            <FlatList
                data={recipe.ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.ingredientItem}>&#x2022; {item}</Text>
                )}
            />
            <Text style={styles.sectionHeader}>Instructions</Text>
            <Text style={styles.instructions}>{recipe.instructions}</Text>
        </View>
    );
};
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 20,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#555'
    
    },
    ingredientItem: {
        fontSize: 18,
        color: '#333',
        marginVertical: 5,
    },
    instructions: {
        fontSize: 18,
        color: '#333',
        marginTop: 10,
        lineHeight: 25,
    },

});
export default RecipeDetailsScreen;