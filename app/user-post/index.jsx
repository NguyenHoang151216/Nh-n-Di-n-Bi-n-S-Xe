import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import PetListItem from '../../components/Home/PetListItem';

export default function UserPost() {
    const navigation = useNavigation();
    const { user } = useUser()
    const [loader, setLoader] = useState(false)
    const [userPostList, setUserPostList] = useState([])
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'User Post'
        })
        user && GetUserPost()
    }, [user])

    const GetUserPost = async () => {
        setLoader(true)
        setUserPostList([])
        const q = query(collection(db, 'Pets'), where('email', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setUserPostList((prev) => [...prev, doc.data()])
        })
        setLoader(false)
    }

    const OnDeletePost = (docId) => {
        Alert.alert('Do you want to delete?', 'Delete !!!', [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel"),
                style: 'cancel'

            },
            {
                text: "Delete",
                onPress: () => deletePost(docId)

            }
        ])

    }

    const deletePost = async (docId) => {
        await deleteDoc(doc(db, 'Pets', docId));
        GetUserPost()
    }

    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 30,
            }}>UserPost</Text>
            <FlatList
                data={userPostList}
                numColumns={2}
                refreshing={loader}
                onRefresh={GetUserPost}
                renderItem={({ item, index }) => (
                    <View>
                        <PetListItem pet={item} key={index} />
                        <Pressable onPress={() => OnDeletePost(item?.id)} style={styles.deleteButton}>
                            <Text style={{
                                fontFamily: 'outfit',
                                textAlign: 'center',
                            }}>Delete</Text>
                        </Pressable>
                    </View>
                )}
            />
            {userPostList.length == 0 && <Text>Empty</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: '#fff1c9',
        padding: 5,
        borderRadius: 10,
        marginTop: 5,
        marginRight: 10

    },
})