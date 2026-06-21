import "../global.css";

import { Anton_400Regular } from "@expo-google-fonts/anton";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import {
  SpaceMono_400Regular,
  SpaceMono_700Bold,
} from "@expo-google-fonts/space-mono";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "@/theme";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Keys here become the fontFamily names used by NativeWind (tailwind.config.js).
    Anton: Anton_400Regular,
    DMSans: DMSans_400Regular,
    "DMSans-Medium": DMSans_500Medium,
    "DMSans-Bold": DMSans_700Bold,
    SpaceMono: SpaceMono_400Regular,
    "SpaceMono-Bold": SpaceMono_700Bold,
  });

  // Hold on a pitch-colored screen until fonts are ready (avoids a flash).
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.pitch }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.pitch }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.pitch },
            animation: "fade",
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
