import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setUserData({
                lastName: user.lastName,
                imageUrl: user.imageUrl,
            });
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                <Image source={{ uri: userData?.imageUrl }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome,</Text>
                <Text style={styles.nameText}>{userData?.lastName}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/favorite')}>
                    <Ionicons name="heart-outline" size={28} color="#FF8C38" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/inbox')}>
                    <Ionicons name="chatbubble-outline" size={28} color="#FF8C38" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#FF8C38',
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    welcomeText: {
        fontFamily: 'outfit',
        fontSize: 18,
        color: '#666666',
    },
    nameText: {
        fontFamily: 'outfit-medium',
        fontSize: 24,
        color: '#333333',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    icon: {
        padding: 4,
    },
});