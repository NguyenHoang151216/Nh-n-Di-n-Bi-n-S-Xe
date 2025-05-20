import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';

export default function OwnerInfo({ pet }) {
    return (
        <View style={styles.container}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>
                <Image source={{ uri: pet?.userImage }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 99
                    }}
                />
                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 17
                    }}>{pet?.username}</Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        color: 'gray'
                    }}>Pet Owner</Text>
                </View>
            </View>
            <Feather name="send" size={24} color="orange" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: 'orange',
        backgroundColor: 'white',
        justifyContent: 'space-between'
    }
})