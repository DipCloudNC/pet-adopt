import { View, Image, Text, Pressable } from "react-native";
import React, { useCallback } from "react";
import Colors from "./../../constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const response = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" }),
      });

      console.log("OAuth response:", response);

      if (!response) {
        throw new Error("No response received from startOAuthFlow.");
      }

      const { createdSessionId, signIn, signUp, setActive } = response;

      if (createdSessionId) {
        console.log("Session created:", createdSessionId);
        // Handle successful session creation
      } else {
        console.log("No session created");
        // Handle no session creation
      }
    } catch (err) {
      console.error("OAuth error message:", err.message);
      console.error("OAuth error stack:", err.stack);
      console.error("OAuth error object:", err);
    }
  }, [startOAuthFlow]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Image
        source={require("./../../assets/images/login.png")}
        style={{ width: "100%", height: 500 }}
      />
      <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "outfit_bold",
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Let's adopt the pets which you like and make there life happy again.
        </Text>
        <Pressable
          onPress={onPress}
          style={{
            marginTop: 50,
            backgroundColor: Colors.PRIMARY,
            padding: 14,
            width: "100%",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit_medium",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
