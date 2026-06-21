import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { PressableScale } from "@/components/ui";
import { colors } from "@/theme";

interface ExtraToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

/** The most-rewarded behaviour gets a prominent, explained toggle. */
export function ExtraToggle({ value, onChange }: ExtraToggleProps) {
  return (
    <PressableScale
      onPress={() => onChange(!value)}
      pressedScale={0.98}
      className={`flex-row items-center justify-between rounded-2xl border p-4 ${
        value ? "border-volt bg-surface-2" : "border-line bg-surface"
      }`}
    >
      <View className="flex-1 flex-row items-center gap-3 pr-3">
        <Ionicons
          name="rocket"
          size={22}
          color={value ? colors.volt : colors.muted}
        />
        <View className="flex-1">
          <Text className="font-body-bold text-base text-chalk">Extra session</Text>
          <Text className="mt-0.5 font-body text-xs text-muted">
            On your own time, outside team training — earns +50% XP
          </Text>
        </View>
      </View>
      <View
        className={`h-7 w-12 justify-center rounded-full p-1 ${value ? "bg-volt" : "bg-line"}`}
      >
        <View
          className="h-5 w-5 rounded-full bg-pitch"
          style={{ marginLeft: value ? "auto" : 0 }}
        />
      </View>
    </PressableScale>
  );
}
