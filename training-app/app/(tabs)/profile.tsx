import { Text, View } from "react-native";

import { Screen } from "@/components/ui";

export default function ProfileRoute() {
  return (
    <Screen>
      <View className="pt-10">
        <Text className="font-display text-4xl text-chalk">Profile</Text>
        <Text className="mt-2 font-body text-muted">Coming up next…</Text>
      </View>
    </Screen>
  );
}
