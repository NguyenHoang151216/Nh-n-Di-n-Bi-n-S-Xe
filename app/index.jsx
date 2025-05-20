import { View } from "react-native";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo"

export default function Index() {

  const { user } = useUser();

  return (
    <View
      style={{
        flex: 1,

      }}
    >
      {user ?
        <Redirect href={'/(tabs)/home'} />
        : <Redirect href={'/login'} />}


    </View>
  );
}