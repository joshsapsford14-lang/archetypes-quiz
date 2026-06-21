import { Text, View } from "react-native";

import { Stars } from "@/components/ui";
import { colors } from "@/theme";
import type { GradeTier } from "@/types";

export const GRADE_COLOR: Record<GradeTier, string> = {
  S: colors.volt,
  A: colors.aqua,
  B: colors.flame,
  C: colors.muted,
};

interface GradeBadgeProps {
  grade: GradeTier;
  stars: number;
  size?: number;
}

export function GradeBadge({ grade, stars, size = 132 }: GradeBadgeProps) {
  const color = GRADE_COLOR[grade];
  return (
    <View className="items-center">
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 3,
          borderColor: color,
          backgroundColor: `${color}1A`,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: color,
          shadowOpacity: 0.55,
          shadowRadius: 26,
          shadowOffset: { width: 0, height: 0 },
          elevation: 12,
        }}
      >
        <Text
          style={{
            fontFamily: "Anton",
            fontSize: size * 0.5,
            lineHeight: size * 0.54,
            color,
          }}
        >
          {grade}
        </Text>
      </View>
      <View className="mt-3">
        <Stars count={stars} size={22} />
      </View>
    </View>
  );
}
