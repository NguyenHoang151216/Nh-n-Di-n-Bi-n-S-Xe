import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';

const MessageItem = ({ item, index, messages, user }) => {
    if (item.type === 'separator') {
        return (
            <View style={styles.separator}>
                <Text style={styles.separatorText}>{moment(item.date).format('MMM D, YYYY')}</Text>
            </View>
        );
    }

    const isMyMessage = item.user?._id === user?.primaryEmailAddress?.emailAddress;
    const showAvatar =
        index === messages.length - 1 ||
        (messages[index + 1]?.user?._id !== item.user?._id &&
            messages[index + 1]?.type !== 'separator');

    return (
        <View style={[styles.messageWrapper, isMyMessage ? styles.myWrapper : styles.theirWrapper]}>
            <View style={[styles.messageBubble, isMyMessage ? styles.myMessage : styles.theirMessage]}>
                <Text style={[styles.messageText, !isMyMessage && { color: '#000' }]}>{item.text}</Text>
                <Text style={styles.timeText}>{moment(item.createdAt).format('h:mm A')}</Text>
            </View>
            {showAvatar && isMyMessage && (
                <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    messageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 4,
        paddingHorizontal: 10,
    },
    myWrapper: {
        justifyContent: 'flex-end',
    },
    theirWrapper: {
        justifyContent: 'flex-start',
    },
    messageBubble: {
        padding: 10,
        borderRadius: 15,
        maxWidth: '70%',
    },
    myMessage: {
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 0,
    },
    theirMessage: {
        backgroundColor: '#E5E5EA',
        borderBottomLeftRadius: 0,
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    timeText: {
        color: '#f0f0f0',
        fontSize: 11,
        marginTop: 4,
        textAlign: 'right',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginLeft: 5,
    },
    separator: {
        alignItems: 'center',
        marginVertical: 10,
    },
    separatorText: {
        color: '#999',
        fontSize: 12,
        backgroundColor: '#e1e1e1',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
});

export default MessageItem;