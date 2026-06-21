import { Text, View } from "react-native";

// Temporary smoke-test screen — exercises NativeWind classes + all three fonts.
// Replaced by the real tab navigator + Home screen next.
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-pitch px-6">
      <Text className="font-display text-6xl text-volt">TOUCHLINE</Text>
      <Text className="mt-3 font-body text-base text-chalk">
        Train. Level up. Climb the table.
      </Text>
      <Text className="mt-6 font-hud text-sm text-muted">XP 0000 · STREAK 0</Text>
    </View>
  );
}
