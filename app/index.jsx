import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { View } from "react-native";
import React, { useEffect } from "react";

export default function Index() {
  const { user } = useUser();

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoded();
  }, []);

  const CheckNavLoded = () => {
    if (!rootNavigationState.key) return null;
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href={"/login"} />}
    </View>
  );
}
