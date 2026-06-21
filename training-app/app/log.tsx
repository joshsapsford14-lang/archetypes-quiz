import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { Button, Screen } from "@/components/ui";

export default function LogRoute() {
  const router = useRouter();
  return (
    <Screen scroll={false}>
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="font-display text-4xl text-chalk">Log a session</Text>
        <Text className="font-body text-muted">Full flow coming next…</Text>
        <Button label="Close" variant="secondary" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
