import React, { useEffect, useState, useRef } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { GEMINI_API_KEY } from '@env';
import MessageList from '../../components/Message/MessageList';
import ChatInput from '../../components/Message/ChatInput';

export default function ChatScreen() {
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef(null);
    const [inputText, setInputText] = useState('');

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Bác sĩ thú y',
        });

        if (!user) return;

        const userId = user.id;
        const messagesRef = collection(db, 'chatMessages', userId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messageData = snapshot.docs.map((doc) => ({
                _id: doc.id,
                ...doc.data(),
            }));
            const sorted = messageData.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            const withSeparators = insertDateSeparators(sorted);
            setMessages(withSeparators);
        }, (error) => {
            console.error('Error loading messages from Firestore:', error);
        });

        return () => unsubscribe();
    }, [user]);

    const onSend = async () => {
        if (inputText.trim() === '' || !user) return;

        const userId = user.id;

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

        try {
            await addDoc(collection(db, 'chatMessages', userId, 'messages'), newMessage);
        } catch (error) {
            console.error('Error saving user message to Firestore:', error);
            return;
        }

        setInputText('');

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: inputText,
                                },
                            ],
                        },
                    ],
                    systemInstruction: {
                        parts: [
                            {
                                text: 'Bạn là một bác sĩ thú y chuyên nghiệp, hãy trả lời bằng tiếng Việt ngắn gọn, dễ hiểu và hữu ích. Cung cấp lời khuyên về chăm sóc sức khỏe động vật, chẩn đoán sơ bộ các triệu chứng (nếu có), và khuyến nghị cách xử lý. Nếu tình trạng nghiêm trọng, hãy khuyên người dùng đưa thú cưng đến bác sĩ thú y ngay lập tức. Đừng đưa ra chẩn đoán chính thức hoặc kê đơn thuốc, vì bạn không phải bác sĩ thú y thực sự.',
                            },
                        ],
                    },
                    generationConfig: {
                        maxOutputTokens: 400,
                        temperature: 0.7,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    `API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`
                );
            }

            const data = await response.json();
            const botMessageText = data.candidates[0]?.content?.parts[0]?.text || 'Không có phản hồi từ API.';

            const botMessage = {
                _id: (Date.now() + 1).toString(),
                text: botMessageText,
                createdAt: new Date().toISOString(),
                user: {
                    _id: 'chatbot',
                    name: 'Bác sĩ thú y',
                    avatar: null,
                },
            };

            await addDoc(collection(db, 'chatMessages', userId, 'messages'), botMessage);
        } catch (error) {
            console.error('Error:', error.message);
            const errorMessage = {
                _id: (Date.now() + 1).toString(),
                text: `Lỗi: ${error.message}`,
                createdAt: new Date().toISOString(),
                user: {
                    _id: 'chatbot',
                    name: 'Bác sĩ thú y',
                    avatar: null,
                },
            };
            await addDoc(collection(db, 'chatMessages', userId, 'messages'), errorMessage);
        }
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