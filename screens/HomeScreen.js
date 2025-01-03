import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Touchable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../src/firebase';
import { Swipeable } from 'react-native-gesture-handler';
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
        return () => unsubscribe();
    }, []);
    const HandleDeleteRecipe = async (id) => {
        console.log("Deleting recipe with id:", id);
        try {
            const recipeRef = doc(db, 'recipes', id);
            await deleteDoc(recipeRef);
            console.log('Recipe deleted succcessfully');
        } catch (error){
            console.log("Error deleting Recipe:", error);
        }
    };
    const DeleteRecipes = (id) => {
        return (
            <TouchableOpacity
                onPress={() => HandleDeleteRecipe(id)}
                    style={styles.deleteContainer}
            >
                <Text style={styles.deleteContainerText}>Delete</Text>
            </TouchableOpacity>
        );
    };
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
            <Swipeable 
                renderRightActions={ () => DeleteRecipes(item.id)}
            >
                <TouchableOpacity
                    style={StyleSheet.recipeCard}
                    onPress={() => navigation.navigate('RecipeDetails', {recipe: item })}
                >
                    <Text style={styles.recipeName}>&#x2022;{item.name}</Text>
                </TouchableOpacity>
                </Swipeable>
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
        backgroundColor: '#F8F8F8',
        padding: 30,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    recipeName: {
        fontSize: 26,
        fontWeight: 'normal',
        color: '#333',
    },
    deleteContainer: {
        backgroundColor: '#d9534f',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    deleteContainerText: {
        color: "#1b1a17",
        fontWeight: 600,
        padding: 20,
    }
});



export default HomeScreen;
