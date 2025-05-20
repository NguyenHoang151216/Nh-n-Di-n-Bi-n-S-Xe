import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useUser, useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function Profile() {
    const Menu = [
        {
            id: 1,
            name: 'Add New Pet',
            icon: 'add-circle',
            path: '/add-new-pet'
        },
        {
            id: 5,
            name: 'My Post',
            icon: 'bookmark',
            path: '/../user-post'
        },
        {
            id: 2,
            name: 'Favorites',
            icon: 'heart',
            path: '(tabs)/favorite'
        },
        {
            id: 3,
            name: 'Inbox',
            icon: 'chatbubble',
            path: '(tabs)/inbox'
        },
        {
            id: 4,
            name: 'Logout',
            icon: 'exit',
            path: 'logout'
        }

    ]
    const { user } = useUser()
    const router = useRouter()
    const { signOut } = useAuth()
    const onPressMenu = (item) => {
        if (item.name === 'Logout') {
            signOut();
            router.replace('/login');
            return;
        }

        router.push(item.path);
    };
    return (
        <View style={{
            padding: 20,
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 30,
            }}>Profile</Text>

            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginVertical: 25,
            }}>
                <Image source={{ uri: user?.imageUrl }} style={{
                    width: 80,
                    height: 80,
                    borderRadius: 99,

                }} />
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,
                    marginTop: 10
                }}>{user?.fullName}</Text>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 15,
                    color: 'gray'
                }}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
            <FlatList
                data={Menu}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => onPressMenu(item)}
                        key={item.id}
                        style={{
                            marginVertical: 10,
                            display: 'flex',
                            flexDirection: 'row',
                            alignContent: 'center',
                            gap: 10,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 10,
                        }}>
                        <Ionicons name={item.icon} size={24} color="orange"
                            style={{
                                padding: 10,
                                backgroundColor: '#fff1c9',
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}