import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';
import MessageList from '../../components/Message/MessageList';
import ChatInput from '../../components/Message/ChatInput';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(collection(db, 'Chat', params?.id, 'Messages'), (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      const sorted = messageData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      const withSeparators = insertDateSeparators(sorted);
      setMessages(withSeparators);
    });

    return () => unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, 'Chat', params?.id);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const otherUser = result?.users.filter(item => item.email !== user?.primaryEmailAddress?.emailAddress);
    navigation.setOptions({
      headerTitle: otherUser?.[0]?.name,
    });
  };

  const onSend = async () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      _id: Date.now().toString(),
      text: inputText,
      createdAt: new Date().toISOString(),
      user: {
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      },
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    await addDoc(collection(db, 'Chat', params?.id, 'Messages'), newMessage);
  };

  const insertDateSeparators = (msgs) => {
    const result = [];
    let lastDate = null;
    msgs.forEach((msg) => {
      const msgDate = moment(msg.createdAt).format('YYYY-MM-DD');
      if (msgDate !== lastDate) {
        result.push({
          _id: 'separator-' + msgDate,
          type: 'separator',
          date: msgDate,
        });
        lastDate = msgDate;
      }
      result.push(msg);
    });
    return result;
  };

  return (
    <View style={styles.container}>
      <MessageList
        messages={messages}
        user={user}
        flatListRef={flatListRef}
      />
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        onSend={onSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});