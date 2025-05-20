import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

export default function Category({ category }) {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Dogs');

    useEffect(() => {
        GetCategory();
    }, []);

    const GetCategory = async () => {
        setCategoryList([]);
        const snapshot = await getDocs(collection(db, 'Category'));
        snapshot.forEach((doc) => {
            setCategoryList((categoryList) => [...categoryList, doc.data()]);
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categoryList}
                numColumns={4}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setSelectedCategory(item.name);
                            category(item.name);
                        }}
                        style={styles.itemContainer}
                    >
                        {selectedCategory === item.name ? (
                            <LinearGradient
                                colors={['#FF8C38', '#FFAB76']}
                                style={[styles.iconContainer, styles.selectedCategoryContainer]}
                            >
                                <Image source={{ uri: item.imageUrl }} style={styles.icon} />
                            </LinearGradient>
                        ) : (
                            <View style={styles.iconContainer}>
                                <Image source={{ uri: item.imageUrl }} style={styles.icon} />
                            </View>
                        )}
                        <Text style={styles.itemText}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 8,
    },
    iconContainer: {
        backgroundColor: '#fff1c9',
        padding: 12,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedCategoryContainer: {
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    icon: {
        width: 48,
        height: 48,
    },
    itemText: {
        textAlign: 'center',
        fontFamily: 'outfit',
        fontSize: 14,
        color: '#666666',
        marginTop: 4,
    },
});