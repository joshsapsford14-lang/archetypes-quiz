import { Text, View } from "react-native";

import { Avatar } from "@/components/ui";

const MEDALS = ["🥇", "🥈", "🥉"];

interface LeaderboardRowProps {
  position: number;
  name: string;
  initials: string;
  color: string;
  level: number;
  weeklyXp: number;
  isYou?: boolean;
}

export function LeaderboardRow({
  position,
  name,
  initials,
  color,
  level,
  weeklyXp,
  isYou,
}: LeaderboardRowProps) {
  return (
    <View
      className={`flex-row items-center rounded-2xl px-2 py-2.5 ${
        isYou ? "border border-volt bg-surface-2" : ""
      }`}
    >
      <View className="w-8 items-center">
        {position <= 3 ? (
          <Text style={{ fontSize: 18 }}>{MEDALS[position - 1]}</Text>
        ) : (
          <Text className="font-display text-lg text-muted">{position}</Text>
        )}
      </View>
      <Avatar initials={initials} color={color} size={40} highlight={isYou} />
      <View className="ml-3 flex-1">
        <Text className={`font-body-bold text-base ${isYou ? "text-volt" : "text-chalk"}`}>
          {name}
          {isYou ? " (you)" : ""}
        </Text>
        <Text className="font-hud text-[11px] text-muted">LVL {level}</Text>
      </View>
      <View className="items-end">
        <Text className="font-display text-xl text-volt">{weeklyXp}</Text>
        <Text className="font-hud text-[10px] text-muted">XP</Text>
      </View>
    </View>
  );
}
