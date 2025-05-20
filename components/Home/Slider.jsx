import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        GetSliders();
    }, []);

    useEffect(() => {
        if (sliderList.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === sliderList.length - 1 ? 0 : prevIndex + 1
                );
                flatListRef.current?.scrollToIndex({
                    index: currentIndex === sliderList.length - 1 ? 0 : currentIndex + 1,
                    animated: true,
                });
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [sliderList, currentIndex]);

    const GetSliders = async () => {
        setSliderList([]);
        const snapshot = await getDocs(collection(db, 'Slider'));
        snapshot.forEach((doc) => {
            setSliderList((sliderList) => [...sliderList, doc.data()]);
        });
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={sliderList}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                renderItem={({ item }) => (
                    <Image source={{ uri: item?.imageUrl }} style={styles.sliderImage} />
                )}
            />
            <View style={styles.dotsContainer}>
                {sliderList.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    sliderImage: {
        width: Dimensions.get('screen').width * 0.9,
        height: 160,
        borderRadius: 20,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#FF8C38',
    },
    inactiveDot: {
        backgroundColor: '#CCCCCC',
    },
});