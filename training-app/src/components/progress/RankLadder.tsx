import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { RANKS } from "@/data/ranks";
import { colors } from "@/theme";

interface RankLadderProps {
  level: number;
  currentRankId: string;
}

/** The ladder players climb — highest rank on top, current one highlighted. */
export function RankLadder({ level, currentRankId }: RankLadderProps) {
  const rows = [...RANKS].reverse();
  return (
    <View>
      {rows.map((rank) => {
        const achieved = level >= rank.minLevel;
        const current = rank.id === currentRankId;
        return (
          <View
            key={rank.id}
            className={`mb-2 flex-row items-center rounded-2xl border p-3 ${
              current
                ? "border-volt bg-surface-2"
                : achieved
                  ? "border-line bg-surface"
                  : "border-line bg-surface opacity-50"
            }`}
          >
            <Text style={{ fontSize: 24 }}>{rank.emoji}</Text>
            <View className="ml-3 flex-1">
              <Text className={`font-display text-xl ${current ? "text-volt" : "text-chalk"}`}>
                {rank.name}
              </Text>
              <Text className="font-hud text-[11px] text-muted">Level {rank.minLevel}+</Text>
            </View>
            {current ? (
              <View className="rounded-full bg-volt px-2.5 py-1">
                <Text className="font-hud text-[10px] text-pitch">YOU</Text>
              </View>
            ) : achieved ? (
              <Ionicons name="checkmark-circle" size={20} color={colors.muted} />
            ) : (
              <Ionicons name="lock-closed" size={15} color={colors.muted} />
            )}
          </View>
        );
      })}
    </View>
  );
}
