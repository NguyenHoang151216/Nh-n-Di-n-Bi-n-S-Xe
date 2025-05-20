import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ChatInput = ({ inputText, setInputText, onSend }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder="Nhập tin nhắn..."
                value={inputText}
                onChangeText={setInputText}
            />
            <TouchableOpacity onPress={onSend} style={styles.sendButton}>
                <Text style={{ color: 'white' }}>Gửi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
});

export default ChatInput;