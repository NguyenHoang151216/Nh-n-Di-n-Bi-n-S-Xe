import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/FirebaseConfig';
import MarkFav from '../MarkFav';

export default function PetInfo({ pet }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (pet?.imageUrl) {
                const storageRef = ref(storage, pet.imageUrl);
                const url = await getDownloadURL(storageRef);
                setImageUrl(url);
            }
        };

        fetchImage();
    }, [pet]);

    return (
        <View>
            <Image source={{ uri: imageUrl }}
                style={{
                    width: '100%',
                    height: 400,
                    resizeMode: 'cover',
                }}
            />
            <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 27,
                    }}>{pet?.name}</Text>

                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: 'gray',
                    }}>{pet?.address}</Text>
                </View>
                <MarkFav pet={pet} />
            </View>
        </View>
    );
}