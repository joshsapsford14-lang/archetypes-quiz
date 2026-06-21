import { Text, View } from "react-native";

import { PressableScale } from "@/components/ui";

export const DURATION_OPTIONS = [15, 30, 45, 60, 75, 90];

interface DurationPickerProps {
  value: number;
  onChange: (minutes: number) => void;
}

export function DurationPicker({ value, onChange }: DurationPickerProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {DURATION_OPTIONS.map((minutes) => {
        const selected = value === minutes;
        return (
          <PressableScale
            key={minutes}
            onPress={() => onChange(minutes)}
            pressedScale={0.95}
            className={`rounded-full border px-5 py-2.5 ${
              selected ? "border-volt bg-volt" : "border-line bg-surface"
            }`}
          >
            <Text className={`font-hud text-sm ${selected ? "text-pitch" : "text-chalk"}`}>
              {minutes}m
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}
