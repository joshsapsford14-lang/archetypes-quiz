import { Text, View } from "react-native";

import { PressableScale } from "@/components/ui";
import { TRAINING_TYPES } from "@/data/trainingTypes";
import type { TrainingTypeId } from "@/types";

interface TypePickerProps {
  value: TrainingTypeId | null;
  onChange: (id: TrainingTypeId) => void;
}

export function TypePicker({ value, onChange }: TypePickerProps) {
  return (
    <View className="flex-row flex-wrap justify-between">
      {TRAINING_TYPES.map((type) => {
        const selected = value === type.id;
        return (
          <PressableScale
            key={type.id}
            onPress={() => onChange(type.id)}
            pressedScale={0.95}
            className={`mb-3 w-[48%] rounded-2xl border p-3 ${
              selected ? "border-volt bg-surface-2" : "border-line bg-surface"
            }`}
          >
            <Text style={{ fontSize: 26 }}>{type.emoji}</Text>
            <Text
              className={`mt-1.5 font-body-bold text-sm ${selected ? "text-volt" : "text-chalk"}`}
            >
              {type.label}
            </Text>
            <Text className="mt-0.5 font-body text-[11px] leading-4 text-muted" numberOfLines={2}>
              {type.blurb}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}
