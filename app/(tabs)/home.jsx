import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import PetListByCategory from '../../components/Home/PetListByCategory';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
    return (
        <View style={styles.container}>
            <Header />
            <Slider />

            <PetListByCategory />

            <Link href={'/add-new-pet'} asChild>
                <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
                    <LinearGradient colors={['#FF8C38', '#FFAB76']} style={styles.fabGradient}>
                        <MaterialIcons name="pets" size={28} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6F4',
        paddingHorizontal: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 32,
        right: 16,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    fabGradient: {
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});