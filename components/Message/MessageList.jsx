import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import MessageItem from './MessageItem';

const MessageList = ({ messages, user, flatListRef }) => {
    return (
        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
                <MessageItem
                    item={item}
                    index={index}
                    messages={messages}
                    user={user}
                />
            )}
            contentContainerStyle={{ paddingVertical: 10 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
    );
};

export default MessageList;