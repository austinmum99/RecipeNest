import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../src/firebase';

const HomeScreen = () => {
    const navigation = useNavigation();

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'recipes'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const recipeList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setRecipes(recipeList);
        });

        return () => unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            {/* header */}
            <Text style={styles.header}>Recipe Nest</Text>
            {/* Add Recipe Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddRecipe')}
            >
                <Text style={styles.addButtonText}>+ Add Recipe</Text>
            </TouchableOpacity>
            {/* Recipe List */}
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.recipeCard}>
                        <Text style={styles.recipeTitle}>{item.title}</Text>
                    </View>
                )}
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    addButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipeCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});



export default HomeScreen;
