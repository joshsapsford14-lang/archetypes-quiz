import { Text, View } from "react-native";

import { colors } from "@/theme";

const LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

interface StreakDaysProps {
  flags: boolean[]; // length 7, Mon..Sun
  todayIndex: number; // 0..6 (Mon=0)
  className?: string;
}

/** Row of weekday pips — filled volt for days trained this week. */
export function StreakDays({ flags, todayIndex, className }: StreakDaysProps) {
  return (
    <View className={`flex-row ${className ?? ""}`}>
      {LETTERS.map((letter, i) => {
        const on = flags[i];
        const isToday = i === todayIndex;
        return (
          <View key={i} className="items-center" style={{ flex: 1 }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: on ? colors.volt : colors.surface2,
                borderWidth: isToday ? 2 : 1,
                borderColor: isToday ? colors.volt : colors.line,
              }}
            >
              <Text
                style={{
                  fontFamily: "SpaceMono",
                  fontSize: 11,
                  color: on ? colors.pitch : colors.muted,
                }}
              >
                {letter}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
