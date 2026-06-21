import { Text, View } from "react-native";

import { colors } from "@/theme";

interface StarsProps {
  count: number;
  max?: number;
  size?: number;
}

export function Stars({ count, max = 5, size = 20 }: StarsProps) {
  return (
    <View className="flex-row">
      {Array.from({ length: max }).map((_, i) => (
        <Text
          key={i}
          style={{
            fontSize: size,
            color: i < count ? colors.volt : colors.line,
            marginHorizontal: 1,
          }}
        >
          ★
        </Text>
      ))}
    </View>
  );
}
