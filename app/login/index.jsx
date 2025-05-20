import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

export default function LoginScreen() {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        console.log("Button Pressed")
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
            });

            if (createdSessionId) {
                await setActive({ session: createdSessionId });
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);



    return (
        <View style={{
            backgroundColor: 'white',
            height: '100%'
        }}>
            <Image source={require('./../../assets/images/login.png')}
                style={{
                    width: '100%',
                    height: 500
                }}
            />
            <View style={{
                padding: 20,
                display: 'flex',
                alignItems: 'center'
            }}>
                <Text style={{

                    fontSize: 30,
                    textAlign: 'center'
                }}>Bạn đã sẵn sàng gặp một người bạn mới chưa?</Text>

                <Pressable
                    onPress={onPress}
                    style={{
                        padding: 14,
                        marginTop: 100,
                        backgroundColor: 'orange',
                        width: '100%',
                        borderRadius: 14
                    }}>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                        textAlign: 'center'
                    }}>Bắt đầu nào</Text>
                </Pressable>
            </View>
        </View>
    )
}